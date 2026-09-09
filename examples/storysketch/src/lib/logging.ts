import { parseError } from "evlog";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const getErrorStatus = (error: unknown, fallback = 500): number => {
  if (error && typeof error === "object" && "status" in error) {
    const status = error.status;

    if (typeof status === "number" && status >= 400 && status < 600) {
      return status;
    }
  }

  const parsed = parseError(error);

  return parsed.status ?? fallback;
};
