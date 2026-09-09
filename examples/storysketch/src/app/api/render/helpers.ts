import { execSync } from "child_process";
import type { VercelSandbox } from "@remotion/vercel";

const REMOTION_SANDBOX_BUNDLE_DIR = "remotion-bundle";

export function bundleRemotionProject(bundleDir: string): void {
  try {
    execSync(`node_modules/.bin/remotion bundle --out-dir ./${bundleDir}`, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  } catch (e) {
    const stderr = (e as { stderr?: Buffer }).stderr?.toString() ?? "";
    throw new Error(`Remotion bundle failed: ${stderr}`);
  }
}

export async function ensureSandboxBundleDir(
  sandbox: VercelSandbox,
): Promise<void> {
  try {
    await sandbox.mkDir(REMOTION_SANDBOX_BUNDLE_DIR);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (!message.toLowerCase().includes("exist")) {
      throw error;
    }
  }
}

export type RenderProgress =
  | { type: "phase"; phase: string; progress: number; subtitle?: string }
  | { type: "done"; url: string; size: number }
  | { type: "error"; message: string };

export type OnProgressFn = (message: RenderProgress) => Promise<void>;

export function formatSSE(message: RenderProgress): string {
  return `data: ${JSON.stringify(message)}\n\n`;
}
