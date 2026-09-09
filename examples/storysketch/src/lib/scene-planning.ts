import { demoProject } from "../../types/demo-project";
import type { z } from "zod";
import type { AudioAlignment } from "../../types/schema";
import type { WhiteboardProjectData, WhiteboardSceneData } from "../../types/whiteboard";

export type SceneVisualOption = {
  id: string;
  label: string;
  svgText: string;
  svgDataUrl: string;
  svgLabel?: string;
  tracedScene: WhiteboardSceneData;
};

export type SceneDraft = {
  id: string;
  title: string;
  scriptText: string;
  svgText?: string;
  svgDataUrl?: string;
  svgLabel?: string;
  tracedScene?: WhiteboardSceneData;
  visualOptions?: SceneVisualOption[];
  selectedVisualOptionId?: string;
  isGenerating?: boolean;
  generationError?: string;
  audioUrl?: string;
  audioLabel?: string;
  audioDurationSeconds?: number;
  audioDurationInFrames?: number;
  audioAlignment?: z.infer<typeof AudioAlignment>;
  isGeneratingAudio?: boolean;
  audioError?: string;
};

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const toSentenceChunks = (script: string): string[] => {
  const sentences = script
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return [];
  }

  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentWords = 0;

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).filter(Boolean).length;

    if (
      currentChunk.length > 0 &&
      (currentChunk.length >= 2 || currentWords + sentenceWords > 28)
    ) {
      chunks.push(currentChunk.join(" ").trim());
      currentChunk = [];
      currentWords = 0;
    }

    currentChunk.push(sentence);
    currentWords += sentenceWords;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" ").trim());
  }

  return chunks;
};

const toWordChunks = (script: string): string[] => {
  const words = script.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [];
  }

  const chunks: string[] = [];

  for (let index = 0; index < words.length; index += 18) {
    chunks.push(words.slice(index, index + 18).join(" "));
  }

  return chunks;
};

const deriveSceneTitle = (text: string, index: number): string => {
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "")
    .trim();
  const words = cleaned.split(" ").filter(Boolean).slice(0, 5);
  const title = words.join(" ");

  if (title.length === 0) {
    return `Scene ${index + 1}`;
  }

  return title.length > 42 ? `${title.slice(0, 39).trim()}...` : title;
};

export const generateSceneDrafts = (script: string): SceneDraft[] => {
  const normalized = script.trim();

  if (normalized.length === 0) {
    return [
      {
        id: "scene-1",
        title: "Scene 1",
        scriptText: "",
      },
    ];
  }

  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks =
    paragraphs.length > 1
      ? paragraphs
      : toSentenceChunks(normalized).length > 0
        ? toSentenceChunks(normalized)
        : toWordChunks(normalized);

  return chunks.map((chunk, index) => {
    const title = deriveSceneTitle(chunk, index);
    const slug = slugify(title) || `scene-${index + 1}`;

    return {
      id: `${slug}-${index + 1}`,
      title,
      scriptText: chunk,
    };
  });
};

export const parsedScenesToDrafts = (
  scenes: Array<{
    title: string;
    scriptText: string;
  }>,
): SceneDraft[] => {
  return scenes.map((scene, index) => {
    const safeTitle = scene.title.trim() || deriveSceneTitle(scene.scriptText, index);
    const slug = slugify(safeTitle) || `scene-${index + 1}`;

    return {
      id: `${slug}-${index + 1}`,
      title: safeTitle,
      scriptText: scene.scriptText.trim(),
    };
  });
};

export const createBlankSceneDraft = (index: number): SceneDraft => {
  return {
    id: `scene-${index + 1}-${Date.now()}`,
    title: `Scene ${index + 1}`,
    scriptText: "",
  };
};

export const createInitialSceneDrafts = (): SceneDraft[] => {
  return demoProject.scenes.map((scene, index) => {
    return {
      id: `demo-scene-${index + 1}`,
      title: scene.title,
      scriptText: scene.scriptText,
      svgLabel: "Demo artwork",
      tracedScene: undefined,
    };
  });
};

export const buildPreviewProject = ({
  projectTitle,
  script,
  scenes,
}: {
  projectTitle: string;
  script: string;
  scenes: SceneDraft[];
}): WhiteboardProjectData => {
  const safeScenes = scenes.length > 0 ? scenes : createInitialSceneDrafts();

  return {
    id: slugify(projectTitle) || demoProject.id,
    title: projectTitle.trim() || demoProject.title,
    script,
    aspectRatio: "16:9",
    scenes: safeScenes.map((scene, index) => {
      if (scene.tracedScene) {
        return {
          ...scene.tracedScene,
          id: `${scene.id}-preview-${index + 1}`,
          title: scene.title.trim() || `Scene ${index + 1}`,
          scriptText: scene.scriptText,
          audioSrc: scene.audioUrl,
        };
      }

      const visualTemplate = demoProject.scenes[index % demoProject.scenes.length];

      return {
        ...visualTemplate,
        id: `${scene.id}-preview-${index + 1}`,
        title: scene.title.trim() || `Scene ${index + 1}`,
        scriptText: scene.scriptText,
        audioSrc: scene.audioUrl,
        finalSourceSvg: scene.svgDataUrl ?? visualTemplate.finalSourceSvg,
        calloutText: undefined,
      };
    }),
  };
};
