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
  "dataFlows": [],
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

When the artifact can explain how a Step changes its data contract, add optional `schemaChanges` entries. These are editorial field mappings, not a complete runtime type system. Use them to describe fields being added, consumed, changed, or preserved between the Step boundary schemas.

```json
{
  "schemaChanges": [
    {
      "kind": "changed",
      "from": "script",
      "to": "scenes",
      "description": "The source script is split into ordered scene drafts."
    }
  ]
}
```

If no explicit mapping is available, the viewer may derive a simple comparison from the Step's input and output schemas. Derived comparisons must remain visibly distinguishable from evidence-backed mappings.

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

Use `direction: "object"` for reusable object shapes that are not themselves a Step boundary. A field can include `schemaId` when its type is an object or collection with a separately documented schema. Do not infer this link from a type name alone.

```json
{
  "name": "project",
  "type": "Project",
  "schemaId": "schema:object-project",
  "required": true,
  "description": "The saved project."
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

### Data flow

Use `dataFlows` for a small number of named data objects that help a reader follow how meaningful product data changes across Steps. This is not a replacement for Step Input and Output schemas. Each stage points to the Step that owns the transition and the Schema that describes the object at that point.

```json
{
  "id": "dataflow:explainer-draft",
  "title": "Explainer draft",
  "description": "The creator's script becomes a complete editable explainer.",
  "storyIds": ["story:create-explainer"],
  "stages": [
    {
      "stepId": "step:create:script-submitted",
      "schemaId": "schema:script-input",
      "label": "Script received",
      "description": "The draft starts with the creator's title and script.",
      "state": "created"
    }
  ]
}
```

`state` must be `created`, `updated`, `branched`, or `completed`. Keep stages focused on meaningful product data. Do not list every internal variable or every function handoff.

## Invariants

- Every ID is unique and stable across unchanged analyses.
- Every reference resolves.
- Every Story belongs to one Domain.
- Every Story has at least one Story Path.
- Every Story Path has an explicit ordered `stepIds` list.
- Every Step belongs to one Story Path and has an integer `order`.
- Story progression does not use Call or dependency relationships.
- Data flow stages must reference existing Steps and Schemas.
- Source paths are repository-relative and cannot contain `..`.
- Missing Implementation detail is allowed when a diagnostic explains the gap.
- The artifact contains data only.

## Selection quality

Include the behaviors that best explain the product. Do not optimize for the number of Stories or Steps. A small repository may have one Story. A large repository may need several domains and selected representative Stories.
