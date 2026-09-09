import {
  getLength,
  getPointAtLength,
  reversePath,
} from "@remotion/paths";
import { svgTextToDataUrl } from "./svg-generation";
import type {
  WhiteboardSceneData,
  WhiteboardStrokeData,
  WhiteboardTimingData,
} from "../../types/whiteboard";

type Point = {
  x: number;
  y: number;
};

type ParsedStroke = {
  id: string;
  path: string;
  strokeWidth: number;
  revealWidth: number;
  stroke: string;
  length: number;
  startPoint: Point;
  endPoint: Point;
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  closed: boolean;
  docIndex: number;
};

const distance = (left: Point, right: Point): number => {
  return Math.hypot(left.x - right.x, left.y - right.y);
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const DEFAULT_FINAL_HOLD_SECONDS = 1.5;
const DEFAULT_TIMING_FPS = 30;
const DEFAULT_END_HOLD_FRAMES = Math.round(
  DEFAULT_FINAL_HOLD_SECONDS * DEFAULT_TIMING_FPS,
);

const DIRECT_SVG_TIMING: WhiteboardTimingData = {
  startFrame: 8,
  gapFrames: 0,
  minTravelFrames: 2,
  maxTravelFrames: 6,
  travelPixelsPerFrame: 90,
  connectedThresholdPx: 18,
  framesPerHundredPx: 5,
  minDuration: 4,
  maxDuration: 20,
  endHoldFrames: DEFAULT_END_HOLD_FRAMES,
};

const parseSvgNumber = (value: string | null | undefined): number | null => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : null;
};

const parseColor = (color: string | null | undefined) => {
  if (!color) {
    return null;
  }

  const normalized = String(color).trim().toLowerCase();

  if (normalized === "none" || normalized === "transparent") {
    return null;
  }

  if (normalized === "black") {
    return { r: 0, g: 0, b: 0 };
  }

  if (normalized === "white") {
    return { r: 255, g: 255, b: 255 };
  }

  const rgbMatch = normalized.match(
    /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/,
  );

  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  const hex = normalized.replace("#", "");

  if (hex.length === 3) {
    return {
      r: Number.parseInt(`${hex[0]}${hex[0]}`, 16),
      g: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
      b: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
    };
  }

  if (hex.length === 6) {
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }

  return null;
};

const isLightColor = (color: string | null | undefined): boolean => {
  const parsed = parseColor(color);

  if (!parsed) {
    return false;
  }

  const luminance = 0.2126 * parsed.r + 0.7152 * parsed.g + 0.0722 * parsed.b;
  return luminance >= 245;
};

const shouldKeepPath = (stroke: string | null, fill: string | null): boolean => {
  const hasVisibleStroke = stroke && stroke !== "none" && !isLightColor(stroke);
  const hasVisibleFill = fill && fill !== "none" && !isLightColor(fill);

  return Boolean(hasVisibleStroke || hasVisibleFill || (!stroke && !fill));
};

const resolveStrokeColor = (stroke: string | null, fill: string | null): string => {
  if (stroke && stroke !== "none" && !isLightColor(stroke)) {
    return stroke;
  }

  if (fill && fill !== "none" && !isLightColor(fill)) {
    return fill;
  }

  return "#141414";
};

const rectToPath = (element: Element): string | null => {
  const x = parseSvgNumber(element.getAttribute("x")) ?? 0;
  const y = parseSvgNumber(element.getAttribute("y")) ?? 0;
  const width = parseSvgNumber(element.getAttribute("width"));
  const height = parseSvgNumber(element.getAttribute("height"));

  if (!width || !height) {
    return null;
  }

  return `M ${x} ${y} H ${x + width} V ${y + height} H ${x} Z`;
};

const circleToPath = (element: Element): string | null => {
  const cx = parseSvgNumber(element.getAttribute("cx"));
  const cy = parseSvgNumber(element.getAttribute("cy"));
  const r = parseSvgNumber(element.getAttribute("r"));

  if (cx === null || cy === null || !r) {
    return null;
  }

  return [
    `M ${cx + r} ${cy}`,
    `A ${r} ${r} 0 1 0 ${cx - r} ${cy}`,
    `A ${r} ${r} 0 1 0 ${cx + r} ${cy}`,
    "Z",
  ].join(" ");
};

const lineToPath = (element: Element): string | null => {
  const x1 = parseSvgNumber(element.getAttribute("x1"));
  const y1 = parseSvgNumber(element.getAttribute("y1"));
  const x2 = parseSvgNumber(element.getAttribute("x2"));
  const y2 = parseSvgNumber(element.getAttribute("y2"));

  if ([x1, y1, x2, y2].some((value) => value === null)) {
    return null;
  }

  return `M ${x1} ${y1} L ${x2} ${y2}`;
};

const pointsToSvgPath = (
  pointsValue: string | null,
  closed: boolean,
): string | null => {
  if (!pointsValue) {
    return null;
  }

  const numbers = String(pointsValue)
    .trim()
    .split(/[\s,]+/)
    .map((value) => Number.parseFloat(value))
    .filter((value) => Number.isFinite(value));

  if (numbers.length < 4 || numbers.length % 2 !== 0) {
    return null;
  }

  const pairs: Array<[number, number]> = [];

  for (let index = 0; index < numbers.length; index += 2) {
    pairs.push([numbers[index], numbers[index + 1]]);
  }

  const [first, ...rest] = pairs;

  return [
    `M ${first[0]} ${first[1]}`,
    ...rest.map(([x, y]) => `L ${x} ${y}`),
    closed ? "Z" : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const shapeElementToPath = (element: Element): string | null => {
  switch (element.tagName.toLowerCase()) {
    case "path":
      return element.getAttribute("d");
    case "rect":
      return rectToPath(element);
    case "circle":
      return circleToPath(element);
    case "line":
      return lineToPath(element);
    case "polyline":
      return pointsToSvgPath(element.getAttribute("points"), false);
    case "polygon":
      return pointsToSvgPath(element.getAttribute("points"), true);
    default:
      return null;
  }
};

const getInheritedAttr = (element: Element, attribute: string): string | null => {
  let current: Element | null = element;

  while (current) {
    const value = current.getAttribute(attribute);

    if (value !== null) {
      return value;
    }

    current = current.parentElement;
  }

  return null;
};

const sampleBounds = (
  pathValue: string,
  length: number,
): ParsedStroke["bounds"] => {
  const steps = clamp(Math.ceil(length / 20), 8, 160);
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (let index = 0; index <= steps; index += 1) {
    const point = getPointAtLength(pathValue, (length * index) / steps);
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  return { minX, minY, maxX, maxY };
};

const analyzePath = ({
  id,
  pathValue,
  strokeWidth,
  stroke,
  index,
  timing,
}: {
  id: string | null;
  pathValue: string;
  strokeWidth: number;
  stroke: string;
  index: number;
  timing: WhiteboardTimingData;
}): ParsedStroke => {
  const length = getLength(pathValue);
  const start = getPointAtLength(pathValue, 0);
  const end = getPointAtLength(pathValue, length);
  const bounds = sampleBounds(pathValue, length);
  const closed = distance(start, end) <= (timing.connectedThresholdPx ?? 24);

  return {
    id: id ?? `path-${index + 1}`,
    path: pathValue,
    strokeWidth,
    revealWidth: strokeWidth,
    stroke,
    length,
    startPoint: { x: start.x, y: start.y },
    endPoint: { x: end.x, y: end.y },
    bounds,
    closed,
    docIndex: index,
  };
};

const orientStroke = (stroke: ParsedStroke, reverse: boolean): ParsedStroke => {
  if (!reverse || stroke.closed) {
    return stroke;
  }

  return {
    ...stroke,
    path: reversePath(stroke.path),
    startPoint: stroke.endPoint,
    endPoint: stroke.startPoint,
  };
};

const getInitialOrientation = (stroke: ParsedStroke): ParsedStroke => {
  if (stroke.closed) {
    return stroke;
  }

  const anchor = { x: stroke.bounds.minX, y: stroke.bounds.minY };
  const reverse =
    distance(stroke.endPoint, anchor) < distance(stroke.startPoint, anchor);
  return orientStroke(stroke, reverse);
};

const orderDomSequence = (strokes: ParsedStroke[]): ParsedStroke[] => {
  const ordered: ParsedStroke[] = [];
  let currentPoint: Point | null = null;

  strokes.forEach((stroke, index) => {
    if (stroke.closed) {
      ordered.push(stroke);
      currentPoint = stroke.endPoint;
      return;
    }

    if (!currentPoint && index === 0) {
      const initial = getInitialOrientation(stroke);
      ordered.push(initial);
      currentPoint = initial.endPoint;
      return;
    }

    const forwardDistance = currentPoint
      ? distance(currentPoint, stroke.startPoint)
      : distance(stroke.startPoint, {
          x: stroke.bounds.minX,
          y: stroke.bounds.minY,
        });
    const reverseDistance = currentPoint
      ? distance(currentPoint, stroke.endPoint)
      : distance(stroke.endPoint, {
          x: stroke.bounds.minX,
          y: stroke.bounds.minY,
        });
    ordered.push(orientStroke(stroke, reverseDistance < forwardDistance));
    currentPoint = ordered[ordered.length - 1].endPoint;
  });

  return ordered;
};

const getTravelFrames = (
  stroke: ParsedStroke,
  nextStroke: ParsedStroke,
  timing: WhiteboardTimingData,
): number => {
  const distanceBetween = distance(stroke.endPoint, nextStroke.startPoint);
  const connectedThresholdPx = timing.connectedThresholdPx ?? 24;

  if (distanceBetween <= connectedThresholdPx) {
    return 0;
  }

  const minTravelFrames = timing.minTravelFrames ?? timing.gapFrames;
  const maxTravelFrames = timing.maxTravelFrames ?? minTravelFrames;
  const travelPixelsPerFrame = timing.travelPixelsPerFrame ?? 45;
  const travelFrames = Math.round(distanceBetween / travelPixelsPerFrame);

  return Math.max(
    timing.gapFrames,
    Math.max(minTravelFrames, Math.min(maxTravelFrames, travelFrames)),
  );
};

const buildSceneStrokes = (
  orderedPaths: ParsedStroke[],
  timing: WhiteboardTimingData,
): {
  strokes: WhiteboardStrokeData[];
  durationInFrames: number;
} => {
  let startFrame = timing.startFrame;

  const strokes = orderedPaths.map((stroke, index) => {
    const duration = Math.max(
      timing.minDuration,
      Math.min(
        timing.maxDuration,
        Math.round((stroke.length / 100) * timing.framesPerHundredPx),
      ),
    );

    const built = {
      id: stroke.id,
      path: stroke.path,
      strokeWidth: Number(stroke.strokeWidth.toFixed(2)),
      revealWidth: Number(stroke.revealWidth.toFixed(2)),
      stroke: stroke.stroke,
      length: Number(stroke.length.toFixed(2)),
      startFrame,
      duration,
    };

    const nextStroke = orderedPaths[index + 1];
    const gapFrames = nextStroke ? getTravelFrames(stroke, nextStroke, timing) : 0;

    startFrame += duration + gapFrames;
    return built;
  });

  return {
    strokes,
    durationInFrames: startFrame + timing.endHoldFrames,
  };
};

const getSvgFrame = (root: SVGSVGElement) => {
  const viewBox = root.getAttribute("viewBox");

  if (viewBox) {
    const parts = viewBox
      .trim()
      .split(/[\s,]+/)
      .map((value) => Number.parseFloat(value));

    if (parts.length === 4 && parts.every((value) => Number.isFinite(value))) {
      return {
        minX: parts[0],
        minY: parts[1],
        width: parts[2],
        height: parts[3],
      };
    }
  }

  const width = parseSvgNumber(root.getAttribute("width")) ?? 1280;
  const height = parseSvgNumber(root.getAttribute("height")) ?? 720;

  return { minX: 0, minY: 0, width, height };
};

export const buildSceneFromSvg = ({
  svgText,
  sceneId,
  sceneTitle,
  scriptText,
}: {
  svgText: string;
  sceneId: string;
  sceneTitle: string;
  scriptText: string;
}): WhiteboardSceneData => {
  const parser = new DOMParser();
  const documentSvg = parser.parseFromString(svgText, "image/svg+xml");
  const root = documentSvg.documentElement;

  if (!(root instanceof SVGSVGElement)) {
    throw new Error("Uploaded file is not a valid SVG.");
  }

  const frame = getSvgFrame(root);
  const shapeElements = Array.from(
    root.querySelectorAll("path, rect, circle, line, polyline, polygon"),
  );

  const strokes = shapeElements
    .map((element, index) => {
      const stroke = getInheritedAttr(element, "stroke");
      const fill = getInheritedAttr(element, "fill");

      if (!shouldKeepPath(stroke, fill)) {
        return null;
      }

      const rawPath = shapeElementToPath(element);

      if (!rawPath) {
        return null;
      }
      const baseStrokeWidth =
        parseSvgNumber(getInheritedAttr(element, "stroke-width")) ?? 10;

      return analyzePath({
        id: element.getAttribute("id"),
        pathValue: rawPath,
        strokeWidth: baseStrokeWidth,
        stroke: resolveStrokeColor(stroke, fill),
        index,
        timing: DIRECT_SVG_TIMING,
      });
    })
    .filter((stroke): stroke is ParsedStroke => stroke !== null);

  if (strokes.length === 0) {
    throw new Error("No drawable SVG paths were found.");
  }

  const orderedPaths = orderDomSequence(strokes);
  const built = buildSceneStrokes(orderedPaths, DIRECT_SVG_TIMING);
  const originalSvgDataUrl = svgTextToDataUrl(svgText);

  return {
    id: sceneId,
    title: sceneTitle,
    scriptText,
    width: frame.width,
    height: frame.height,
    fps: 30,
    background: "#ffffff",
    subtitleLimitedTilt: "",
    handAsset: "marker-hand.webp",
    marker: {
      width: 180,
      height: 180,
      tipOffsetX: 136,
      tipOffsetY: 24,
      maxTiltDegrees: 15,
    },
    timing: DIRECT_SVG_TIMING,
    svg: originalSvgDataUrl,
    finalSourceSvg: originalSvgDataUrl,
    renderMode: "stroke",
    durationInFrames: built.durationInFrames,
    strokes: built.strokes,
    calloutText: undefined,
  };
};

export const fitSceneDurationToFrames = ({
  scene,
  targetDurationInFrames,
  endHoldFrames = DEFAULT_END_HOLD_FRAMES,
}: {
  scene: WhiteboardSceneData;
  targetDurationInFrames: number;
  endHoldFrames?: number;
}): WhiteboardSceneData => {
  const strokes = scene.strokes;

  if (strokes.length === 0) {
    return {
      ...scene,
      durationInFrames: targetDurationInFrames,
    };
  }

  const safeHoldFrames = Math.max(0, endHoldFrames);
  const baseStartFrame = strokes[0].startFrame;
  const minimumAnimatedFrames = strokes.length;
  const minimumDurationInFrames =
    baseStartFrame + minimumAnimatedFrames + safeHoldFrames;
  const safeTargetDuration = Math.max(
    minimumDurationInFrames,
    Math.round(targetDurationInFrames),
  );
  const currentGaps = strokes.map((stroke, index) => {
    const nextStroke = strokes[index + 1];

    if (!nextStroke) {
      return 0;
    }

    return Math.max(
      0,
      nextStroke.startFrame - (stroke.startFrame + stroke.duration),
    );
  });
  const currentAnimatedFrames =
    strokes.reduce((total, stroke) => total + stroke.duration, 0) +
    currentGaps.reduce((total, gap) => total + gap, 0);
  const targetAnimatedFrames = Math.max(
    minimumAnimatedFrames,
    safeTargetDuration - safeHoldFrames - baseStartFrame,
  );
  const scale = targetAnimatedFrames / Math.max(1, currentAnimatedFrames);
  const scaledDurations = strokes.map((stroke) => {
    return Math.max(1, Math.round(stroke.duration * scale));
  });
  const scaledGaps = currentGaps.map((gap) => {
    return Math.max(0, Math.round(gap * scale));
  });
  const scaledAnimatedFrames =
    scaledDurations.reduce((total, duration) => total + duration, 0) +
    scaledGaps.reduce((total, gap) => total + gap, 0);
  const delta = targetAnimatedFrames - scaledAnimatedFrames;
  const lastDurationIndex = scaledDurations.length - 1;

  scaledDurations[lastDurationIndex] = Math.max(
    1,
    scaledDurations[lastDurationIndex] + delta,
  );

  let frameCursor = baseStartFrame;
  const retimedStrokes: WhiteboardStrokeData[] = strokes.map((stroke, index) => {
    const nextStroke = {
      ...stroke,
      startFrame: frameCursor,
      duration: scaledDurations[index],
    };

    frameCursor += scaledDurations[index] + (scaledGaps[index] ?? 0);
    return nextStroke;
  });

  return {
    ...scene,
    timing: {
      ...scene.timing,
      endHoldFrames: safeHoldFrames,
    },
    durationInFrames: safeTargetDuration,
    strokes: retimedStrokes,
  };
};
