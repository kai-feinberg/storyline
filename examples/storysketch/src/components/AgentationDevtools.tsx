"use client";

import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false },
);

export const AgentationDevtools = () => {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Agentation
      webhookUrl={process.env.NEXT_PUBLIC_AGENTATION_WEBHOOK_URL}
    />
  );
};
