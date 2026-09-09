"use client";

import Image from "next/image";
import { Player } from "@remotion/player";
import type { NextPage } from "next";
import {
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { z } from "zod";

import { RenderControls } from "@/components/RenderControls";
import { ErrorComp } from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  buildPreviewProject,
  createBlankSceneDraft,
  parsedScenesToDrafts,
  type SceneDraft,
  type SceneVisualOption,
} from "@/lib/scene-planning";
import { DEFAULT_SELECTED_VOICE_ID } from "@/lib/project-persistence";
import {
  buildSceneFromSvg,
  fitSceneDurationToFrames,
} from "@/lib/svg-to-whiteboard";
import { ProjectVideo } from "@/remotion/whiteboard/ProjectVideo";
import {
  CompositionProps,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import {
  CreateProjectResponse,
  GenerateAudioResponse,
  ParseScenesResponse,
  GenerateSvgResponse,
  ProjectResponse,
  ProjectsResponse,
  type PersistedSceneDraftData,
  ProjectSummary,
  UpdateProjectRequest,
  VoicePresetsResponse,
} from "@/types/schema";
import { getProjectDurationInFrames } from "@/types/whiteboard";

const SCENE_FINAL_HOLD_SECONDS = 1.5;
const SCENE_TIMING_FPS = 30;
const SCENE_END_HOLD_FRAMES = Math.round(
  SCENE_FINAL_HOLD_SECONDS * SCENE_TIMING_FPS,
);
const AUTOSAVE_DEBOUNCE_MS = 1200;
const VISUAL_VARIATION_PRESETS = [
  {
    id: "minimal-diagram",
    label: "Minimal",
    prompt:
      "Create a minimal diagram with very few elements and lots of negative space.",
  },
  {
    id: "story-moment",
    label: "Story",
    prompt:
      "Create a character-led storyboard moment with one clear action or interaction.",
  },
  {
    id: "process-sketch",
    label: "Process",
    prompt:
      "Create a process-oriented sketch with arrows, flow, or before-and-after structure.",
  },
] as const;

type ProjectSummaryData = z.infer<typeof ProjectSummary>;
type ProjectDetailData = z.infer<typeof ProjectResponse>["project"];

const sanitizeSceneDraftsForSave = (
  sceneDrafts: SceneDraft[],
): PersistedSceneDraftData[] => {
  return sceneDrafts.map((scene) => ({
    ...scene,
    isGenerating: false,
    isGeneratingAudio: false,
    generationError: undefined,
    audioError: undefined,
  }));
};

const createEmptySceneDrafts = (): SceneDraft[] => [createBlankSceneDraft(0)];

const parseJsonResponse = async (response: Response): Promise<unknown> => {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as unknown;
};

const getResponseMessage = (payload: unknown): string | null => {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return null;
};

const selectVisualOption = (
  scene: SceneDraft,
  optionId?: string,
): SceneDraft => {
  const options = scene.visualOptions ?? [];
  const selectedOption =
    options.find((option) => option.id === optionId) ?? options[0];

  if (!selectedOption) {
    return {
      ...scene,
      selectedVisualOptionId: undefined,
    };
  }

  const tracedScene =
    scene.audioDurationInFrames && scene.audioUrl
      ? fitSceneDurationToFrames({
          scene: {
            ...selectedOption.tracedScene,
            audioSrc: scene.audioUrl,
          },
          targetDurationInFrames: scene.audioDurationInFrames,
          endHoldFrames: SCENE_END_HOLD_FRAMES,
        })
      : selectedOption.tracedScene;

  return {
    ...scene,
    svgText: selectedOption.svgText,
    svgDataUrl: selectedOption.svgDataUrl,
    svgLabel: selectedOption.svgLabel,
    tracedScene,
    selectedVisualOptionId: selectedOption.id,
  };
};

const hydrateSceneDraft = (scene: SceneDraft): SceneDraft => {
  if (scene.visualOptions && scene.visualOptions.length > 0) {
    return selectVisualOption(scene, scene.selectedVisualOptionId);
  }

  if (scene.svgText && scene.svgDataUrl && scene.tracedScene) {
    return {
      ...scene,
      visualOptions: [
        {
          id: "legacy-visual",
          label: "Current",
          svgText: scene.svgText,
          svgDataUrl: scene.svgDataUrl,
          svgLabel: scene.svgLabel,
          tracedScene: scene.tracedScene,
        },
      ],
      selectedVisualOptionId: "legacy-visual",
    };
  }

  return scene;
};

const hydrateSceneDrafts = (sceneDrafts: SceneDraft[]): SceneDraft[] => {
  return sceneDrafts.map(hydrateSceneDraft);
};

const formatTimestamp = (seconds: number): string => {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const mins = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (safeSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const getSceneDurationSeconds = (
  scene: SceneDraft,
  fallbackFps: number,
): number => {
  if (scene.audioDurationSeconds) {
    return scene.audioDurationSeconds;
  }

  if (scene.tracedScene?.durationInFrames) {
    return scene.tracedScene.durationInFrames / fallbackFps;
  }

  const wordCount = scene.scriptText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round((wordCount / 2.6) * 10) / 10);
};

const getSceneRangeLabel = (
  sceneDrafts: SceneDraft[],
  index: number,
  fps: number,
): string => {
  const start = sceneDrafts
    .slice(0, index)
    .reduce((total, scene) => total + getSceneDurationSeconds(scene, fps), 0);
  const end = start + getSceneDurationSeconds(sceneDrafts[index], fps);

  return `${formatTimestamp(start)} - ${formatTimestamp(end)}`;
};

const isRenderableScenePreview = (value?: string): boolean => {
  if (!value) {
    return false;
  }

  return (
    value.startsWith("data:image/") ||
    value.startsWith("blob:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  );
};

const ThumbnailWaves = ({ color = "#2f62db" }: { color?: string }) => {
  return (
    <svg viewBox="0 0 120 80" className="h-10 w-14" aria-hidden="true">
      <path
        d="M26 40c5-8 13-8 18 0"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M57 31c5-7 13-7 18 0"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M43 61c7-16 18-16 25 0"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M66 49c6-8 15-8 21 0"
        fill="none"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ArrowIcon = ({ direction }: { direction: "up" | "down" }) => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d={
        direction === "up"
          ? "M8 3l4.5 5H3.5L8 3zm0 10V7"
          : "M8 13L3.5 8h9L8 13zM8 3v6"
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GripIcon = () => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
    {[
      [5, 4],
      [11, 4],
      [5, 8],
      [11, 8],
      [5, 12],
      [11, 12],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.1} fill="currentColor" />
    ))}
  </svg>
);

const DotsIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="h-4 w-4"
    aria-hidden="true"
    fill="currentColor"
  >
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
  </svg>
);

const SpeakerIcon = ({ isPlaying }: { isPlaying: boolean }) => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d="M2.5 6.4h2.4L8 3.8v8.4L4.9 9.6H2.5V6.4z"
      fill="currentColor"
    />
    <path
      d={
        isPlaying
          ? "M10.2 5.2c1.2 1.5 1.2 4.1 0 5.6M12.1 3.8c2.1 2.4 2.1 6 0 8.4"
          : "M10.6 6l3 4M13.6 6l-3 4"
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d="M3.5 4.5h9M6.4 4.5V3.2h3.2v1.3M5 6.2l.4 6.1h5.2l.4-6.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Home: NextPage = () => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("Untitled project");
  const [script, setScript] = useState("");
  const [sceneDrafts, setSceneDrafts] = useState<SceneDraft[]>(createEmptySceneDrafts);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectSummaryData[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string | null>(
    null,
  );
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isParsingScenes, setIsParsingScenes] = useState(false);
  const [isGeneratingAllSvgs, setIsGeneratingAllSvgs] = useState(false);
  const [isGeneratingAllAudio, setIsGeneratingAllAudio] = useState(false);
  const [voicePresets, setVoicePresets] = useState<
    z.infer<typeof VoicePresetsResponse>["voices"]
  >([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState(
    DEFAULT_SELECTED_VOICE_ID,
  );
  const [showProjectSwitcher, setShowProjectSwitcher] = useState(false);
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [sceneMenuOpenId, setSceneMenuOpenId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"scene" | "video">("scene");
  const [persistedRender, setPersistedRender] = useState<ProjectDetailData["render"]>(null);
  const [isProjectSetupMode, setIsProjectSetupMode] = useState(true);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const voicePreviewAudioRef = useRef<HTMLAudioElement | null>(null);

  const projectSnapshot = useMemo(() => {
    return JSON.stringify({
      title: projectTitle.trim() || "Untitled project",
      script,
      selectedVoiceId,
      sceneDrafts: sanitizeSceneDraftsForSave(sceneDrafts),
    });
  }, [projectTitle, script, selectedVoiceId, sceneDrafts]);

  const isDirty =
    lastSavedSnapshot !== null && projectSnapshot !== lastSavedSnapshot;

  const applyProject = (project: ProjectDetailData) => {
    const hydratedSceneDrafts = hydrateSceneDrafts(project.sceneDrafts);
    const nextSelectedSceneId =
      hydratedSceneDrafts.some((scene) => scene.id === selectedSceneId)
        ? selectedSceneId
        : hydratedSceneDrafts[0]?.id ?? null;

    setProjectId(project.id);
    setProjectTitle(project.title);
    setScript(project.script);
    setSelectedVoiceId(project.selectedVoiceId);
    setSceneDrafts(hydratedSceneDrafts);
    setSelectedSceneId(nextSelectedSceneId);
    setPreviewMode("scene");
    setShowProjectSwitcher(false);
    setPersistedRender(project.render);
    setIsProjectSetupMode(project.sceneDrafts.every((scene) => !scene.scriptText.trim()));

    const snapshot = JSON.stringify({
      title: project.title,
      script: project.script,
      selectedVoiceId: project.selectedVoiceId,
      sceneDrafts: sanitizeSceneDraftsForSave(hydratedSceneDrafts),
    });

    setLastSavedSnapshot(snapshot);
    setLastSavedAt(project.updatedAt);
    setProjectError(null);
  };

  const markProjectSaved = (project: ProjectDetailData) => {
    setLastSavedSnapshot(projectSnapshot);
    setLastSavedAt(project.updatedAt);
    setProjectError(null);
    upsertProjectSummary({
      id: project.id,
      title: project.title,
      sceneCount: sceneDrafts.length,
      updatedAt: project.updatedAt,
      createdAt: project.createdAt,
    });
  };

  const upsertProjectSummary = (project: ProjectSummaryData) => {
    setProjects((current) => {
      const next = current.filter((item) => item.id !== project.id);
      next.unshift(project);
      return next;
    });
  };

  useEffect(() => {
    if (sceneDrafts.length === 0) {
      setSelectedSceneId(null);
      return;
    }

    if (
      !selectedSceneId ||
      !sceneDrafts.some((scene) => scene.id === selectedSceneId)
    ) {
      setSelectedSceneId(sceneDrafts[0].id);
    }
  }, [sceneDrafts, selectedSceneId]);

  useEffect(() => {
    let cancelled = false;

    const bootstrapProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const response = await fetch("/api/projects");
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          throw new Error(
            getResponseMessage(payload) ?? "Unable to load your projects.",
          );
        }

        const result = ProjectsResponse.parse(payload);

        if (cancelled) {
          return;
        }

        setProjects(result.projects);

        if (result.currentProject) {
          applyProject(result.currentProject);
          return;
        }

        const createResponse = await fetch("/api/projects", {
          method: "POST",
        });
        const createPayload = await parseJsonResponse(createResponse);

        if (!createResponse.ok) {
          throw new Error(
            getResponseMessage(createPayload) ??
              "Unable to create your first project.",
          );
        }

        const created = CreateProjectResponse.parse(createPayload).project;

        if (!cancelled) {
          applyProject(created);
          setProjects([
            {
              id: created.id,
              title: created.title,
              sceneCount: created.sceneCount,
              updatedAt: created.updatedAt,
              createdAt: created.createdAt,
            },
          ]);
        }
      } catch (error) {
        if (!cancelled) {
          setProjectError(
            error instanceof Error
              ? error.message
              : "Unable to load your projects.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProjects(false);
        }
      }
    };

    void bootstrapProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadVoicePresets = async () => {
      try {
        const response = await fetch("/api/voice-presets");
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          throw new Error(
            getResponseMessage(payload) ?? "Unable to load voice presets.",
          );
        }

        const result = VoicePresetsResponse.parse(payload);

        if (!cancelled) {
          setVoicePresets(result.voices);

          if (result.voices.length > 0) {
            const hasSelectedVoice = result.voices.some((voice) => {
              return voice.voiceId === selectedVoiceId;
            });

            if (!hasSelectedVoice) {
              setSelectedVoiceId(result.voices[0].voiceId);
            }
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            error instanceof Error
              ? error.message
              : "Unable to load voice presets.",
          );
        }
      }
    };

    void loadVoicePresets();

    return () => {
      cancelled = true;
    };
  }, [selectedVoiceId]);

  const previewProject = useMemo(() => {
    return buildPreviewProject({
      projectTitle,
      script,
      scenes: sceneDrafts,
    });
  }, [projectTitle, sceneDrafts, script]);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      project: previewProject,
    };
  }, [previewProject]);
  const renderSignature = useMemo(() => JSON.stringify(inputProps), [inputProps]);
  const persistedRenderState = useMemo(() => {
    if (
      !persistedRender ||
      persistedRender.signature !== renderSignature ||
      !persistedRender.url
    ) {
      return null;
    }

    return {
      status: "done" as const,
      url: persistedRender.url,
      size: persistedRender.size,
    };
  }, [persistedRender, renderSignature]);

  const fps = previewProject.scenes[0]?.fps ?? 30;
  const durationInFrames = getProjectDurationInFrames(previewProject);
  const totalSeconds = Math.round((durationInFrames / fps) * 10) / 10;
  const readyForAudioCount = sceneDrafts.filter(
    (scene) => scene.tracedScene,
  ).length;
  const readyAudioCount = sceneDrafts.filter((scene) => scene.audioUrl).length;
  const visualsComplete =
    sceneDrafts.length > 0 && readyForAudioCount === sceneDrafts.length;
  const audioComplete =
    sceneDrafts.length > 0 && readyAudioCount === sceneDrafts.length;
  const selectedVoicePreset = useMemo(() => {
    return voicePresets.find((voice) => voice.voiceId === selectedVoiceId);
  }, [selectedVoiceId, voicePresets]);
  const isSelectedVoicePreviewing = previewingVoiceId === selectedVoiceId;

  const selectedSceneIndex = Math.max(
    0,
    sceneDrafts.findIndex((scene) => scene.id === selectedSceneId),
  );
  const selectedScene =
    sceneDrafts[selectedSceneIndex] ?? sceneDrafts[0] ?? null;
  const selectedScenePreviewProject = useMemo(() => {
    if (!selectedScene) {
      return previewProject;
    }

    return {
      ...previewProject,
      scenes: [selectedScene.tracedScene ?? previewProject.scenes[selectedSceneIndex]],
    };
  }, [previewProject, selectedScene, selectedSceneIndex]);
  const selectedSceneInputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      project: selectedScenePreviewProject,
    };
  }, [selectedScenePreviewProject]);
  const selectedSceneDurationInFrames =
    selectedScenePreviewProject.scenes[0]?.durationInFrames ?? durationInFrames;
  const selectedSceneFps = selectedScenePreviewProject.scenes[0]?.fps ?? fps;

  const updateSceneDraft = (
    sceneId: string,
    updater: (scene: SceneDraft) => SceneDraft,
  ) => {
    setSceneDrafts((current) => {
      return current.map((scene) => {
        return scene.id === sceneId ? updater(scene) : scene;
      });
    });
  };

  const moveScene = (sceneId: string, direction: -1 | 1) => {
    setSceneDrafts((current) => {
      const index = current.findIndex((scene) => scene.id === sceneId);

      if (index === -1) {
        return current;
      }

      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
  };

  const deleteScene = (sceneId: string) => {
    setSceneDrafts((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((scene) => scene.id !== sceneId);
    });
  };

  const addScene = () => {
    setSceneDrafts((current) => {
      const nextScene = createBlankSceneDraft(current.length);
      setSelectedSceneId(nextScene.id);
      setEditingSceneId(nextScene.id);
      return [...current, nextScene];
    });
  };

  const stopVoicePreview = () => {
    if (voicePreviewAudioRef.current) {
      voicePreviewAudioRef.current.pause();
      voicePreviewAudioRef.current.currentTime = 0;
      voicePreviewAudioRef.current = null;
    }

    setPreviewingVoiceId(null);
  };

  const toggleVoicePreview = () => {
    if (!selectedVoicePreset?.previewUrl) {
      return;
    }

    if (isSelectedVoicePreviewing) {
      stopVoicePreview();
      return;
    }

    stopVoicePreview();

    const audio = new Audio(selectedVoicePreset.previewUrl);
    voicePreviewAudioRef.current = audio;
    setPreviewingVoiceId(selectedVoicePreset.voiceId);

    audio.addEventListener("ended", () => {
      setPreviewingVoiceId(null);
      voicePreviewAudioRef.current = null;
    });
    audio.addEventListener("error", () => {
      setPreviewingVoiceId(null);
      voicePreviewAudioRef.current = null;
    });

    void audio.play().catch(() => {
      setPreviewingVoiceId(null);
      voicePreviewAudioRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      voicePreviewAudioRef.current?.pause();
    };
  }, []);

  const buildTimedTracedScene = (
    scene: Pick<
      SceneDraft,
      "id" | "title" | "scriptText" | "audioDurationInFrames" | "audioUrl"
    >,
    svgText: string,
  ) => {
    let tracedScene = buildSceneFromSvg({
      svgText,
      sceneId: scene.id,
      sceneTitle: scene.title,
      scriptText: scene.scriptText,
    });

    if (scene.audioDurationInFrames) {
      tracedScene = fitSceneDurationToFrames({
        scene: {
          ...tracedScene,
          audioSrc: scene.audioUrl,
        },
        targetDurationInFrames: scene.audioDurationInFrames,
        endHoldFrames: SCENE_END_HOLD_FRAMES,
      });
    }

    return tracedScene;
  };

  const buildVisualOption = ({
    scene,
    preset,
    svg,
    dataUrl,
    model,
  }: {
    scene: SceneDraft;
    preset: (typeof VISUAL_VARIATION_PRESETS)[number];
    svg: string;
    dataUrl: string;
    model: string;
  }): SceneVisualOption => {
    return {
      id: preset.id,
      label: preset.label,
      svgText: svg,
      svgDataUrl: dataUrl,
      svgLabel: model,
      tracedScene: buildTimedTracedScene(scene, svg),
    };
  };

  const saveProject = useEffectEvent(async () => {
    if (!projectId) {
      return;
    }

    try {
      setIsSavingProject(true);
      setProjectError(null);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(
          UpdateProjectRequest.parse({
            title: projectTitle.trim() || "Untitled project",
            script,
            selectedVoiceId,
            sceneDrafts: sanitizeSceneDraftsForSave(sceneDrafts),
          }),
        ),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload) ?? "Unable to save this project.",
        );
      }

      const project = ProjectResponse.parse(payload).project;
      markProjectSaved(project);
    } catch (error) {
      setProjectError(
        error instanceof Error ? error.message : "Unable to save this project.",
      );
    } finally {
      setIsSavingProject(false);
    }
  });

  useEffect(() => {
    if (!projectId || !isDirty || isSavingProject) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveProject();
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isDirty, isSavingProject, projectId, projectSnapshot, saveProject]);

  const createProject = async () => {
    try {
      setProjectError(null);
      setIsLoadingProjects(true);

      const response = await fetch("/api/projects", {
        method: "POST",
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload) ?? "Unable to create a new project.",
        );
      }

      const project = CreateProjectResponse.parse(payload).project;
      applyProject(project);
      setIsProjectSetupMode(true);
      upsertProjectSummary({
        id: project.id,
        title: project.title,
        sceneCount: project.sceneCount,
        updatedAt: project.updatedAt,
        createdAt: project.createdAt,
      });
    } catch (error) {
      setProjectError(
        error instanceof Error
          ? error.message
          : "Unable to create a new project.",
      );
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const loadProject = async (nextProjectId: string) => {
    if (nextProjectId === projectId) {
      return;
    }

    try {
      setProjectError(null);
      setIsLoadingProjects(true);

      const response = await fetch(`/api/projects/${nextProjectId}`);
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload) ?? "Unable to load this project.",
        );
      }

      const project = ProjectResponse.parse(payload).project;
      applyProject(project);
    } catch (error) {
      setProjectError(
        error instanceof Error ? error.message : "Unable to load this project.",
      );
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const deleteCurrentProject = async () => {
    if (!projectId) {
      return;
    }

    try {
      setProjectError(null);
      setIsLoadingProjects(true);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await parseJsonResponse(response);
        throw new Error(
          getResponseMessage(payload) ?? "Unable to delete this project.",
        );
      }

      const remainingProjects = projects.filter(
        (project) => project.id !== projectId,
      );
      setProjects(remainingProjects);

      if (remainingProjects[0]) {
        await loadProject(remainingProjects[0].id);
      } else {
        await createProject();
      }
    } catch (error) {
      setProjectError(
        error instanceof Error
          ? error.message
          : "Unable to delete this project.",
      );
      setIsLoadingProjects(false);
    }
  };

  const generateSceneSvgFromDraft = async (scene: SceneDraft) => {
    if (scene.scriptText.trim().length === 0) {
      return;
    }

    updateSceneDraft(scene.id, (current) => {
      return {
        ...current,
        isGenerating: true,
        generationError: undefined,
      };
    });

    try {
      const results = await Promise.all(
        VISUAL_VARIATION_PRESETS.map(async (preset) => {
          const response = await fetch("/api/generate-svg", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              projectTitle,
              sceneTitle: scene.title.trim() || "Scene",
              scriptText: scene.scriptText,
              variationPrompt: preset.prompt,
            }),
          });
          const payload = await parseJsonResponse(response);

          if (!response.ok) {
            throw new Error(
              getResponseMessage(payload) ??
                "Unable to generate an SVG for this scene.",
            );
          }

          return buildVisualOption({
            scene,
            preset,
            ...GenerateSvgResponse.parse(payload),
          });
        }),
      );

      updateSceneDraft(scene.id, (current) => {
        return selectVisualOption(
          {
            ...current,
            visualOptions: results,
            isGenerating: false,
            generationError: undefined,
          },
          current.selectedVisualOptionId ?? results[0]?.id,
        );
      });
    } catch (error) {
      updateSceneDraft(scene.id, (current) => {
        return {
          ...current,
          isGenerating: false,
          generationError:
            error instanceof Error
              ? error.message
              : "Unable to generate an SVG for this scene.",
        };
      });
    }
  };

  const generateSceneSvg = async (sceneId: string) => {
    const scene = sceneDrafts.find((current) => current.id === sceneId);

    if (!scene) {
      return;
    }

    await generateSceneSvgFromDraft(scene);
  };

  const generateAllSvgs = async (drafts = sceneDrafts) => {
    setIsGeneratingAllSvgs(true);

    try {
      for (const scene of drafts) {
        if (scene.scriptText.trim().length === 0) {
          continue;
        }

        await generateSceneSvgFromDraft(scene);
      }
    } finally {
      setIsGeneratingAllSvgs(false);
    }
  };

  const generateSceneAudioFromDraft = async (scene: SceneDraft) => {
    if (scene.scriptText.trim().length === 0) {
      return;
    }

    updateSceneDraft(scene.id, (current) => {
      return {
        ...current,
        isGeneratingAudio: true,
        audioError: undefined,
      };
    });

    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          projectTitle,
          sceneTitle: scene.title.trim() || "Scene",
          scriptText: scene.scriptText,
          voiceId: selectedVoiceId,
        }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload) ?? "Unable to generate audio for this scene.",
        );
      }

      const result = GenerateAudioResponse.parse(payload);
      const audioDurationInFrames = Math.max(
        1,
        Math.ceil(result.durationSeconds * fps),
      );

      updateSceneDraft(scene.id, (current) => {
        const nextScene = {
          ...current,
          audioUrl: result.audioUrl,
          audioLabel: `${result.voiceName} · ${result.model}`,
          audioDurationSeconds: result.durationSeconds,
          audioDurationInFrames,
          audioAlignment: result.alignment,
          isGeneratingAudio: false,
          audioError: undefined,
        };

        return selectVisualOption(
          {
            ...nextScene,
            tracedScene: current.tracedScene
              ? fitSceneDurationToFrames({
                  scene: {
                    ...current.tracedScene,
                    audioSrc: result.audioUrl,
                  },
                  targetDurationInFrames: audioDurationInFrames,
                  endHoldFrames: SCENE_END_HOLD_FRAMES,
                })
              : current.tracedScene,
          },
          current.selectedVisualOptionId,
        );
      });
    } catch (error) {
      updateSceneDraft(scene.id, (current) => {
        return {
          ...current,
          isGeneratingAudio: false,
          audioError:
            error instanceof Error
              ? error.message
              : "Unable to generate audio for this scene.",
        };
      });
    }
  };

  const generateSceneAudio = async (sceneId: string) => {
    const scene = sceneDrafts.find((current) => current.id === sceneId);

    if (!scene) {
      return;
    }

    await generateSceneAudioFromDraft(scene);
  };

  const generateAllAudio = async (drafts = sceneDrafts) => {
    setIsGeneratingAllAudio(true);

    try {
      for (const scene of drafts) {
        if (scene.scriptText.trim().length === 0) {
          continue;
        }

        await generateSceneAudioFromDraft(scene);
      }
    } finally {
      setIsGeneratingAllAudio(false);
    }
  };

  const startProjectFromScript = async () => {
    const trimmedScript = script.trim();

    if (trimmedScript.length === 0) {
      setProjectError("Add a script before creating scenes.");
      return;
    }

    setProjectError(null);
    setIsParsingScenes(true);

    try {
      const response = await fetch("/api/parse-scenes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          projectTitle: projectTitle.trim() || "Untitled project",
          script: trimmedScript,
        }),
      });
      const raw = await response.text();
      const payload = raw ? (JSON.parse(raw) as unknown) : null;

      if (!response.ok) {
        throw new Error(
          payload &&
            typeof payload === "object" &&
            "message" in payload &&
            typeof payload.message === "string"
            ? payload.message
            : "Unable to parse scenes.",
        );
      }

      const drafts = parsedScenesToDrafts(
        ParseScenesResponse.parse(payload).scenes,
      );

      setSceneDrafts(drafts);
      setSelectedSceneId(drafts[0]?.id ?? null);
      setPreviewMode("scene");
      setPersistedRender(null);
      setIsProjectSetupMode(false);

      await Promise.all([generateAllSvgs(drafts), generateAllAudio(drafts)]);
    } catch (error) {
      setProjectError(
        error instanceof Error
          ? error.message
          : "Unable to parse scenes.",
      );
    } finally {
      setIsParsingScenes(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden bg-[#f2eee6]">
      <div className="relative flex flex-1 overflow-hidden">
        <aside className="flex w-[272px] shrink-0 flex-col border-r border-[#d8cfbf] bg-[#ece4d7]">
          <div className="relative z-40 border-b border-[#d8cfbf] bg-[#ece4d7] px-4 py-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#827667]">
              Project
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProjectSwitcher(!showProjectSwitcher)}
                className="flex w-full items-center justify-between gap-2 rounded-md border border-[#d8cfbf] bg-[#f8f3eb] px-3 py-2 text-left text-sm font-semibold text-[#1f1c18] transition hover:border-[#c7bcab] hover:bg-white"
              >
                <span className="min-w-0 truncate">{projectTitle}</span>
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-[#9a9186]"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showProjectSwitcher && (
                <div className="absolute left-0 top-full z-[80] mt-2 w-full overflow-hidden rounded-lg border border-[#ddd5cb] bg-white shadow-[0_22px_60px_rgba(49,35,16,0.22)]">
                  <div className="border-b border-[#e8e2d9] px-3 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9a9186]">
                      Your Projects
                    </p>
                  </div>
                  <div className="max-h-44 overflow-y-auto py-1">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => {
                          void loadProject(project.id);
                          setShowProjectSwitcher(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                          project.id === projectId
                            ? "bg-[#f0ece6] font-medium text-[#1f1c18]"
                            : "text-[#5c564d] hover:bg-[#f8f5ef]"
                        }`}
                      >
                        <span className="truncate">{project.title}</span>
                        {project.id === projectId && (
                          <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1c8a5e]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[#e8e2d9] p-2">
                    <button
                      type="button"
                      onClick={() => {
                        void createProject();
                        setShowProjectSwitcher(false);
                      }}
                      disabled={isLoadingProjects}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#1f1c18] transition hover:bg-[#f8f5ef] disabled:opacity-50"
                    >
                      <span className="text-base leading-none">+</span> New
                      project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-3">
            {isProjectSetupMode ? (
              <div className="space-y-2 px-2">
                {[
                  ["Brief", "Paste script and choose the narrator."],
                  ["Scenes", "Split the story into production beats."],
                  ["Finish", "Generate visuals, voice, and export."],
                ].map(([label, description], index) => (
                  <div
                    key={label}
                    className={`rounded-lg border px-3 py-3 ${
                      index === 0
                        ? "border-[#1f1d1a] bg-[#1f1d1a] text-[#fffdfa]"
                        : "border-[#d8cfbf] bg-[#f6f0e7] text-[#74695d]"
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
                      Step {index + 1}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{label}</p>
                    <p className="mt-1 text-xs leading-5 opacity-75">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
            <div className="space-y-2">
              {sceneDrafts.map((scene, index) => {
                const isActive = scene.id === selectedScene?.id;
                const isEditing = scene.id === editingSceneId;

                return (
                  <div
                    key={scene.id}
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`group relative flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition ${
                      isActive
                        ? "border-[#315f8f] bg-[#f4f8fb] shadow-[0_12px_26px_rgba(49,95,143,0.12)]"
                        : "border-transparent bg-transparent hover:border-[#ddd5cb] hover:bg-white/70"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                        isActive
                          ? "bg-[#315f8f] text-[#f7fbff]"
                          : "bg-[#e2d6c5] text-[#5c564d]"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      {isEditing ? (
                        <Input
                          value={scene.title}
                          onChange={(event) => {
                            const nextValue = event.currentTarget.value;
                            updateSceneDraft(scene.id, (current) => ({
                              ...current,
                              title: nextValue,
                            }));
                          }}
                          onBlur={() => setEditingSceneId(null)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              setEditingSceneId(null);
                            }
                          }}
                          onClick={(event) => event.stopPropagation()}
                          autoFocus
                          className="h-6 min-h-0 rounded-lg border-[#d7d0c6] px-2 py-0 text-xs"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedSceneId(scene.id);
                            setEditingSceneId(scene.id);
                          }}
                          className="truncate text-left text-sm font-medium text-[#1f1c18]"
                        >
                          {scene.title || `Scene ${index + 1}`}
                        </button>
                      )}
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#9a9186]">
                        {getSceneRangeLabel(sceneDrafts, index, fps)}
                      </span>
                    </div>

                    <div className="relative flex items-center gap-1">
                      <span className="text-[#c8c0b5] opacity-0 transition group-hover:opacity-100">
                        <GripIcon />
                      </span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSceneMenuOpenId(
                            sceneMenuOpenId === scene.id ? null : scene.id,
                          );
                        }}
                        className="p-0.5 text-[#a8a095] opacity-0 transition hover:text-[#1f1c18] focus:opacity-100 group-hover:opacity-100"
                      >
                        <DotsIcon />
                      </button>

                      {sceneMenuOpenId === scene.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSceneMenuOpenId(null);
                            }}
                          />
                          <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-[#e8e2d9] bg-white py-1 shadow-lg">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                moveScene(scene.id, -1);
                                setSceneMenuOpenId(null);
                              }}
                              disabled={index === 0}
                              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-[#5c564d] hover:bg-[#f8f5ef] disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <ArrowIcon direction="up" /> Move Up
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                moveScene(scene.id, 1);
                                setSceneMenuOpenId(null);
                              }}
                              disabled={index === sceneDrafts.length - 1}
                              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-[#5c564d] hover:bg-[#f8f5ef] disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <ArrowIcon direction="down" /> Move Down
                            </button>
                            <div className="my-1 h-px bg-[#e8e2d9]" />
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                deleteScene(scene.id);
                                setSceneMenuOpenId(null);
                              }}
                              disabled={sceneDrafts.length === 1}
                              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              Delete scene
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              <Button
                onClick={addScene}
                variant="secondary"
                size="sm"
                className="h-10 w-full rounded-lg border-dashed border-[#c7b9a7] bg-[#f6f0e7] text-xs font-medium text-[#6e655a] hover:bg-white hover:text-[#1f1c18]"
              >
                + Add Scene
              </Button>
            </div>
            )}
          </div>

        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-[#f6f0e7]">
          {!isProjectSetupMode && (
          <div className="flex shrink-0 items-center justify-between gap-5 border-b border-[#d8cfbf] bg-[#fbf8f1] px-5 py-3">
            <div className="flex items-center gap-5">
              <span className="text-xs uppercase tracking-[0.16em] text-[#7a7369]">
                <span className="font-semibold text-[#1f1c18]">
                  {sceneDrafts.length}
                </span>{" "}
                scenes
              </span>
              <div className="h-3 w-px bg-[#ddd5cb]" />
              <span className="text-xs uppercase tracking-[0.16em] text-[#7a7369]">
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    visualsComplete ? "bg-[#2f7a55]" : "bg-[#d8a931]"
                  }`}
                />
                <span className="font-semibold text-[#1f1c18]">
                  {readyForAudioCount}/{sceneDrafts.length}
                </span>{" "}
                drawings
              </span>
              <div className="h-3 w-px bg-[#ddd5cb]" />
              <span className="text-xs uppercase tracking-[0.16em] text-[#7a7369]">
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    audioComplete ? "bg-[#2f7a55]" : "bg-[#d8a931]"
                  }`}
                />
                <span className="font-semibold text-[#1f1c18]">
                  {readyAudioCount}/{sceneDrafts.length}
                </span>{" "}
                audio
              </span>
              <div className="h-3 w-px bg-[#ddd5cb]" />
              <span className="text-xs uppercase tracking-[0.16em] text-[#7a7369]">
                <span className="font-semibold text-[#1f1c18]">
                  {totalSeconds}s
                </span>{" "}
                total
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RenderControls
                compact
                projectId={projectId}
                initialRenderState={persistedRenderState}
                renderSignature={renderSignature}
                inputProps={inputProps}
                disabled={sceneDrafts.some((scene) => {
                  return (
                    scene.isGenerating ||
                    scene.isGeneratingAudio ||
                    isGeneratingAllSvgs ||
                    isGeneratingAllAudio
                  );
                })}
              />
              <div
                className={`rounded-md border px-3 py-1.5 text-xs shadow-sm ${
                  isSavingProject || isDirty
                    ? "border-[#d8a931]/50 bg-[#fff7df] text-[#725818]"
                    : "border-[#2f7a55]/30 bg-[#eef8f1] text-[#225c3f]"
                }`}
              >
                {isSavingProject
                  ? "Saving"
                  : isDirty
                    ? "Queued"
                    : lastSavedAt
                      ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}`
                      : "Saved"}
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={!projectId || isLoadingProjects}
                size="sm"
                className="h-8 w-8 rounded-md border-[#d4ccc1] px-0 text-[#7a6f65] hover:border-[#efb3aa] hover:bg-[#fff5f4] hover:text-[#b33629]"
                aria-label="Delete project"
                title="Delete project"
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <div className={`mx-auto w-full px-6 py-6 ${isProjectSetupMode ? "max-w-[1180px]" : "max-w-[1080px]"}`}>
              {isProjectSetupMode ? (
                <div className="overflow-hidden rounded-lg border border-[#d8cfbf] bg-[#fffdfa] shadow-[0_30px_80px_rgba(52,39,20,0.12)]">
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="px-8 py-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f8376]">
                        Production brief
                      </p>
                      <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-[#1f1c18]">
                        Turn a script into a first cut.
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-[#6f675d]">
                        Paste the narration, choose a voice, and the studio will draft scenes, visuals, and voiceover in one run.
                      </p>

                      <div className="mt-8 space-y-5">
                        <div>
                          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8376]">
                            Project title
                          </label>
                          <Input
                            value={projectTitle}
                            onChange={(event) => setProjectTitle(event.currentTarget.value)}
                            className="h-11 rounded-lg border-[#d7d0c6] px-4"
                            placeholder="Untitled project"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8376]">
                            Script
                          </label>
                          <Textarea
                            value={script}
                            onChange={(event) => {
                              setScript(event.currentTarget.value);
                              setProjectError(null);
                            }}
                            className="min-h-[340px] rounded-lg border-[#d7d0c6] bg-[#fffdfa] px-4 py-4 text-sm leading-7"
                            placeholder="Paste the voiceover script here. The next step will split it into scene-sized beats."
                          />
                        </div>

                        <div className="grid gap-4 rounded-lg border border-[#e5dbce] bg-[#f8f3eb] p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                          <label className="block min-w-0">
                            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f8376]">
                              Voice
                            </span>
                            <div className="flex gap-3">
                              <select
                                value={selectedVoiceId}
                                onChange={(event) => {
                                  stopVoicePreview();
                                  setSelectedVoiceId(event.currentTarget.value);
                                }}
                                className="h-11 min-w-0 flex-1 rounded-lg border border-[#d7d0c6] bg-white py-0 pl-4 pr-14 text-sm text-[#1f1c18] outline-none transition focus:border-[#c7bcab]"
                              >
                                {voicePresets.map((voice) => (
                                  <option key={voice.voiceId} value={voice.voiceId}>
                                    {voice.name}
                                  </option>
                                ))}
                              </select>
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={toggleVoicePreview}
                                disabled={!selectedVoicePreset?.previewUrl}
                                className="h-11 shrink-0 border-[#d4ccc1] px-4 text-sm"
                                aria-label={
                                  isSelectedVoicePreviewing
                                    ? "Stop voice preview"
                                    : "Play voice preview"
                                }
                              >
                                <SpeakerIcon isPlaying={isSelectedVoicePreviewing} />
                                {isSelectedVoicePreviewing ? "Stop" : "Preview"}
                              </Button>
                            </div>
                          </label>

                          <Button
                            onClick={() => void startProjectFromScript()}
                            disabled={
                              isParsingScenes ||
                              isGeneratingAllSvgs ||
                              script.trim().length === 0
                            }
                            className="h-11 rounded-lg bg-[#1f1d1a] px-6 text-sm text-[#fffdfa] hover:bg-[#2a2723] disabled:opacity-40"
                          >
                            {isParsingScenes ? "Building first cut..." : "Build first cut"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-l border-[#e5dbce] bg-[#f4ede2] px-6 py-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f8376]">
                        First cut run
                      </p>
                      <div className="mt-5 space-y-3">
                        {[
                          "Split narration into scene beats.",
                          "Sketch three visual directions per scene.",
                          "Generate voiceover and open the edit bench.",
                        ].map((item, index) => (
                          <div
                            key={item}
                            className="rounded-lg border border-[#dfd4c6] bg-[#fffdfa] px-4 py-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1f1d1a] text-[11px] font-semibold text-[#fffdfa]">
                                {index + 1}
                              </span>
                              <p className="pt-1 text-sm leading-6 text-[#5f584f]">{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {isParsingScenes ? (
                        <div className="mt-5 rounded-lg border border-[#d8ccbc] bg-white px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1f1d1a] border-t-transparent" />
                            <div>
                              <p className="text-sm font-medium text-[#1f1c18]">
                                Building the first cut
                              </p>
                              <p className="mt-1 text-xs text-[#7a7369]">
                                Splitting scenes, sketching visuals, and generating voiceover.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {projectError ? (
                        <div className="mt-5">
                          <ErrorComp message={projectError} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="overflow-hidden rounded-lg border border-[#d8cfbf] bg-white shadow-[0_24px_70px_rgba(54,39,18,0.08)]">
                    <div className="border-b border-[#efe7dc] px-5 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f8376]">
                        Preview bench
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-[#1f1c18]">
                          {previewMode === "scene"
                            ? selectedScene?.title || `Scene ${selectedSceneIndex + 1}`
                            : "Full cut"}
                        </h3>
                        <div className="inline-flex rounded-md border border-[#ddd3c5] bg-[#f7f1e8] p-1">
                          <button
                            type="button"
                            onClick={() => setPreviewMode("scene")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                              previewMode === "scene"
                                ? "bg-white text-[#1f1c18] shadow-sm"
                                : "text-[#7a7369]"
                            }`}
                          >
                            Scene
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMode("video")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                              previewMode === "video"
                                ? "bg-white text-[#1f1c18] shadow-sm"
                                : "text-[#7a7369]"
                            }`}
                          >
                            Full video
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#fdfaf5] p-4 md:p-6">
                      <Player
                        component={ProjectVideo}
                        inputProps={
                          previewMode === "scene" ? selectedSceneInputProps : inputProps
                        }
                        durationInFrames={
                          previewMode === "scene"
                            ? selectedSceneDurationInFrames
                            : durationInFrames
                        }
                        fps={previewMode === "scene" ? selectedSceneFps : fps}
                        compositionHeight={VIDEO_HEIGHT}
                        compositionWidth={VIDEO_WIDTH}
                        acknowledgeRemotionLicense
                        style={{ width: "100%" }}
                        controls
                      />
                    </div>
                  </div>
                  {projectError && (
                    <div>
                      <ErrorComp message={projectError} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {!isProjectSetupMode && (
        <aside className="flex w-[360px] shrink-0 flex-col border-l border-[#d8cfbf] bg-[#fcfaf6]">
          {selectedScene ? (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-7">
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f8376]">
                          Drawing
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-[#1f1c18]">
                          Choose the strongest frame
                        </h3>
                      </div>
                      <Button
                        onClick={() => void generateSceneSvg(selectedScene.id)}
                        disabled={
                          selectedScene.isGenerating ||
                          selectedScene.scriptText.trim().length === 0
                        }
                        size="sm"
                        className="h-8 rounded-md bg-[#1f1d1a] px-3 text-xs text-[#fffdfa] hover:bg-[#2a2723] disabled:opacity-40"
                      >
                        {selectedScene.isGenerating
                          ? "Generating..."
                          : "New drawings"}
                      </Button>
                    </div>

                    <div
                      onClick={() => {
                        if (
                          !selectedScene.svgDataUrl &&
                          !selectedScene.isGenerating &&
                          selectedScene.scriptText.trim().length > 0
                        ) {
                          void generateSceneSvg(selectedScene.id);
                        }
                      }}
                      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-[#f4eee4] transition ${
                        isRenderableScenePreview(selectedScene.svgDataUrl)
                          ? "border-[#cabca9] shadow-[0_20px_50px_rgba(66,51,26,0.08)]"
                          : "cursor-pointer border-dashed border-[#d8ccbc] hover:border-[#c6beb2] hover:bg-[#f9f4ec]"
                      }`}
                    >
                      {isRenderableScenePreview(selectedScene.svgDataUrl) ? (
                        <Image
                          src={selectedScene.svgDataUrl ?? ""}
                          alt={`Preview for ${selectedScene.title}`}
                          fill
                          unoptimized
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-center">
                          <ThumbnailWaves color="#c6beb2" />
                          <p className="max-w-[220px] text-xs text-[#8f8376]">
                            {selectedScene.isGenerating
                              ? "Generating three drawing directions..."
                              : selectedScene.scriptText.trim().length === 0
                                ? "Add narration before requesting drawings."
                                : "Generate three directions, then keep the strongest frame."}
                          </p>
                        </div>
                      )}
                      {selectedScene.isGenerating && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                          <div className="flex items-center gap-2 rounded-md border border-[#e8e2d9] bg-white px-3 py-2 shadow-sm">
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#1f1d1a] border-t-transparent" />
                            <span className="text-xs text-[#5c564d]">
                              Sketching takes...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {VISUAL_VARIATION_PRESETS.map((preset) => {
                        const option = selectedScene.visualOptions?.find(
                          (item) => item.id === preset.id,
                        );
                        const isSelected =
                          selectedScene.selectedVisualOptionId === preset.id ||
                          (!selectedScene.selectedVisualOptionId &&
                            selectedScene.visualOptions?.[0]?.id === preset.id);

                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              if (!option) {
                                return;
                              }

                              updateSceneDraft(selectedScene.id, (current) =>
                                selectVisualOption(current, preset.id),
                              );
                            }}
                        disabled={!option}
                            className={`overflow-hidden rounded-lg border text-left transition ${
                              isSelected
                                ? "border-[#315f8f] bg-[#f4f8fb] shadow-sm"
                                : option
                                  ? "border-[#ddd3c5] bg-white hover:border-[#b9ae9c]"
                                  : "border-dashed border-[#ddd3c5] bg-[#f8f4ee] opacity-60"
                            }`}
                          >
                            <div className="relative aspect-[4/3] bg-[#f4eee4]">
                              {option ? (
                                <Image
                                  src={option.svgDataUrl}
                                  alt={`${preset.label} option`}
                                  fill
                                  unoptimized
                                  className="object-contain p-2"
                                />
                              ) : null}
                            </div>
                            <div className="px-2.5 py-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c564d]">
                                {preset.label}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {selectedScene.generationError && (
                      <div className="mt-3">
                        <ErrorComp message={selectedScene.generationError} />
                      </div>
                    )}
                  </section>

                  <section className="border-t border-[#e7ddd0] pt-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f8376]">
                          Voiceover
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-[#1f1c18]">
                          Narration and audio
                        </h3>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <select
                          value={selectedVoiceId}
                          onChange={(event) => {
                            stopVoicePreview();
                            setSelectedVoiceId(event.currentTarget.value);
                          }}
                          className="h-8 max-w-[132px] rounded-md border border-[#d8cfbf] bg-white py-0 pl-3 pr-10 text-xs text-[#1f1c18] outline-none transition focus:border-[#c7bcab]"
                          aria-label="Voice"
                        >
                          {voicePresets.map((voice) => (
                            <option key={voice.voiceId} value={voice.voiceId}>
                              {voice.name}
                            </option>
                          ))}
                        </select>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={toggleVoicePreview}
                          disabled={!selectedVoicePreset?.previewUrl}
                          className="h-8 w-8 shrink-0 rounded-md border-[#d4ccc1] px-0 text-xs"
                          aria-label={
                            isSelectedVoicePreviewing
                              ? "Stop voice preview"
                              : "Play voice preview"
                          }
                          title={
                            isSelectedVoicePreviewing
                              ? "Stop voice preview"
                              : "Play voice preview"
                          }
                        >
                          <SpeakerIcon isPlaying={isSelectedVoicePreviewing} />
                        </Button>
                      </div>
                    </div>

                    <Textarea
                      value={selectedScene.scriptText}
                      onChange={(event) => {
                        const nextValue = event.currentTarget.value;
                        updateSceneDraft(selectedScene.id, (current) => ({
                          ...current,
                          scriptText: nextValue,
                          generationError: undefined,
                          audioError: undefined,
                        }));
                      }}
                      className="min-h-[132px] resize-none rounded-lg border-[#d7d0c6] bg-white text-sm leading-relaxed"
                      placeholder="Voiceover text for this scene..."
                    />

                    {selectedScene.scriptText.trim().length === 0 &&
                      !selectedScene.audioUrl && (
                      <p className="mt-3 text-[11px] text-[#8f8376]">
                        Add narration before creating the audio pass.
                      </p>
                    )}

                    <Button
                      variant="secondary"
                      onClick={() => void generateSceneAudio(selectedScene.id)}
                      disabled={
                        selectedScene.isGeneratingAudio ||
                        selectedScene.scriptText.trim().length === 0
                      }
                      size="sm"
                      className="mt-3 h-8 w-full rounded-md border-[#d4ccc1] px-3 text-xs disabled:opacity-40"
                    >
                      {selectedScene.isGeneratingAudio
                        ? "Generating..."
                        : "Generate audio"}
                    </Button>

                    {selectedScene.audioUrl && (
                      <audio
                        controls
                        src={selectedScene.audioUrl}
                        className="mt-3 h-9 w-full rounded-lg"
                      />
                    )}

                    {selectedScene.audioLabel && (
                      <p className="mt-1.5 text-[11px] text-[#8f8376]">
                        {selectedScene.audioLabel}
                      </p>
                    )}

                    {selectedScene.audioError && (
                      <div className="mt-2">
                        <ErrorComp message={selectedScene.audioError} />
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
              <ThumbnailWaves color="#c6beb2" />
              <p className="text-sm font-medium text-[#9a9186]">
                No scene selected
              </p>
              <p className="text-xs text-[#b5aea8]">
                Select a scene from the left panel to edit it
              </p>
            </div>
          )}
        </aside>
        )}
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1f1c18]/35 px-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            className="w-full max-w-sm rounded-lg border border-[#d8cfbf] bg-[#fffdfa] p-5 shadow-[0_28px_80px_rgba(31,28,24,0.28)]"
          >
            <p
              id="delete-project-title"
              className="text-base font-semibold text-[#1f1c18]"
            >
              Delete this project?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#6f675d]">
              {projectTitle} and its scenes, visuals, voice passes, and export
              history will be removed.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-[#d4ccc1]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  setIsDeleteDialogOpen(false);
                  await deleteCurrentProject();
                }}
                disabled={isLoadingProjects}
                className="bg-[#b33629] text-[#fffdfa] hover:bg-[#962d22]"
              >
                Delete project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
