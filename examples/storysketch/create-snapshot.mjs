import { execSync } from "child_process";
import { put } from "@vercel/blob";
import { addBundleToSandbox, createSandbox } from "@remotion/vercel";

const getSnapshotBlobKey = () =>
  `snapshot-cache/${process.env.VERCEL_DEPLOYMENT_ID ?? "local"}.json`;

const requireEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `[create-snapshot] Missing required environment variable: ${name}`,
    );
  }

  return value;
};

const bundleRemotionProject = (bundleDir) => {
  try {
    execSync(`node_modules/.bin/remotion bundle --out-dir ./${bundleDir}`, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  } catch (error) {
    const stderr = error?.stderr?.toString?.() ?? "";
    throw new Error(`Remotion bundle failed: ${stderr}`);
  }
};

const ensureSandboxBundleDir = async (sandbox) => {
  try {
    await sandbox.mkDir("remotion-bundle");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (!message.toLowerCase().includes("exist")) {
      throw error;
    }
  }
};

requireEnv("BLOB_READ_WRITE_TOKEN");
requireEnv("DATABASE_URL");
requireEnv("BETTER_AUTH_SECRET");

let sandbox;

try {
  sandbox = await createSandbox({
    onProgress: ({ progress, message }) => {
      const pct = Math.round(progress * 100);
      console.log(`[create-snapshot] ${message} (${pct}%)`);
    },
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes("OIDC") ||
    message.includes("x-vercel-oidc-token") ||
    message.includes("Could not get credentials from OIDC context")
  ) {
    throw new Error(
      "[create-snapshot] Failed to create Vercel Sandbox credentials. In local development, run `vercel link` and `vercel env pull`. In Vercel, make sure Sandbox/OIDC credentials are available to the build.",
    );
  }

  throw error;
}

console.log("[create-snapshot] Adding Remotion bundle...");
bundleRemotionProject(".remotion");
await ensureSandboxBundleDir(sandbox);
await addBundleToSandbox({ sandbox, bundleDir: ".remotion" });

console.log("[create-snapshot] Taking snapshot...");
const snapshot = await sandbox.snapshot({ expiration: 0 });
const { snapshotId } = snapshot;

await put(getSnapshotBlobKey(), JSON.stringify({ snapshotId }), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
});

console.log(`[create-snapshot] Snapshot saved: ${snapshotId} (never expires)`);
await sandbox.stop();
