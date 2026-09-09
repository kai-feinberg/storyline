import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import {
  createStarterProject,
  toProjectDetail,
  toProjectSummary,
} from "@/lib/project-persistence";
import { CreateProjectResponse, ProjectsResponse } from "@/types/schema";

export const runtime = "nodejs";

export const GET = withEvlog(async function GET(request: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  log.set({
    user: { id: session.user.id },
    operation: "list-projects",
  });

  const rows = await db.query.projects.findMany({
    where: eq(projects.userId, session.user.id),
    orderBy: desc(projects.updatedAt),
  });

  const currentProject = rows[0] ? toProjectDetail(rows[0]) : null;

  return NextResponse.json(
    ProjectsResponse.parse({
      projects: rows.map(toProjectSummary),
      currentProject,
    }),
  );
});

export const POST = withEvlog(async function POST(request: Request) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  log.set({
    user: { id: session.user.id },
    operation: "create-project",
  });

  const starter = createStarterProject();

  const [project] = await db
    .insert(projects)
    .values({
      id: starter.id,
      userId: session.user.id,
      title: starter.title,
      prompt: null,
      script: starter.script,
      selectedVoiceId: starter.selectedVoiceId,
      sceneDrafts: starter.sceneDrafts,
      sceneCount: starter.sceneCount,
      renderUrl: starter.renderUrl,
      renderSize: starter.renderSize,
      renderSignature: starter.renderSignature,
      renderCompletedAt: starter.renderCompletedAt,
    })
    .returning();

  return NextResponse.json(
    CreateProjectResponse.parse({
      project: toProjectDetail(project),
    }),
    { status: 201 },
  );
});
