import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import { getErrorMessage, getErrorStatus } from "@/lib/logging";
import { fetchPresetVoiceMetadata } from "../../../lib/audio-generation";
import { VoicePresetsResponse } from "../../../../types/schema";

export const runtime = "nodejs";

export const GET = withEvlog(async function GET(request: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "ELEVENLABS_API_KEY is not set. Add it to your environment before loading voice presets.",
      },
      { status: 500 },
    );
  }

  try {
    log.set({
      user: { id: session.user.id },
      operation: "voice-presets",
    });
    const voices = await fetchPresetVoiceMetadata(apiKey);
    const result = VoicePresetsResponse.parse({ voices });

    return NextResponse.json(result);
  } catch (error) {
    log.error(error instanceof Error ? error : String(error), {
      operation: "voice-presets",
    });

    return NextResponse.json(
      {
        message: getErrorMessage(error, "Unable to load preset voices."),
      },
      { status: getErrorStatus(error, 400) },
    );
  }
});
