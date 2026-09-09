import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/lib/auth";
import { useLogger, withEvlog } from "@/lib/evlog";
import {
  sanitizeSceneDraftsForStorage,
  toProjectDetail,
} from "@/lib/project-persistence";
import { ProjectResponse, UpdateProjectRequest } from "@/types/schema";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

const getOwnedProject = async (projectId: string, userId: string) => {
  return db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });
};

export const GET = withEvlog(async function GET(
  request: Request,
  context: RouteContext,
) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { projectId } = await context.params;
  log.set({
    user: { id: session.user.id },
    project: { id: projectId },
    operation: "get-project",
  });
  const project = await getOwnedProject(projectId, session.user.id);

  if (!project) {
    return NextResponse.json({ message: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(
    ProjectResponse.parse({
      project: toProjectDetail(project),
    }),
  );
});

export const PUT = withEvlog(async function PUT(
  request: Request,
  context: RouteContext,
) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { projectId } = await context.params;
  log.set({
    user: { id: session.user.id },
    project: { id: projectId },
    operation: "update-project",
  });
  const existingProject = await getOwnedProject(projectId, session.user.id);

  if (!existingProject) {
    return NextResponse.json({ message: "Project not found." }, { status: 404 });
  }

  const payload = UpdateProjectRequest.parse(await request.json());
  const sceneDrafts = sanitizeSceneDraftsForStorage(payload.sceneDrafts);

  const [project] = await db
    .update(projects)
    .set({
      title: payload.title,
      script: payload.script,
      selectedVoiceId: payload.selectedVoiceId,
      sceneDrafts,
      sceneCount: sceneDrafts.length,
      renderUrl: null,
      renderSize: null,
      renderSignature: null,
      renderCompletedAt: null,
      updatedAt: new Date(),
    })
    .where(and(eq(projects.id, projectId), eq(projects.userId, session.user.id)))
    .returning();

  return NextResponse.json(
    ProjectResponse.parse({
      project: toProjectDetail(project),
    }),
  );
});

export const DELETE = withEvlog(async function DELETE(
  request: Request,
  context: RouteContext,
) {
  const log = useLogger();
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { projectId } = await context.params;
  log.set({
    user: { id: session.user.id },
    project: { id: projectId },
    operation: "delete-project",
  });

  const [deletedProject] = await db
    .delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, session.user.id)))
    .returning();

  if (!deletedProject) {
    return NextResponse.json({ message: "Project not found." }, { status: 404 });
  }

  return new Response(null, { status: 204 });
});
