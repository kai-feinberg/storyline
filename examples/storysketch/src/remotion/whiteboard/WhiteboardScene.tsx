import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useMemo } from "react";
import {
  evolvePath,
  getLength,
  getPointAtLength,
  getTangentAtLength,
} from "@remotion/paths";
import type {
  WhiteboardMarkerData,
  WhiteboardSceneData,
  WhiteboardStrokeData,
} from "../../../types/whiteboard";

const resolveAsset = (value: string): string => {
  return value.startsWith("data:") || /^https?:\/\//.test(value)
    ? value
    : staticFile(value);
};

const clampProgress = (
  frame: number,
  startFrame: number,
  duration: number,
): number => {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const normalizeMarkerAngle = (angle: number): number => {
  if (angle > Math.PI / 2) {
    return angle - Math.PI;
  }

  if (angle < -Math.PI / 2) {
    return angle + Math.PI;
  }

  return angle;
};

const clampMarkerAngle = (angle: number, maxDegrees: number): number => {
  const maxRadians = (maxDegrees * Math.PI) / 180;
  return Math.max(-maxRadians, Math.min(maxRadians, angle));
};

const getPoseOnPath = (
  path: string,
  length: number,
  progress: number,
): { x: number; y: number; angle: number } => {
  const currentLength = Math.max(0, Math.min(length, progress * length));
  const point = getPointAtLength(path, currentLength);
  const tangent = getTangentAtLength(path, Math.min(length, currentLength + 0.1));
  const angle = normalizeMarkerAngle(Math.atan2(tangent.y, tangent.x));

  return {
    x: point.x,
    y: point.y,
    angle,
  };
};

type StrokeGeometry = WhiteboardStrokeData & {
  strokeData: WhiteboardStrokeData;
  length: number;
  startPose: { x: number; y: number; angle: number };
  endPose: { x: number; y: number; angle: number };
};

type MarkerState =
  | {
      mode: "draw";
      stroke: StrokeGeometry;
      progress: number;
      visible: true;
    }
  | {
      mode: "travel";
      visible: true;
      x: number;
      y: number;
      angle: number;
      progress: number;
      stroke: StrokeGeometry;
    }
  | {
      mode: "hidden";
      stroke: null;
      progress: 1;
      visible: false;
    };

const getMarkerState = (
  frame: number,
  strokeGeometries: StrokeGeometry[],
): MarkerState => {
  for (let index = 0; index < strokeGeometries.length; index += 1) {
    const stroke = strokeGeometries[index];
    const strokeEnd = stroke.startFrame + stroke.duration;

    if (frame >= stroke.startFrame && frame <= strokeEnd) {
      return {
        mode: "draw",
        stroke,
        progress: clampProgress(frame, stroke.startFrame, stroke.duration),
        visible: true,
      };
    }

    const nextStroke = strokeGeometries[index + 1];
    const gapFrames = nextStroke ? nextStroke.startFrame - strokeEnd : 0;

    if (
      nextStroke &&
      frame >= strokeEnd &&
      frame < nextStroke.startFrame &&
      gapFrames > 0
    ) {
      const travelProgress = clampProgress(frame, strokeEnd, gapFrames);
      const fromPose = stroke.endPose;
      const toPose = nextStroke.startPose;

      return {
        mode: "travel",
        stroke: nextStroke,
        progress: travelProgress,
        visible: true,
        x: interpolate(travelProgress, [0, 1], [fromPose.x, toPose.x]),
        y: interpolate(travelProgress, [0, 1], [fromPose.y, toPose.y]),
        angle: interpolate(travelProgress, [0, 1], [fromPose.angle, toPose.angle]),
      };
    }
  }

  return {
    mode: "hidden",
    stroke: null,
    progress: 1,
    visible: false,
  };
};

const Marker = ({
  path,
  progress,
  visible,
  maxTiltDegrees,
  marker,
  pathLength,
  positionOverride,
}: {
  path: string;
  progress: number;
  visible: boolean;
  maxTiltDegrees: number;
  marker: WhiteboardMarkerData & { asset: string };
  pathLength: number;
  positionOverride?: { x: number; y: number; angle: number } | null;
}) => {
  const pose = positionOverride ?? getPoseOnPath(path, pathLength, progress);
  const angle = clampMarkerAngle(pose.angle, maxTiltDegrees);

  return (
    <Img
      src={staticFile(marker.asset)}
      style={{
        position: "absolute",
        left: pose.x - marker.tipOffsetX,
        top: pose.y - marker.tipOffsetY,
        width: marker.width,
        height: marker.height,
        opacity: visible ? 1 : 0,
        transform: `rotate(${angle}rad)`,
        transformOrigin: `${marker.tipOffsetX}px ${marker.tipOffsetY}px`,
      }}
    />
  );
};

const renderStaticPath = (stroke: WhiteboardStrokeData, color: string, width: number) => {
  return (
    <path
      key={stroke.id}
      d={stroke.path}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={width}
    />
  );
};

const renderAnimatedPath = (
  stroke: WhiteboardStrokeData,
  progress: number,
  color: string,
  width: number,
) => {
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, stroke.path);

  return (
    <path
      key={stroke.id}
      d={stroke.path}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={width}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
    />
  );
};

export const WhiteboardScene = ({
  scene,
}: {
  scene: WhiteboardSceneData;
}) => {
  const frame = useCurrentFrame();
  const {
    fps,
    width: compositionWidth,
    height: compositionHeight,
  } = useVideoConfig();
  const strokes = scene.strokes;
  const strokeGeometries = useMemo((): StrokeGeometry[] => {
    return strokes.map((stroke) => {
      const length = getLength(stroke.path);

      return {
        ...stroke,
        strokeData: stroke,
        length,
        startPose: getPoseOnPath(stroke.path, length, 0),
        endPose: getPoseOnPath(stroke.path, length, 1),
      };
    });
  }, [strokes]);
  const maskId = `reveal-mask-${scene.id}`;
  const lastStroke = strokeGeometries[strokeGeometries.length - 1];
  const finalStrokeFrame = lastStroke
    ? lastStroke.startFrame + lastStroke.duration
    : 0;
  const finalArtworkOpacity =
    scene.renderMode === "bitmap-reveal"
      ? interpolate(frame, [finalStrokeFrame, finalStrokeFrame + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const finalSourceSvgOpacity = scene.finalSourceSvg
    ? interpolate(frame, [finalStrokeFrame, finalStrokeFrame + 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const titlePop = spring({
    fps,
    frame,
    config: {
      damping: 200,
      stiffness: 120,
      mass: 0.9,
    },
    durationInFrames: 20,
  });
  const markerState = getMarkerState(frame, strokeGeometries);
  const activeStroke = markerState.stroke ?? strokeGeometries[0];
  const completedStrokes = useMemo(() => {
    return strokeGeometries.filter((stroke) => {
      return frame > stroke.startFrame + stroke.duration;
    });
  }, [frame, strokeGeometries]);
  const calloutStartFrame = Math.max(
    finalStrokeFrame + 6,
    scene.durationInFrames - 42,
  );
  const calloutEndFrame = Math.min(scene.durationInFrames - 12, calloutStartFrame + 24);
  const subtitleText =
    scene.subtitleLimitedTilt === "Direct SVG stroke render"
      ? ""
      : scene.subtitleLimitedTilt;
  const artworkFrame = {
    left: 76,
    top: 150,
    width: compositionWidth - 152,
    height: compositionHeight - 230,
  };
  const artworkScale = Math.min(
    artworkFrame.width / scene.width,
    artworkFrame.height / scene.height,
  );
  const scaledArtworkWidth = scene.width * artworkScale;
  const scaledArtworkHeight = scene.height * artworkScale;
  const artworkLeft =
    artworkFrame.left + (artworkFrame.width - scaledArtworkWidth) / 2;
  const artworkTop =
    artworkFrame.top + (artworkFrame.height - scaledArtworkHeight) / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: scene.background,
        color: "#111111",
        fontFamily: "ui-rounded, 'Trebuchet MS', sans-serif",
      }}
    >
      {scene.audioSrc ? <Audio src={resolveAsset(scene.audioSrc)} /> : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.04), transparent 30%), linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 88,
          top: 54,
          fontSize: 46,
          fontWeight: 700,
          letterSpacing: -1,
          transform: `scale(${titlePop})`,
          transformOrigin: "left center",
        }}
      >
        {scene.title}
      </div>

      {subtitleText ? (
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 112,
            fontSize: 24,
            color: "#4b5563",
          }}
        >
          {subtitleText}
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: artworkLeft,
          top: artworkTop,
          width: scene.width,
          height: scene.height,
          transform: `scale(${artworkScale})`,
          transformOrigin: "top left",
        }}
      >
        <svg
          viewBox={`0 0 ${scene.width} ${scene.height}`}
          style={{
            position: "absolute",
            inset: 0,
            width: scene.width,
            height: scene.height,
            overflow: "visible",
          }}
        >
          {scene.renderMode === "bitmap-reveal" ? (
            <>
              <defs>
                <mask
                  id={maskId}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={scene.width}
                  height={scene.height}
                >
                  <rect
                    x="0"
                    y="0"
                    width={scene.width}
                    height={scene.height}
                    fill="black"
                  />
                  {completedStrokes.map((stroke) => {
                    return renderStaticPath(
                      stroke.strokeData,
                      "white",
                      stroke.revealWidth ?? stroke.strokeWidth,
                    );
                  })}
                  {markerState.mode === "draw"
                    ? renderAnimatedPath(
                        markerState.stroke.strokeData,
                        markerState.progress,
                        "white",
                        markerState.stroke.revealWidth ??
                          markerState.stroke.strokeWidth,
                      )
                    : null}
                </mask>
              </defs>
              {scene.cleanedImage ? (
                <>
                  <image
                    href={resolveAsset(scene.cleanedImage)}
                    x="0"
                    y="0"
                    width={scene.width}
                    height={scene.height}
                    preserveAspectRatio="none"
                    mask={`url(#${maskId})`}
                  />
                  <image
                    href={resolveAsset(scene.cleanedImage)}
                    x="0"
                    y="0"
                    width={scene.width}
                    height={scene.height}
                    preserveAspectRatio="none"
                    opacity={finalArtworkOpacity}
                  />
                </>
              ) : null}
            </>
          ) : (
            <>
              {completedStrokes.map((stroke) => {
                return renderStaticPath(
                  stroke.strokeData,
                  stroke.stroke,
                  stroke.strokeWidth,
                );
              })}
              {markerState.mode === "draw"
                ? renderAnimatedPath(
                    markerState.stroke.strokeData,
                    markerState.progress,
                    markerState.stroke.stroke,
                    markerState.stroke.strokeWidth,
                  )
                : null}
              {scene.finalSourceSvg ? (
                <image
                  href={resolveAsset(scene.finalSourceSvg)}
                  x="0"
                  y="0"
                  width={scene.width}
                  height={scene.height}
                  preserveAspectRatio="xMidYMid meet"
                  opacity={finalSourceSvgOpacity}
                />
              ) : null}
            </>
          )}
        </svg>

        <Marker
          path={activeStroke.strokeData.path}
          pathLength={activeStroke.length}
          progress={markerState.progress}
          visible={markerState.visible}
          maxTiltDegrees={scene.marker.maxTiltDegrees ?? 15}
          positionOverride={
            markerState.mode === "travel"
              ? {
                  x: markerState.x,
                  y: markerState.y,
                  angle: markerState.angle,
                }
              : null
          }
          marker={{
            ...scene.marker,
            asset: scene.handAsset,
          }}
        />
      </div>

      {scene.calloutText ? (
        <div
          style={{
            position: "absolute",
            left: 920,
            top: 520,
            width: 240,
            padding: "18px 20px",
            border: "3px solid #111111",
            borderRadius: 22,
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.2,
            boxShadow: "10px 10px 0 rgba(0,0,0,0.08)",
            opacity: interpolate(frame, [calloutStartFrame, calloutEndFrame], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {scene.calloutText}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
