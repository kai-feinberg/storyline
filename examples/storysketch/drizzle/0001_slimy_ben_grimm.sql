ALTER TABLE "projects" ADD COLUMN "selected_voice_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "scene_drafts" jsonb NOT NULL;