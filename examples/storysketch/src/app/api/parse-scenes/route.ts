import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import { getErrorMessage, getErrorStatus } from "@/lib/logging";
import { fetchOpenRouterChatCompletion } from "@/lib/openrouter";
import {
  buildSceneParsingPrompt,
  DEFAULT_OPENROUTER_MODEL,
  extractScenesFromModelContent,
} from "@/lib/svg-generation";
import { ParseScenesRequest, ParseScenesResponse } from "@/types/schema";

export const runtime = "nodejs";

type OpenRouterResponse = {
  error?: {
    message?: string;
  };
  choices?: Array<{
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

const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3001";
};

const readContentText = (
  content:
    | string
    | Array<{
        type?: string;
        text?: string;
      }>
    | undefined,
): string => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part.text === "string" ? part.text : ""))
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
          "OPENROUTER_API_KEY is not set. Add it to your environment before parsing scenes.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = ParseScenesRequest.parse(await request.json());
    const model = process.env.OPENROUTER_SCENE_MODEL ?? process.env.OPENROUTER_MODEL ?? DEFAULT_OPENROUTER_MODEL;

    log.set({
      user: { id: session.user.id },
      generation: {
        type: "scene-plan",
        projectTitle: payload.projectTitle,
      },
    });

    const response = await fetchOpenRouterChatCompletion({
      apiKey,
      siteUrl: getSiteUrl(),
      title: "StorySketch",
      body: {
        model,
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 2200,
        messages: [
          {
            role: "system",
            content:
              "You are a precise storyboard planner for whiteboard explainer videos. Follow the output schema exactly.",
          },
          {
            role: "user",
            content: buildSceneParsingPrompt(payload),
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
            "OpenRouter could not parse scenes for this project.",
        },
        { status: response.status },
      );
    }

    const content = readContentText(body.choices?.[0]?.message?.content);

    if (!content) {
      return NextResponse.json(
        { message: "OpenRouter returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      ParseScenesResponse.parse({
        scenes: extractScenesFromModelContent(content),
        model,
      }),
    );
  } catch (error) {
    log.error(error instanceof Error ? error : String(error), {
      operation: "parse-scenes",
    });

    return NextResponse.json(
      {
        message: getErrorMessage(error, "Unable to parse scenes."),
      },
      { status: getErrorStatus(error, 400) },
    );
  }
});
