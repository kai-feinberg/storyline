import { randomUUID } from "crypto";

import { AudioAlignment } from "@/types/schema";
import { WhiteboardScene } from "@/types/whiteboard";
import {
  createBlankSceneDraft,
  type SceneDraft,
} from "@/lib/scene-planning";

export const DEFAULT_SELECTED_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

export type ProjectRecord = {
  id: string;
  title: string;
  script: string | null;
  selectedVoiceId: string;
  sceneDrafts: SceneDraft[];
  renderUrl: string | null;
  renderSize: number | null;
  renderSignature: string | null;
  renderCompletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  sceneCount: number;
};

export const sanitizeSceneDraftsForStorage = (
  sceneDrafts: SceneDraft[],
): SceneDraft[] => {
  return sceneDrafts.map((scene) => ({
    ...scene,
    tracedScene: scene.tracedScene
      ? WhiteboardScene.parse(scene.tracedScene)
      : undefined,
    audioAlignment: scene.audioAlignment
      ? AudioAlignment.parse(scene.audioAlignment)
      : undefined,
    visualOptions: scene.visualOptions?.map((option) => ({
      ...option,
      tracedScene: WhiteboardScene.parse(option.tracedScene),
    })),
    isGenerating: false,
    isGeneratingAudio: false,
    generationError: undefined,
    audioError: undefined,
  }));
};

export const createStarterProject = () => {
  const title = "Untitled project";
  const script = "";
  const sceneDrafts = sanitizeSceneDraftsForStorage([createBlankSceneDraft(0)]);

  return {
    id: randomUUID(),
    title,
    prompt: null,
    script,
    selectedVoiceId: DEFAULT_SELECTED_VOICE_ID,
    sceneDrafts,
    renderUrl: null,
    renderSize: null,
    renderSignature: null,
    renderCompletedAt: null,
    sceneCount: sceneDrafts.length,
  };
};

export const toProjectSummary = (project: ProjectRecord) => ({
  id: project.id,
  title: project.title,
  sceneCount: project.sceneCount,
  updatedAt: project.updatedAt.toISOString(),
  createdAt: project.createdAt.toISOString(),
});

export const toProjectDetail = (project: ProjectRecord) => ({
  id: project.id,
  title: project.title,
  script: project.script ?? "",
  selectedVoiceId: project.selectedVoiceId,
  sceneDrafts: sanitizeSceneDraftsForStorage(project.sceneDrafts),
  render: project.renderUrl
    ? {
        url: project.renderUrl,
        size: project.renderSize ?? 0,
        signature: project.renderSignature ?? "",
        completedAt: project.renderCompletedAt?.toISOString() ?? null,
      }
    : null,
  sceneCount: project.sceneCount,
  updatedAt: project.updatedAt.toISOString(),
  createdAt: project.createdAt.toISOString(),
});
