import { z } from "zod";
import { demoProject } from "./demo-project";
import { getProjectDurationInFrames, WhiteboardProject } from "./whiteboard";

export const COMP_NAME = "ProjectVideo";

export const CompositionProps = z.object({
  project: WhiteboardProject,
});

export const defaultProjectVideoProps: z.infer<typeof CompositionProps> = {
  project: demoProject,
};

export const DURATION_IN_FRAMES = getProjectDurationInFrames(demoProject);
export const VIDEO_WIDTH = demoProject.scenes[0].width;
export const VIDEO_HEIGHT = demoProject.scenes[0].height;
export const VIDEO_FPS = demoProject.scenes[0].fps;
