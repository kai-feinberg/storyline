"use client";

import { Player, type PlayerRef } from "@remotion/player";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { z } from "zod";

import {
  landingDemoProject,
  type LandingDemoScene,
} from "@/components/landing-demo-project";
import { cn } from "@/lib/utils";
import { ProjectVideo } from "@/remotion/whiteboard/ProjectVideo";
import {
  CompositionProps,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import type { WhiteboardProjectData } from "@/types/whiteboard";
import { getProjectDurationInFrames } from "@/types/whiteboard";

const formatTimestamp = (frame: number, fps: number): string => {
  const totalSeconds = Math.max(0, Math.floor(frame / fps));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const getSceneStartFrame = (
  scenes: WhiteboardProjectData["scenes"],
  sceneIndex: number,
): number => {
  return scenes.slice(0, sceneIndex).reduce((total, scene) => {
    return total + scene.durationInFrames;
  }, 0);
};

const getInitialVisualSelections = (): Record<string, string> => {
  return Object.fromEntries(
    landingDemoProject.scenes.map((scene) => [
      scene.id,
      scene.selectedVisualOptionId ?? scene.visualOptions[0].id,
    ]),
  );
};

const buildDemoProject = (
  selectedVisualIds: Record<string, string>,
): WhiteboardProjectData => {
  return {
    id: landingDemoProject.id,
    title: landingDemoProject.title,
    script: landingDemoProject.script,
    aspectRatio: "16:9",
    scenes: landingDemoProject.scenes.map((scene, index) => {
      const selectedVisual =
        scene.visualOptions.find(
          (option) => option.id === selectedVisualIds[scene.id],
        ) ?? scene.visualOptions[0];

      return {
        ...selectedVisual.tracedScene,
        id: `${scene.id}-${selectedVisual.id}-${index + 1}`,
        title: scene.title,
        scriptText: scene.scriptText,
      };
    }),
  };
};

const getVisualLabel = (label: string): string => {
  if (label.toLowerCase().includes("minimal")) {
    return "Minimal";
  }

  if (label.toLowerCase().includes("story")) {
    return "Story";
  }

  if (label.toLowerCase().includes("process")) {
    return "Process";
  }

  return label;
};

export function HeroInteractiveDemo() {
  const playerRef = useRef<PlayerRef>(null);
  const [activeSceneId, setActiveSceneId] = useState(
    landingDemoProject.scenes[0].id,
  );
  const [selectedVisualIds, setSelectedVisualIds] = useState(
    getInitialVisualSelections,
  );

  const demoProject = useMemo(
    () => buildDemoProject(selectedVisualIds),
    [selectedVisualIds],
  );
  const inputProps: z.infer<typeof CompositionProps> = useMemo(
    () => ({
      project: demoProject,
    }),
    [demoProject],
  );
  const fps = demoProject.scenes[0]?.fps ?? 30;
  const durationInFrames = getProjectDurationInFrames(demoProject);
  const sceneStartFrames = useMemo(() => {
    let startFrame = 0;

    return demoProject.scenes.map((scene) => {
      const sceneStartFrame = startFrame;
      startFrame += scene.durationInFrames;

      return sceneStartFrame;
    });
  }, [demoProject.scenes]);
  const activeSceneIndex = Math.max(
    0,
    landingDemoProject.scenes.findIndex((scene) => scene.id === activeSceneId),
  );
  const activeScene =
    landingDemoProject.scenes[activeSceneIndex] ?? landingDemoProject.scenes[0];
  const activePreviewScene =
    demoProject.scenes[activeSceneIndex] ?? demoProject.scenes[0];
  const sceneStartFrame =
    sceneStartFrames[activeSceneIndex] ??
    getSceneStartFrame(demoProject.scenes, activeSceneIndex);
  const sceneEndFrame = sceneStartFrame + activePreviewScene.durationInFrames;
  const initialFrame = Math.min(sceneStartFrame + 8, durationInFrames - 1);
  const remotionKey = landingDemoProject.scenes
    .map((scene) => selectedVisualIds[scene.id])
    .join(":");

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    const onFrameUpdate = ({ detail }: { detail: { frame: number } }) => {
      const currentSceneIndex = sceneStartFrames.findLastIndex(
        (startFrame) => detail.frame >= startFrame,
      );
      const currentScene = landingDemoProject.scenes[currentSceneIndex];

      if (currentScene) {
        setActiveSceneId((current) =>
          current === currentScene.id ? current : currentScene.id,
        );
      }
    };

    player.addEventListener("frameupdate", onFrameUpdate);

    return () => {
      player.removeEventListener("frameupdate", onFrameUpdate);
    };
  }, [sceneStartFrames]);

  const selectScene = (sceneId: string, index: number) => {
    setActiveSceneId(sceneId);
    playerRef.current?.seekTo(
      Math.min((sceneStartFrames[index] ?? 0) + 8, durationInFrames - 1),
    );
  };

  const updateVisual = (scene: LandingDemoScene, optionId: string) => {
    setSelectedVisualIds((current) => ({
      ...current,
      [scene.id]: optionId,
    }));
    setActiveSceneId(scene.id);
  };

  return (
    <div className="relative">
      <div className="rounded-lg border border-[#1d211b] bg-[#fbfcf6] shadow-[12px_12px_0_#1d211b]">
        <div className="flex flex-col gap-3 border-b border-[#1d211b] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#596050]">
              Try the studio
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1d211b]">
              StorySketch ad preview
            </p>
          </div>
          <div className="rounded-md border border-[#d7d9ca] bg-[#f5f6ef] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#596050]">
            {formatTimestamp(sceneStartFrame, fps)} - {formatTimestamp(sceneEndFrame, fps)}
          </div>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-md border border-[#1d211b] bg-[#fdfaf5]">
              <Player
              key={remotionKey}
              ref={playerRef}
              component={ProjectVideo}
                inputProps={inputProps}
                durationInFrames={durationInFrames}
                fps={fps}
                initialFrame={initialFrame}
                compositionHeight={VIDEO_HEIGHT}
                compositionWidth={VIDEO_WIDTH}
                acknowledgeRemotionLicense
                style={{ width: "100%" }}
                controls
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
              {landingDemoProject.scenes.map((scene, index) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => selectScene(scene.id, index)}
                  className={cn(
                    "min-h-16 rounded-md border px-3 py-2 text-left transition",
                    activeScene.id === scene.id
                      ? "border-[#1d211b] bg-[#dfe8cf] text-[#1d211b]"
                      : "border-[#c8cdb8] bg-[#fbfcf6] text-[#596050] hover:border-[#1d211b]",
                  )}
                >
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                    Scene {index + 1}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-5">
                    {scene.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-md border border-[#d5d9c5] bg-[#f5f6ef] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#1d211b]">Scene script</p>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9f3324]">
                  Voiceover
                </span>
              </div>
              <p className="mt-2 min-h-20 text-sm leading-6 text-[#596050]">
                "{activeScene.scriptText}"
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#596050]">
                Visual direction
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {activeScene.visualOptions.map((option) => {
                  const isSelected = selectedVisualIds[activeScene.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => updateVisual(activeScene, option.id)}
                      className={cn(
                        "grid overflow-hidden rounded-md border bg-[#fbfcf6] text-left transition sm:block lg:grid lg:grid-cols-[112px_1fr] lg:items-center",
                        isSelected
                          ? "border-[#b93f2d] text-[#9f3324] shadow-sm"
                          : "border-[#c8cdb8] text-[#3e4638] hover:border-[#b93f2d]",
                      )}
                    >
                      <span className="relative block aspect-video bg-[#fffaf4]">
                        <Image
                          src={option.svgDataUrl}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 160px"
                          className="object-contain p-2"
                          unoptimized
                        />
                      </span>
                      <span className="block px-3 py-2 text-sm font-semibold">
                        {getVisualLabel(option.label)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
