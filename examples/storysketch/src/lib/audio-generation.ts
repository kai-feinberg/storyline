import { z } from "zod";

export const DEFAULT_ELEVENLABS_MODEL = "eleven_multilingual_v2";
export const DEFAULT_ELEVENLABS_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

export const ELEVENLABS_PRESET_VOICES = [
  { voiceId: "EXAVITQu4vr4xnSDxMaL", fallbackName: "Preset 1" },
  { voiceId: "CwhRBWXzGAHq8TQ4Fs17", fallbackName: "Preset 2" },
  { voiceId: "hpp4J3VqNfWAUOO0d1Us", fallbackName: "Preset 3" },
] as const;

type ElevenLabsVoiceResponse = {
  voice_id?: string;
  name?: string;
  preview_url?: string;
  description?: string;
  labels?: {
    gender?: string;
    accent?: string;
    age?: string;
  };
};

const msAlignmentSchema = z.object({
  chars: z.array(z.string()).optional(),
  characters: z.array(z.string()).optional(),
  charStartTimesMs: z.array(z.number()).optional(),
  char_start_times_ms: z.array(z.number()).optional(),
  charDurationsMs: z.array(z.number()).optional(),
  char_durations_ms: z.array(z.number()).optional(),
});

const secondAlignmentSchema = z.object({
  chars: z.array(z.string()).optional(),
  characters: z.array(z.string()).optional(),
  character_start_times_seconds: z.array(z.number()).optional(),
  character_end_times_seconds: z.array(z.number()).optional(),
});

const voiceMetadataCache = new Map<
  string,
  {
    voiceId: string;
    name: string;
    previewUrl?: string;
    metadata: {
      gender?: string;
      accent?: string;
      age?: string;
      description?: string;
    };
  }
>();

export const normalizePathSegment = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

export const fetchVoiceMetadata = async ({
  apiKey,
  voiceId,
  fallbackName,
}: {
  apiKey: string;
  voiceId: string;
  fallbackName?: string;
}) => {
  const cached = voiceMetadataCache.get(voiceId);

  if (cached) {
    return cached;
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
    method: "GET",
    headers: {
      "xi-api-key": apiKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  const voiceData = (await response.json()) as ElevenLabsVoiceResponse;
  const normalized = {
    voiceId: voiceData.voice_id ?? voiceId,
    name: voiceData.name || fallbackName || "Voice",
    previewUrl: voiceData.preview_url,
    metadata: {
      gender: voiceData.labels?.gender,
      accent: voiceData.labels?.accent,
      age: voiceData.labels?.age,
      description: voiceData.description,
    },
  };

  voiceMetadataCache.set(voiceId, normalized);
  return normalized;
};

export const fetchPresetVoiceMetadata = async (apiKey: string) => {
  return Promise.all(
    ELEVENLABS_PRESET_VOICES.map(async ({ voiceId, fallbackName }) => {
      try {
        return await fetchVoiceMetadata({
          apiKey,
          voiceId,
          fallbackName,
        });
      } catch {
        return {
          voiceId,
          name: fallbackName,
          previewUrl: undefined,
          metadata: {
            description: "Voice metadata unavailable",
          },
        };
      }
    }),
  );
};

export const normalizeAlignment = (alignment: unknown) => {
  const parsedMs = msAlignmentSchema.safeParse(alignment);

  if (parsedMs.success) {
    const chars = parsedMs.data.chars ?? parsedMs.data.characters ?? [];
    const charStartTimesMs =
      parsedMs.data.charStartTimesMs ?? parsedMs.data.char_start_times_ms ?? [];
    const charDurationsMs =
      parsedMs.data.charDurationsMs ?? parsedMs.data.char_durations_ms ?? [];

    if (
      chars.length > 0 &&
      chars.length === charStartTimesMs.length &&
      chars.length === charDurationsMs.length
    ) {
      return {
        chars,
        charStartTimesMs,
        charDurationsMs,
      };
    }
  }

  const parsedSeconds = secondAlignmentSchema.safeParse(alignment);

  if (parsedSeconds.success) {
    const chars = parsedSeconds.data.chars ?? parsedSeconds.data.characters ?? [];
    const starts = parsedSeconds.data.character_start_times_seconds ?? [];
    const ends = parsedSeconds.data.character_end_times_seconds ?? [];

    if (chars.length > 0 && chars.length === starts.length && chars.length === ends.length) {
      return {
        chars,
        charStartTimesMs: starts.map((value) => Math.round(value * 1000)),
        charDurationsMs: ends.map((value, index) => {
          return Math.max(0, Math.round((value - starts[index]) * 1000));
        }),
      };
    }
  }

  throw new Error("ElevenLabs did not return usable alignment data.");
};

export const getDurationSecondsFromAlignment = (alignment: {
  charStartTimesMs: number[];
  charDurationsMs: number[];
}): number => {
  const totalMs = alignment.charStartTimesMs.reduce((max, start, index) => {
    const end = start + (alignment.charDurationsMs[index] ?? 0);
    return Math.max(max, end);
  }, 0);

  if (totalMs <= 0) {
    throw new Error("Unable to determine the generated audio duration.");
  }

  return totalMs / 1000;
};
