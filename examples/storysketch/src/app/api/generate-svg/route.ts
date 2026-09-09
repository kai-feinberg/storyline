import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import { getErrorMessage, getErrorStatus } from "@/lib/logging";
import { fetchOpenRouterChatCompletion } from "@/lib/openrouter";
import {
  buildWhiteboardSvgPrompt,
  DEFAULT_OPENROUTER_MODEL,
  extractSvgFromModelContent,
  normalizeGeneratedSvg,
  svgTextToDataUrl,
} from "../../../lib/svg-generation";
import { GenerateSvgRequest, GenerateSvgResponse } from "../../../../types/schema";

export const runtime = "nodejs";

type OpenRouterResponse = {
  error?: {
    message?: string;
  };
  choices?: Array<{
    finish_reason?: string | null;
    message?: {
      content?:
        | string
        | Array<{
            type?: string;
            text?: string;
          }>;
    };
  }>;
};

type OpenRouterContent =
  | string
  | Array<{
      type?: string;
      text?: string;
    }>
  | undefined;

const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3001";
};

const readContentText = (content: OpenRouterContent): string => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        return typeof part.text === "string" ? part.text : "";
      })
      .join("")
      .trim();
  }

  return "";
};

export const POST = withEvlog(async function POST(request: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "OPENROUTER_API_KEY is not set. Add it to your environment before generating SVGs.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = GenerateSvgRequest.parse(await request.json());
    log.set({
      user: { id: session.user.id },
      generation: {
        type: "svg",
        sceneTitle: payload.sceneTitle,
        projectTitle: payload.projectTitle,
      },
    });
    const model = process.env.OPENROUTER_MODEL ?? DEFAULT_OPENROUTER_MODEL;
    const response = await fetchOpenRouterChatCompletion({
      apiKey,
      siteUrl: getSiteUrl(),
      title: "StorySketch",
      body: {
        model,
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 1400,
        messages: [
          {
            role: "system",
            content:
              "You create clean, minimal SVG art for whiteboard videos and follow output format instructions exactly.",
          },
          {
            role: "user",
            content: buildWhiteboardSvgPrompt(payload),
          },
        ],
      },
    });

    const body = (await response.json()) as OpenRouterResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            body.error?.message ??
            "OpenRouter could not generate an SVG for this scene.",
        },
        { status: response.status },
      );
    }

    const content = readContentText(body.choices?.[0]?.message?.content);

    if (!content) {
      return NextResponse.json(
        {
          message: "OpenRouter returned an empty response.",
        },
        { status: 502 },
      );
    }

    const svg = normalizeGeneratedSvg(extractSvgFromModelContent(content));
    const result = GenerateSvgResponse.parse({
      svg,
      dataUrl: svgTextToDataUrl(svg),
      model,
    });

    return NextResponse.json(result);
  } catch (error) {
    log.error(error instanceof Error ? error : String(error), {
      operation: "generate-svg",
    });

    return NextResponse.json(
      {
        message: getErrorMessage(error, "Unable to generate an SVG for this scene."),
      },
      { status: getErrorStatus(error, 400) },
    );
  }
});
