# Storyline Artifact Contract

Use this file to interpret fields. `artifact.schema.json` is the machine-readable structural contract. The files in `examples/` are correct filled Visualization Artifacts, not replacement schemas.

Write `.storyline/visualization.json` with these top-level fields:

```json
{
  "schemaVersion": "1.0.0",
  "artifactType": "storyline.visualization",
  "metadata": {
    "visualizationUpdatedAt": "2026-08-16T12:00:00.000Z",
    "sourceFingerprint": "sha256:0000000000000000000000000000000000000000000000000000000000000000",
    "gitCommit": null,
    "gitDirty": null
  },
  "project": {},
  "domains": [],
  "stories": [],
  "storyPaths": [],
  "steps": [],
  "implementations": [],
  "calls": [],
  "schemas": [],
  "sourceEvidence": [],
  "relationships": [],
  "diagnostics": []
}
```

Run `storyline stamp <repository>` after the Visualization Artifact is created or materially changed. The command atomically records the update time, a SHA-256 fingerprint of the current source files, the Git commit when available, and whether the Git worktree is dirty. Validation and viewing do not change this metadata.

## Objects

### Domain

```json
{
  "id": "domain:project-management",
  "name": "Project management",
  "summary": "Creates, restores, updates, and removes saved projects.",
  "storyIds": ["story:create-project"],
  "status": "confirmed",
  "evidenceIds": []
}
```

### Story

```json
{
  "id": "story:create-project",
  "domainId": "domain:project-management",
  "group": "Project management",
  "title": "Create a project",
  "summary": "Preserve a new project for later editing and rendering.",
  "system": "Web application",
  "status": "confirmed",
  "pathIds": ["path:create-project:default"],
  "evidenceIds": []
}
```

### Story Path

```json
{
  "id": "path:create-project:default",
  "storyId": "story:create-project",
  "title": "Default path",
  "stepIds": ["step:create-project:submitted", "step:create-project:saved"],
  "startStepId": "step:create-project:submitted",
  "endStepId": "step:create-project:saved"
}
```

### Step

```json
{
  "id": "step:create-project:submitted",
  "pathId": "path:create-project:default",
  "order": 1,
  "kind": "event",
  "title": "Project submitted",
  "summary": "The application receives a new project definition.",
  "system": "Projects API",
  "status": "confirmed",
  "inputSchemaId": "schema:create-project-input",
  "outputSchemaId": "schema:create-project-output",
  "implementationId": "implementation:create-project:submitted",
  "evidenceIds": []
}
```

`kind` must be `event`, `action`, `decision`, or `outcome`.

### Implementation

```json
{
  "id": "implementation:create-project:submitted",
  "stepId": "step:create-project:submitted",
  "summary": "Validate the request and persist the project.",
  "needs": "Project definition and authenticated user",
  "produces": "Persisted project",
  "callIds": ["call:create-project:insert"],
  "evidenceIds": []
}
```

### Call

```json
{
  "id": "call:create-project:insert",
  "implementationId": "implementation:create-project:submitted",
  "order": 1,
  "name": "createProject()",
  "mode": "await I/O",
  "description": "Insert the project for the current user.",
  "flow": "Validated project -> stored project",
  "evidenceIds": []
}
```

### Schema

```json
{
  "id": "schema:create-project-input",
  "direction": "input",
  "title": "Create project input",
  "fields": [
    {
      "name": "name",
      "type": "string",
      "required": true,
      "description": "User-visible project name."
    }
  ]
}
```

### Source evidence

```json
{
  "id": "evidence:create-project-route",
  "path": "src/app/api/projects/route.ts",
  "lineStart": 20,
  "lineEnd": 58,
  "symbol": "POST",
  "kind": "route",
  "status": "confirmed"
}
```

## Invariants

- Every ID is unique and stable across unchanged analyses.
- Every reference resolves.
- Every Story belongs to one Domain.
- Every Story has at least one Story Path.
- Every Story Path has an explicit ordered `stepIds` list.
- Every Step belongs to one Story Path and has an integer `order`.
- Story progression does not use Call or dependency relationships.
- Source paths are repository-relative and cannot contain `..`.
- Missing Implementation detail is allowed when a diagnostic explains the gap.
- The artifact contains data only.

## Selection quality

Include the behaviors that best explain the product. Do not optimize for the number of Stories or Steps. A small repository may have one Story. A large repository may need several domains and selected representative Stories.
