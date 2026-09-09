const OPENROUTER_CHAT_COMPLETIONS_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_OPENROUTER_TIMEOUT_MS = 45_000;
const DEFAULT_OPENROUTER_RETRIES = 1;

type OpenRouterFetchOptions = {
  apiKey: string;
  body: unknown;
  siteUrl: string;
  title: string;
  timeoutMs?: number;
  retries?: number;
};

export class UpstreamServiceError extends Error {
  status: number;

  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "UpstreamServiceError";
    this.status = status;
  }
}

const getErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  const cause = "cause" in error ? error.cause : undefined;

  if (cause && typeof cause === "object" && "code" in cause) {
    const code = cause.code;
    return typeof code === "string" ? code : undefined;
  }

  if ("code" in error) {
    const code = error.code;
    return typeof code === "string" ? code : undefined;
  }

  return undefined;
};

const isTransientFetchError = (error: unknown): boolean => {
  if (error instanceof DOMException && error.name === "AbortError") {
    return true;
  }

  const code = getErrorCode(error);

  return (
    code === "UND_ERR_CONNECT_TIMEOUT" ||
    code === "UND_ERR_HEADERS_TIMEOUT" ||
    code === "UND_ERR_SOCKET" ||
    code === "ECONNRESET" ||
    code === "ETIMEDOUT"
  );
};

const toUpstreamServiceError = (error: unknown): UpstreamServiceError => {
  if (error instanceof DOMException && error.name === "AbortError") {
    return new UpstreamServiceError(
      "OpenRouter timed out while processing the request. Please try again.",
      504,
      { cause: error },
    );
  }

  if (isTransientFetchError(error)) {
    return new UpstreamServiceError(
      "OpenRouter is taking too long to respond. Please try again.",
      504,
      { cause: error },
    );
  }

  return new UpstreamServiceError(
    "Unable to reach OpenRouter. Check your network connection and try again.",
    502,
    { cause: error },
  );
};

export const fetchOpenRouterChatCompletion = async ({
  apiKey,
  body,
  siteUrl,
  title,
  timeoutMs = DEFAULT_OPENROUTER_TIMEOUT_MS,
  retries = DEFAULT_OPENROUTER_RETRIES,
}: OpenRouterFetchOptions): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(OPENROUTER_CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": siteUrl,
          "X-OpenRouter-Title": title,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (error) {
      lastError = error;

      if (!isTransientFetchError(error) || attempt === retries) {
        throw toUpstreamServiceError(error);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw toUpstreamServiceError(lastError);
};
