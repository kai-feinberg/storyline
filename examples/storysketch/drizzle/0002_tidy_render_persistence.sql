ALTER TABLE "projects" ADD COLUMN "render_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "render_size" integer;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "render_signature" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "render_completed_at" timestamp;
