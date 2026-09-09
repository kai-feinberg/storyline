import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import { getErrorMessage, getErrorStatus } from "@/lib/logging";
import {
  DEFAULT_ELEVENLABS_MODEL,
  DEFAULT_ELEVENLABS_VOICE_ID,
  ELEVENLABS_PRESET_VOICES,
  fetchVoiceMetadata,
  getDurationSecondsFromAlignment,
  normalizeAlignment,
  normalizePathSegment,
} from "../../../lib/audio-generation";
import { GenerateAudioRequest, GenerateAudioResponse } from "../../../../types/schema";

export const runtime = "nodejs";

type ElevenLabsAudioResponse = {
  audio_base64?: string;
  alignment?: unknown;
  normalized_alignment?: unknown;
};

export const POST = withEvlog(async function POST(request: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "ELEVENLABS_API_KEY is not set. Add it to your environment before generating audio.",
      },
      { status: 500 },
    );
  }

  if (!blobToken) {
    return NextResponse.json(
      {
        message:
          "BLOB_READ_WRITE_TOKEN is required to store generated audio clips.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = GenerateAudioRequest.parse(await request.json());
    log.set({
      user: { id: session.user.id },
      generation: {
        type: "audio",
        sceneTitle: payload.sceneTitle,
        projectTitle: payload.projectTitle,
      },
    });
    const voiceId =
      payload.voiceId ??
      process.env.ELEVENLABS_VOICE_ID ??
      DEFAULT_ELEVENLABS_VOICE_ID;
    const fallbackName =
      ELEVENLABS_PRESET_VOICES.find((voice) => voice.voiceId === voiceId)
        ?.fallbackName ?? process.env.ELEVENLABS_VOICE_NAME;
    const voice = await fetchVoiceMetadata({
      apiKey,
      voiceId,
      fallbackName,
    });
    const model = process.env.ELEVENLABS_MODEL_ID ?? DEFAULT_ELEVENLABS_MODEL;
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice.voiceId}/with-timestamps?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: payload.scriptText,
          model_id: model,
        }),
      },
    );
    const body = (await response.json()) as ElevenLabsAudioResponse & {
      detail?: unknown;
    };

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "ElevenLabs could not generate audio for this scene.",
          detail: body.detail,
        },
        { status: response.status },
      );
    }

    if (!body.audio_base64) {
      return NextResponse.json(
        {
          message: "ElevenLabs returned no audio data.",
        },
        { status: 502 },
      );
    }

    const alignment = normalizeAlignment(body.normalized_alignment ?? body.alignment);
    const durationSeconds = getDurationSecondsFromAlignment(alignment);
    const audioBuffer = Buffer.from(body.audio_base64, "base64");
    const projectSlug = normalizePathSegment(payload.projectTitle) || "project";
    const sceneSlug = normalizePathSegment(payload.sceneTitle) || "scene";
    const pathname = `generated-audio/${projectSlug}/${sceneSlug}-${Date.now()}.mp3`;
    const blob = await put(pathname, audioBuffer, {
      access: "public",
      contentType: "audio/mpeg",
      token: blobToken,
      addRandomSuffix: false,
    });
    const result = GenerateAudioResponse.parse({
      audioUrl: blob.url,
      contentType: "audio/mpeg",
      durationSeconds,
      voiceId: voice.voiceId,
      voiceName: voice.name,
      model,
      alignment,
    });

    return NextResponse.json(result);
  } catch (error) {
    log.error(error instanceof Error ? error : String(error), {
      operation: "generate-audio",
    });

    return NextResponse.json(
      {
        message: getErrorMessage(error, "Unable to generate scene audio."),
      },
      { status: getErrorStatus(error, 400) },
    );
  }
});
