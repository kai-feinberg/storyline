import { z } from "zod";

const svgCodeFencePattern = /^```(?:svg|xml)?\s*([\s\S]*?)```$/i;
const jsonCodeFencePattern = /^```(?:json)?\s*([\s\S]*?)```$/i;

const generatedSvgPayloadSchema = z.object({
  svg: z.string().trim().min(1),
});

const parsedScenesPayloadSchema = z.object({
  scenes: z.array(
    z.object({
      title: z.string().trim().min(1),
      scriptText: z.string().trim().min(1),
    }),
  ),
});

export const DEFAULT_OPENROUTER_MODEL = "google/gemini-3-flash-preview";

export const buildWhiteboardSvgPrompt = ({
  projectTitle,
  sceneTitle,
  scriptText,
  variationPrompt,
}: {
  projectTitle: string;
  sceneTitle: string;
  scriptText: string;
  variationPrompt?: string;
}): string => {
  return [
    "Create a simple SVG illustration for a whiteboard explainer video scene.",
    "Style requirements:",
    "- black or near-black hand-drawn lines",
    "- sparse, clean composition",
    "- maximum 3 to 4 main elements per scene",
    "- simple whiteboard aesthetic",
    "- use symbols over detailed drawings, such as $ for money, lightning bolts for energy, arrows for movement, red X for problems, and checkmarks for solutions",
    "- stick figures when people are shown",
    "- use simple shapes for buildings and objects",
    "- use arrows and lines to show relationships",
    "- use text labels only when they add clarity and keep them very short",
    "- transparent background",
    "- no shading, gradients, textures, or photorealism",
    "- keep shapes easy to trace as paths, circles, rectangles, lines, polylines, or polygons",
    "",
    "Whiteboard renderer compatibility:",
    "- do not use transform attributes anywhere: no translate, scale, rotate, skew, or matrix",
    "- do not position drawings with transformed <g> groups",
    "- every path, rect, circle, line, polyline, and polygon must use final absolute canvas coordinates directly",
    "- if you need to move a symbol, rewrite its coordinates instead of wrapping it in a translated group",
    "- <g> elements are allowed only for organization and inherited stroke/fill styles, never for transforms",
    "- keep all visible geometry inside the 0 0 1280 720 viewBox using absolute coordinates",
    "- avoid <text> elements when possible; use very short labels only if necessary",
    "",
    "Simple drawing shortcuts:",
    "- hospital: rectangle with a cross symbol and a short HOSPITAL label if needed",
    "- money: dollar sign or money bag with $",
    "- person: stick figure",
    "- medicine: pill shape or bottle outline",
    "- earth or ground: wavy line with simple grass marks",
    "- electrons: small circles with minus signs",
    "- buildings: simple rectangles with windows",
    "- technology: screen rectangle or simple device outline",
    "- growth: upward arrow or growing bar chart",
    "- problems: lightning bolt, broken object, or red X",
    "- solutions: checkmark, lightbulb, or green arrow",
    "",
    `Project title: ${projectTitle}`,
    `Scene title: ${sceneTitle}`,
    `Scene script: ${scriptText}`,
    ...(variationPrompt ? [`Variation direction: ${variationPrompt}`] : []),
    "",
    "Return JSON with exactly one key named svg whose value is valid SVG markup.",
    "The SVG must start with <svg and end with </svg>.",
    "Use a viewBox and dimensions around a 16:9 canvas such as 1280 by 720.",
    "Here is an example of valid SVG output structure and style:",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">`,
    `  <rect width="100%" height="100%" fill="white"/>`,
    "",
    `  <g stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">`,
    "",
    `    <g id="stick-figure">`,
    `      <circle id="person-head" cx="200" cy="250" r="30"/>`,
    `      <path id="person-body" d="M 200 280 L 200 420"/>`,
    `      <path id="person-left-arm" d="M 200 320 L 140 380"/>`,
    `      <path id="person-right-arm" d="M 200 320 L 260 380"/>`,
    `      <path id="person-left-leg" d="M 200 420 L 140 540"/>`,
    `      <path id="person-right-leg" d="M 200 420 L 260 540"/>`,
    `    </g>`,
    "",
    `    <g id="hospital">`,
    `      <path id="ground" d="M 350 540 L 750 540"/>`,
    "",
    `      <rect id="building-base" x="400" y="300" width="300" height="240"/>`,
    `      <path id="base-roof" d="M 380 300 L 720 300"/>`,
    "",
    `      <rect id="building-tower" x="475" y="160" width="150" height="140"/>`,
    `      <path id="tower-roof" d="M 450 160 L 650 160"/>`,
    "",
    `      <g id="medical-cross" stroke-width="16">`,
    `        <path id="cross-vertical" d="M 550 190 L 550 270"/>`,
    `        <path id="cross-horizontal" d="M 510 230 L 590 230"/>`,
    `      </g>`,
    "",
    `      <rect id="door-frame" x="510" y="440" width="80" height="100"/>`,
    `      <circle id="doorknob" cx="570" cy="495" r="3" fill="black" stroke="none"/>`,
    "",
    `      <g id="window-left">`,
    `        <rect id="window-left-frame" x="430" y="340" width="50" height="50"/>`,
    `        <path id="window-left-mullion-v" d="M 455 340 L 455 390"/>`,
    `        <path id="window-left-mullion-h" d="M 430 365 L 480 365"/>`,
    `      </g>`,
    "",
    `      <g id="window-right">`,
    `        <rect id="window-right-frame" x="620" y="340" width="50" height="50"/>`,
    `        <path id="window-right-mullion-v" d="M 645 340 L 645 390"/>`,
    `        <path id="window-right-mullion-h" d="M 620 365 L 670 365"/>`,
    `      </g>`,
    "",
    `      <g id="flag">`,
    `        <path id="flag-pole" d="M 430 300 L 430 220"/>`,
    `        <path id="flag-fabric" d="M 430 220 L 460 235 L 430 250"/>`,
    `      </g>`,
    `    </g>`,
    "",
    `  </g>`,
    `</svg>`,
  ].join("\n");
};

export const buildSceneParsingPrompt = ({
  projectTitle,
  script,
}: {
  projectTitle: string;
  script: string;
}): string => {
  return [
    "Break this script into scene-sized chunks for a whiteboard explainer video.",
    "Goals:",
    "- produce a natural sequence of visual beats",
    "- each scene MUST contain at least 2 sentences unless the source script has no reasonable way to combine it",
    "- each scene should usually be 2 to 3 sentences",
    "- each scene should be long enough to take at least 6 seconds when spoken aloud at a natural narration pace",
    "- do not create tiny scenes from short fragments; combine adjacent fragments into a complete visual beat",
    "- use 1 sentence only when it is long enough for at least 6 seconds of narration or the entire remaining script is only 1 sentence",
    "- keep the original wording as much as possible",
    "- do not skip important content",
    "- do not add narration that was not in the source script",
    "- create concise visual titles that describe the scene",
    "- return between 1 and 24 scenes",
    "",
    "Look for scene breaks around:",
    "- time transitions, such as Then, After, Before, or In [year]",
    "- new concepts, such as The problem, The solution, or Here's how",
    "- statistics, such as Studies show, % improvement, or Research proves",
    "- comparisons, such as Unlike, Instead of, or Compared to",
    "- benefits, such as This means, Results in, or Leads to",
    "- story beats, such as character introductions, conflict, or resolution",
    "",
    "Example of properly segmented script:",
    JSON.stringify(
      {
        scenes: [
          {
            title: "Curb Appeal Vs. Reality",
            scriptText:
              "Your lawn looks decent from the street. But up close? Patchy. Thin in spots. That dull green that screams \"amateur hour.\"",
          },
          {
            title: "The Cheap Fertilizer Trap",
            scriptText:
              "You've been feeding it the big-box store stuff for years. And here's what nobody tells you about those cheap fertilizers... They're basically fast food for your grass.",
          },
          {
            title: "The Short-Lived Green-Up",
            scriptText:
              "Quick green-up that fades in two weeks. Then you're back at square one.",
          },
          {
            title: "The Neighbor Comparison",
            scriptText:
              "I discovered this after my neighbor's lawn started looking like a golf course while mine looked like... well, a regular lawn. Turns out he switched to Kai's Fertilizer.",
          },
          {
            title: "The Root Zone Difference",
            scriptText:
              "The difference? Kai's uses something called \"Root Zone Activation.\" Instead of just painting your grass green from the top, it feeds the root system 6-8 inches deep.",
          },
          {
            title: "Visible Results",
            scriptText:
              "My lawn went from patchy to thick in just 23 days. Neighbors actually stopped to ask what I did.",
          },
          {
            title: "Less Waste, More Coverage",
            scriptText:
              "And I'm using 40% less product because it doesn't wash away after the first rain.",
          },
          {
            title: "Offer And CTA",
            scriptText:
              "Go to KaisFertilizer.com to grab the \"Lawn Transformation Kit\" for just $47 today. You'll get enough concentrated formula for 5,000 square feet plus the application guide that's helping weekend warriors get professional-level results... even if you've always struggled with lawn care.",
          },
        ],
      },
      null,
      2,
    ),
    "",
    `Project title: ${projectTitle}`,
    "Script:",
    script,
    "",
    "Return JSON with exactly one key named scenes.",
    'Each scene must be an object with exactly two string fields: "title" and "scriptText".',
  ].join("\n");
};

export const svgTextToDataUrl = (svgText: string): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
};

const stripFence = (value: string, pattern: RegExp): string => {
  const match = value.trim().match(pattern);
  return match ? match[1].trim() : value.trim();
};

const extractJsonObject = (value: string): string => {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return value;
  }

  return value.slice(start, end + 1);
};

const parseContentAsJson = (content: string): z.infer<typeof generatedSvgPayloadSchema> => {
  const normalized = stripFence(content, jsonCodeFencePattern);

  try {
    return generatedSvgPayloadSchema.parse(JSON.parse(normalized));
  } catch {
    return generatedSvgPayloadSchema.parse(JSON.parse(extractJsonObject(normalized)));
  }
};

export const extractScenesFromModelContent = (
  content: string,
): z.infer<typeof parsedScenesPayloadSchema>["scenes"] => {
  const normalized = stripFence(content, jsonCodeFencePattern);

  try {
    return parsedScenesPayloadSchema.parse(JSON.parse(normalized)).scenes;
  } catch {
    return parsedScenesPayloadSchema.parse(JSON.parse(extractJsonObject(normalized)))
      .scenes;
  }
};

export const extractSvgFromModelContent = (content: string): string => {
  const parsed = parseContentAsJson(content);
  return parsed.svg;
};

export const normalizeGeneratedSvg = (value: string): string => {
  const withoutFence = stripFence(value, svgCodeFencePattern);
  const withoutXmlHeader = withoutFence
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .trim();
  const lower = withoutXmlHeader.toLowerCase();
  const start = lower.indexOf("<svg");
  const end = lower.lastIndexOf("</svg>");

  if (start === -1 || end === -1) {
    throw new Error("The model did not return valid SVG markup.");
  }

  let svg = withoutXmlHeader.slice(start, end + 6).trim();

  const blockedPatterns = [
    /<script[\s>]/i,
    /<foreignObject[\s>]/i,
    /<iframe[\s>]/i,
    /<object[\s>]/i,
    /<embed[\s>]/i,
    /<audio[\s>]/i,
    /<video[\s>]/i,
    /<canvas[\s>]/i,
    /<style[\s>]/i,
    /<link[\s>]/i,
    /<image[\s>]/i,
    /<use[\s>]/i,
    /<animate[\s>]/i,
    /<set[\s>]/i,
    /\son[a-z]+\s*=/i,
    /javascript:/i,
  ];

  for (const pattern of blockedPatterns) {
    if (pattern.test(svg)) {
      throw new Error("The generated SVG included unsupported markup.");
    }
  }

  if (!/\sxmlns=/.test(svg)) {
    svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  if (!/\sviewBox=/.test(svg) && !(/\swidth=/.test(svg) && /\sheight=/.test(svg))) {
    svg = svg.replace("<svg", '<svg viewBox="0 0 1280 720" width="1280" height="720"');
  }

  if (!/<(?:path|rect|circle|line|polyline|polygon|ellipse)\b/i.test(svg)) {
    throw new Error("The generated SVG did not include any drawable shapes.");
  }

  return svg;
};
