import { index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import type { SceneDraft } from "@/lib/scene-planning";

import { user } from "./auth-schema";

export const projects = pgTable(
  "projects",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    prompt: text("prompt"),
    script: text("script"),
    selectedVoiceId: text("selected_voice_id").notNull(),
    sceneDrafts: jsonb("scene_drafts").$type<SceneDraft[]>().notNull(),
    renderUrl: text("render_url"),
    renderSize: integer("render_size"),
    renderSignature: text("render_signature"),
    renderCompletedAt: timestamp("render_completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    sceneCount: integer("scene_count").default(0).notNull(),
  },
  (table) => ({
    userCreatedAtIdx: index("projects_user_id_created_at_idx").on(
      table.userId,
      table.createdAt,
    ),
  }),
);
