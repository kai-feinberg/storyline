import { createFsDrain } from "evlog/fs";
import { createEvlog } from "evlog/next";

const serviceName =
  process.env.EVLOG_SERVICE_NAME ??
  process.env.SERVICE_NAME ??
  "whiteboard-video-vercel";

export const { withEvlog, useLogger, createError, log } = createEvlog({
  service: serviceName,
  pretty: process.env.NODE_ENV !== "production",
  routes: {
    "/api/auth/**": { service: `${serviceName}-auth` },
    "/api/render/**": { service: `${serviceName}-render` },
  },
  drain: createFsDrain({
    dir: ".evlog/logs",
    pretty: process.env.NODE_ENV !== "production",
    maxFiles: 14,
  }),
  enrich: (ctx) => {
    ctx.event.deploymentId = process.env.VERCEL_DEPLOYMENT_ID;
    ctx.event.region = process.env.VERCEL_REGION;
  },
});
