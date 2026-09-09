import { and, eq } from "drizzle-orm";
import {
  addBundleToSandbox,
  createSandbox,
  renderMediaOnVercel,
  uploadToVercelBlob,
} from "@remotion/vercel";
import { availableParallelism } from "node:os";
import { waitUntil } from "@vercel/functions";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { useLogger, withEvlog } from "@/lib/evlog";
import { getErrorMessage } from "@/lib/logging";
import { COMP_NAME } from "../../../../types/constants";
import { RenderRequest } from "../../../../types/schema";
import {
  bundleRemotionProject,
  ensureSandboxBundleDir,
  formatSSE,
  type RenderProgress,
} from "./helpers";
import { restoreSnapshot } from "./restore-snapshot";

const resolveRenderConcurrency = (): number => {
  const maxSafeConcurrency = 4;
  const envValue = process.env.REMOTION_RENDER_CONCURRENCY;

  if (envValue) {
    const parsed = Number.parseInt(envValue, 10);

    if (Number.isFinite(parsed) && parsed > 0) {
      return Math.min(parsed, maxSafeConcurrency);
    }
  }

  return Math.max(
    1,
    Math.min(maxSafeConcurrency, Math.max(1, availableParallelism() - 1)),
  );
};

const REMOTION_RENDER_DEFAULTS = {
  codec: "h264" as const,
  imageFormat: "jpeg" as const,
  concurrency: resolveRenderConcurrency(),
};

export const POST = withEvlog(async function POST(req: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN is not set. To fix this, go to vercel.com, log in, select Storage, click "Create Database", select "Blob", link it to your project, then add BLOB_READ_WRITE_TOKEN to your .env file.',
    );
  }

  const payload = await req.json();
  const body = RenderRequest.parse(payload);
  log.set({
    user: { id: session.user.id },
    render: {
      compositionId: COMP_NAME,
    },
    operation: "render-video",
  });

  const send = async (message: RenderProgress) => {
    await writer.write(encoder.encode(formatSSE(message)));
  };

  const runRender = async () => {
    await send({ type: "phase", phase: "Creating sandbox...", progress: 0 });
    const sandbox = process.env.VERCEL
      ? await restoreSnapshot()
      : await createSandbox({
          onProgress: async ({ progress, message }) => {
            await send({
              type: "phase",
              phase: message,
              progress,
              subtitle: "This is only needed during development.",
            });
          },
        });

    try {
      if (!process.env.VERCEL) {
        bundleRemotionProject(".remotion");
        await ensureSandboxBundleDir(sandbox);
        await addBundleToSandbox({ sandbox, bundleDir: ".remotion" });
      }

      const { sandboxFilePath, contentType } = await renderMediaOnVercel({
        sandbox,
        compositionId: COMP_NAME,
        inputProps: body.inputProps,
        ...REMOTION_RENDER_DEFAULTS,
        onProgress: async (update) => {
          switch (update.stage) {
            case "opening-browser":
              await send({
                type: "phase",
                phase: "Opening browser...",
                progress: update.overallProgress,
              });
              break;
            case "selecting-composition":
              await send({
                type: "phase",
                phase: "Selecting composition...",
                progress: update.overallProgress,
              });
              break;
            case "render-progress":
              await send({
                type: "phase",
                phase: "Rendering video...",
                progress: update.overallProgress,
              });
              break;
            default:
              break;
          }
        },
      });

      await send({
        type: "phase",
        phase: "Uploading video...",
        progress: 1,
      });

      const { url, size } = await uploadToVercelBlob({
        sandbox,
        sandboxFilePath,
        contentType,
        blobToken,
        access: "public",
      });

      if (body.projectId && body.renderSignature) {
        await db
          .update(projects)
          .set({
            renderUrl: url,
            renderSize: size,
            renderSignature: body.renderSignature,
            renderCompletedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(projects.id, body.projectId),
              eq(projects.userId, session.user.id),
            ),
          );
      }

      await send({ type: "done", url, size });
    } catch (err) {
      log.error(err instanceof Error ? err : String(err), {
        operation: "render-video",
      });
      await send({
        type: "error",
        message: getErrorMessage(err, "Render failed."),
      });
    } finally {
      await sandbox?.stop().catch(() => {});
      await writer.close();
    }
  };

  waitUntil(runRender());

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
});
