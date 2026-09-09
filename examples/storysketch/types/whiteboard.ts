import { z } from "zod";

export const WhiteboardStroke = z.object({
  id: z.string(),
  path: z.string(),
  strokeWidth: z.number().positive(),
  revealWidth: z.number().positive(),
  stroke: z.string(),
  length: z.number().nonnegative(),
  startFrame: z.number().int().nonnegative(),
  duration: z.number().int().positive(),
});

export const WhiteboardMarker = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  tipOffsetX: z.number().nonnegative(),
  tipOffsetY: z.number().nonnegative(),
  maxTiltDegrees: z.number().nonnegative().optional(),
});

export const WhiteboardTiming = z.object({
  startFrame: z.number().int().nonnegative(),
  gapFrames: z.number().int().nonnegative(),
  minTravelFrames: z.number().int().nonnegative(),
  maxTravelFrames: z.number().int().nonnegative(),
  travelPixelsPerFrame: z.number().positive(),
  connectedThresholdPx: z.number().positive(),
  framesPerHundredPx: z.number().positive(),
  minDuration: z.number().int().positive(),
  maxDuration: z.number().int().positive(),
  endHoldFrames: z.number().int().nonnegative(),
});

export const WhiteboardScene = z.object({
  id: z.string(),
  title: z.string(),
  scriptText: z.string(),
  audioSrc: z.string().optional(),
  svg: z.string().optional(),
  finalSourceSvg: z.string().optional(),
  sourceImage: z.string().optional(),
  cleanedImage: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fps: z.number().int().positive(),
  background: z.string(),
  subtitleLimitedTilt: z.string(),
  handAsset: z.string(),
  calloutText: z.string().optional(),
  marker: WhiteboardMarker,
  timing: WhiteboardTiming,
  renderMode: z.enum(["stroke", "bitmap-reveal"]),
  durationInFrames: z.number().int().positive(),
  strokes: z.array(WhiteboardStroke).min(1),
});

export const WhiteboardProject = z.object({
  id: z.string(),
  title: z.string(),
  script: z.string(),
  aspectRatio: z.literal("16:9"),
  scenes: z.array(WhiteboardScene).min(1),
});

export type WhiteboardStrokeData = z.infer<typeof WhiteboardStroke>;
export type WhiteboardMarkerData = z.infer<typeof WhiteboardMarker>;
export type WhiteboardTimingData = z.infer<typeof WhiteboardTiming>;
export type WhiteboardSceneData = z.infer<typeof WhiteboardScene>;
export type WhiteboardProjectData = z.infer<typeof WhiteboardProject>;

export const getProjectDurationInFrames = (
  project: WhiteboardProjectData,
): number => {
  return project.scenes.reduce((total, scene) => {
    return total + scene.durationInFrames;
  }, 0);
};
