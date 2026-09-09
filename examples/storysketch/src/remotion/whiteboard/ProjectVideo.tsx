import {
  AbsoluteFill,
  type CalculateMetadataFunction,
  Sequence,
} from "remotion";
import { z } from "zod";
import { CompositionProps } from "../../../types/constants";
import { getProjectDurationInFrames } from "../../../types/whiteboard";
import { WhiteboardScene } from "./WhiteboardScene";

export const calculateProjectVideoMetadata: CalculateMetadataFunction<
  z.infer<typeof CompositionProps>
> = async ({ props }) => {
  const firstScene = props.project.scenes[0];

  return {
    durationInFrames: getProjectDurationInFrames(props.project),
    fps: firstScene.fps,
    width: firstScene.width,
    height: firstScene.height,
  };
};

export const ProjectVideo = ({
  project,
}: z.infer<typeof CompositionProps>) => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#f7f3ea" }}>
      {project.scenes.map((scene) => {
        const from = startFrame;
        startFrame += scene.durationInFrames;

        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
          >
            <WhiteboardScene scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
