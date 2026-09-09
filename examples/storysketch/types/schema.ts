import { z } from "zod";
import { CompositionProps } from "./constants";
import { WhiteboardScene } from "./whiteboard";

export const RenderRequest = z.object({
  id: z.string(),
  projectId: z.string().min(1).optional(),
  renderSignature: z.string().min(1).optional(),
  inputProps: CompositionProps,
});

export const GenerateSvgRequest = z.object({
  projectTitle: z.string().trim().min(1).max(160),
  sceneTitle: z.string().trim().min(1).max(160),
  scriptText: z.string().trim().min(1).max(4000),
  variationPrompt: z.string().trim().min(1).max(240).optional(),
});

export const GenerateSvgResponse = z.object({
  svg: z.string().min(1),
  dataUrl: z.string().min(1),
  model: z.string().min(1),
});

export const AudioAlignment = z.object({
  chars: z.array(z.string()),
  charStartTimesMs: z.array(z.number().nonnegative()),
  charDurationsMs: z.array(z.number().nonnegative()),
});

export const GenerateAudioRequest = z.object({
  projectTitle: z.string().trim().min(1).max(160),
  sceneTitle: z.string().trim().min(1).max(160),
  scriptText: z.string().trim().min(1).max(4000),
  voiceId: z.string().trim().min(1).optional(),
});

export const ParseScenesRequest = z.object({
  projectTitle: z.string().trim().min(1).max(160),
  script: z.string().trim().min(1).max(12000),
});

export const ParsedScene = z.object({
  title: z.string().trim().min(1).max(160),
  scriptText: z.string().trim().min(1).max(4000),
});

export const ParseScenesResponse = z.object({
  scenes: z.array(ParsedScene).min(1).max(24),
  model: z.string().min(1),
});

export const GenerateAudioResponse = z.object({
  audioUrl: z.string().url(),
  contentType: z.string().min(1),
  durationSeconds: z.number().positive(),
  voiceId: z.string().min(1),
  voiceName: z.string().min(1),
  model: z.string().min(1),
  alignment: AudioAlignment,
});

export const VoicePreset = z.object({
  voiceId: z.string().min(1),
  name: z.string().min(1),
  previewUrl: z.string().url().optional(),
  metadata: z.object({
    gender: z.string().optional(),
    accent: z.string().optional(),
    age: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const VoicePresetsResponse = z.object({
  voices: z.array(VoicePreset),
});

export const PersistedSceneDraft = z.object({
  id: z.string().min(1),
  title: z.string(),
  scriptText: z.string(),
  svgText: z.string().optional(),
  svgDataUrl: z.string().optional(),
  svgLabel: z.string().optional(),
  tracedScene: WhiteboardScene.optional(),
  visualOptions: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        svgText: z.string().min(1),
        svgDataUrl: z.string().min(1),
        svgLabel: z.string().optional(),
        tracedScene: WhiteboardScene,
      }),
    )
    .optional(),
  selectedVisualOptionId: z.string().min(1).optional(),
  isGenerating: z.boolean().optional(),
  generationError: z.string().optional(),
  audioUrl: z.string().optional(),
  audioLabel: z.string().optional(),
  audioDurationSeconds: z.number().optional(),
  audioDurationInFrames: z.number().int().optional(),
  audioAlignment: AudioAlignment.optional(),
  isGeneratingAudio: z.boolean().optional(),
  audioError: z.string().optional(),
});
export type PersistedSceneDraftData = z.infer<typeof PersistedSceneDraft>;

export const ProjectSummary = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  sceneCount: z.number().int().nonnegative(),
  updatedAt: z.string().min(1),
  createdAt: z.string().min(1),
});

export const ProjectDetail = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  script: z.string(),
  selectedVoiceId: z.string().min(1),
  sceneDrafts: z.array(PersistedSceneDraft),
  render: z
    .object({
      url: z.string().url(),
      size: z.number().int().nonnegative(),
      signature: z.string(),
      completedAt: z.string().nullable(),
    })
    .nullable(),
  sceneCount: z.number().int().nonnegative(),
  updatedAt: z.string().min(1),
  createdAt: z.string().min(1),
});

export const ProjectsResponse = z.object({
  projects: z.array(ProjectSummary),
  currentProject: ProjectDetail.nullable(),
});

export const CreateProjectResponse = z.object({
  project: ProjectDetail,
});

export const UpdateProjectRequest = z.object({
  title: z.string().trim().min(1).max(160),
  script: z.string(),
  selectedVoiceId: z.string().trim().min(1),
  sceneDrafts: z.array(PersistedSceneDraft).min(1),
});

export const ProjectResponse = z.object({
  project: ProjectDetail,
});

export type RenderResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

export type SSEMessage =
  | { type: "phase"; phase: string; progress: number; subtitle?: string }
  | { type: "done"; url: string; size: number }
  | { type: "error"; message: string };
