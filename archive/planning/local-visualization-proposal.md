# Local Visualization Implementation

## Goal

Point an analysis agent at a repository, generate a validated Storyline data artifact, and open the redesigned Storyline viewer locally.

The agent generates data, not React, JSX, CSS, or executable code. The viewer owns layout and interaction. The stable contract is a versioned JSON artifact.

The first target is `apps/storyline-redesign`. Its primary interaction is a Story timeline: select a Step, expand its Implementation, inspect input/output schemas, and open a source trace. The artifact must model this interaction directly.

## Existing analysis pipeline

Understand Anything already provides the useful inputs:

```text
repository
  -> .ua/knowledge-graph.json       structural graph
  -> .ua/domain-graph.json          domain -> flow -> step graph
  -> existing dashboard
```

The relevant implementation is in:

- `analysis/understand-anything/understand-anything-plugin/skills/understand-domain/SKILL.md`
- `analysis/understand-anything/understand-anything-plugin/agents/domain-analyzer.md`
- `analysis/build-structural-graph.mjs`

The domain analyzer emits `domain`, `flow`, and `step` nodes, plus `contains_flow` and ordered `flow_step` edges. It writes to `.ua/` by default and preserves the legacy `.understand-anything/` directory when that directory already exists.

Use these files as Storyline inputs. Do not build a second repository scanner for the first implementation. Add a Storyline projection step that enriches domain steps with implementations, calls, schemas, and source evidence from the structural graph and agent context.

## User experience and commands

```bash
pnpm dlx @storyline/cli analyze /path/to/project
pnpm dlx @storyline/cli validate /path/to/project
pnpm dlx @storyline/cli view /path/to/project
pnpm dlx @storyline/cli open /path/to/project
```

`open` resolves the project, reuses fresh Understand Anything graphs, runs the Storyline projection only when the artifact is missing or stale, validates it, starts a `127.0.0.1` server, and opens a tokenized URL.

For this repository, the development path is:

```bash
pnpm --dir apps/storyline-redesign install
pnpm --dir apps/storyline-redesign dev
```

Until the CLI is published, run the local prototype with:

```bash
node packages/cli/storyline.mjs analyze /path/to/project
node packages/cli/storyline.mjs validate /path/to/project
node packages/cli/storyline.mjs open /path/to/project
```

The prototype expects Understand Anything to have produced `.ua/domain-graph.json` first. In an agent workflow, run `/understand` and `/understand-domain`, then run the Storyline projection. The published CLI will wrap those steps behind `storyline analyze`.

The packaged viewer must use the same prebuilt frontend plus a small local server. Users must not need to clone Storyline or run Vite to view another repository.

## Architecture

```text
Repository
  -> Understand Anything scan / graph
  -> Storyline analyzer + projection
  -> .storyline/visualization.json
  -> Viewer server
  -> apps/storyline-redesign frontend
```

### Analyzer and projection

The analyzer owns repository discovery and agent orchestration. It reuses `.ua` artifacts, dispatches evidence-aware agents, and asks for schema-constrained JSON. Agents do not own path sanitization, stable IDs, ordering, reference repair, or final persistence.

### Artifact module

The artifact module owns JSON Schema and runtime validation, stable IDs, repository-relative paths, Story and Path ordering, reference integrity, schema migrations, confidence, diagnostics, and atomic writes. The viewer never renders raw agent output.

### Viewer module

The viewer loads one validated artifact and renders Stories, Paths, Steps, Implementations, Calls, schemas, and source traces. The server binds to loopback, requires a random token, serves only referenced source files, and rejects absolute paths, traversal, binary files, and oversized previews.

## Project-local files

```text
.storyline/
├── visualization.json
├── meta.json
├── fingerprints.json
├── intermediate/
└── .storylineignore
```

`.ua/knowledge-graph.json` and `.ua/domain-graph.json` remain inputs. `.storyline/visualization.json` is the normalized Storyline output.

## Storyline artifact schema

Define JSON Schema Draft 2020-12 in `packages/schema/storyline-artifact.schema.json`. Generate TypeScript types and expose a runtime validator from the same package.

Top level:

```json
{
  "schemaVersion": "1.0.0",
  "artifactType": "storyline.visualization",
  "project": {
    "id": "project:storysketch",
    "name": "StorySketch",
    "root": ".",
    "analyzedAt": "2026-08-14T12:00:00Z",
    "gitCommit": "abc123",
    "languages": ["TypeScript"],
    "frameworks": ["Next.js", "Remotion"]
  },
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

### Core objects

IDs are stable and derived from normalized semantic names and repository-relative paths. Never use array indexes as IDs.

```json
{
  "stories": [{
    "id": "story:extract-pdf-batch",
    "group": "Extraction flows",
    "title": "Extract PDF batch",
    "summary": "Process many PDFs in parallel and merge them into one validated dataset.",
    "system": "Pipeline",
    "status": "confirmed",
    "pathIds": ["path:extract-pdf-batch:default"],
    "evidenceIds": ["evidence:api-batches-route"]
  }],
  "storyPaths": [{
    "id": "path:extract-pdf-batch:default",
    "storyId": "story:extract-pdf-batch",
    "title": "Standard extraction path",
    "stepIds": [
      "step:extract-pdf-batch:batch-submitted",
      "step:extract-pdf-batch:load-config"
    ],
    "startStepId": "step:extract-pdf-batch:batch-submitted",
    "endStepId": "step:extract-pdf-batch:dataset-ready"
  }],
  "steps": [{
    "id": "step:extract-pdf-batch:batch-submitted",
    "pathId": "path:extract-pdf-batch:default",
    "order": 1,
    "kind": "event",
    "title": "PDF batch submitted",
    "summary": "A user starts a configured flow with one or more PDF documents.",
    "system": "Flow API",
    "status": "confirmed",
    "inputSchemaId": "schema:batch-submission",
    "outputSchemaId": "schema:accepted-batch",
    "implementationId": "implementation:batch-submitted",
    "evidenceIds": ["evidence:api-batches-route"]
  }],
  "implementations": [{
    "id": "implementation:batch-submitted",
    "stepId": "step:extract-pdf-batch:batch-submitted",
    "summary": "Accept the batch request and create its durable identity.",
    "needs": "PDF files, flow ID",
    "produces": "Accepted batch request",
    "callIds": ["call:create-batch-handler"],
    "evidenceIds": ["evidence:api-batches-route"]
  }],
  "calls": [{
    "id": "call:create-batch-handler",
    "implementationId": "implementation:batch-submitted",
    "order": 1,
    "name": "createBatch()",
    "mode": "await I/O",
    "description": "Creates the batch record and returns its stable identifier.",
    "flow": "BatchRequest -> Batch",
    "evidenceIds": ["evidence:create-batch-function"]
  }]
}
```

### Schemas, evidence, relationships, diagnostics

```json
{
  "schemas": [{
    "id": "schema:batch-submission",
    "direction": "input",
    "title": "Batch submission",
    "fields": [{
      "name": "files",
      "type": "FileRef[]",
      "required": true,
      "description": "One or more PDF files."
    }]
  }],
  "sourceEvidence": [{
    "id": "evidence:api-batches-route",
    "path": "src/app/api/projects/route.ts",
    "lineStart": 18,
    "lineEnd": 54,
    "symbol": "POST",
    "kind": "route",
    "status": "confirmed",
    "excerpt": "short optional bounded excerpt"
  }],
  "relationships": [{
    "id": "relationship:step-next-load-config",
    "from": "step:extract-pdf-batch:batch-submitted",
    "to": "step:extract-pdf-batch:load-config",
    "kind": "next",
    "order": 2
  }],
  "diagnostics": [{
    "code": "EVIDENCE_INFERRED",
    "severity": "warning",
    "message": "The implementation was inferred from a call chain.",
    "entityId": "implementation:batch-submitted"
  }]
}
```

Required invariants:

- Every Story has one or more Story Paths.
- Every Path has an explicit ordered `stepIds` list.
- Every Step has exactly one `kind`: `event`, `action`, `decision`, or `outcome`.
- Every Step belongs to one Path and has at most one Implementation.
- Every semantic claim has source evidence when it is not purely structural.
- Every reference resolves to an existing ID.
- `order` is explicit; never infer display order from object or edge order.
- `status` is `confirmed`, `inferred`, or `uncertain`.
- Source paths are repository-relative POSIX paths.
- Excerpts are optional, bounded, and never executable.
- The artifact contains data only. Reject JavaScript, JSX, HTML, absolute paths, and code-like payloads.

## Agent generation contract

Agents emit candidate objects plus a `sourceClaim` for every semantic claim. They do not emit final IDs based on array positions.

```text
Analyze only the supplied repository evidence.
Return JSON matching the Storyline candidate schema.
Create a Story only when the evidence shows a user or system goal.
Create ordered Steps only when execution order is supported by routes, calls,
imports, queue edges, database operations, or explicit domain evidence.
Attach repository-relative source references to every claim.
Use confirmed when directly supported, inferred when reconstructed from a
supported chain, and uncertain when evidence is incomplete.
Do not invent files, functions, endpoints, schemas, or business behavior.
Do not emit code or presentation instructions.
```

Normalization:

1. Map Understand Anything `domain` and `flow` nodes to Story groups and Stories.
2. Map each `step` node and ordered `flow_step` edge to a Storyline Step.
3. Join structural nodes, functions, routes, database tables, and imports to create Implementations and Calls.
4. Convert file locations to `sourceEvidence`.
5. Assign stable IDs, repair safe omissions, reject dangling references, and emit diagnostics.
6. Write the artifact atomically.

The existing Understand Anything `weight` field is input ordering only. Storyline must persist an explicit integer `order`.

## Analysis pipeline

1. Resolve project root, Git root, `.ua` or legacy `.understand-anything` directory, and ignore rules.
2. Load fresh structural and domain graphs when available.
3. Run the existing lightweight domain context scan when graphs are absent.
4. Dispatch bounded, schema-constrained analysis batches.
5. Assemble candidate Stories, Paths, Steps, Implementations, Calls, and Evidence.
6. Normalize IDs, paths, ordering, status, and references.
7. Validate semantic invariants.
8. Atomically write `.storyline/visualization.json`, metadata, and fingerprints.
9. Start the viewer only after validation succeeds.

Keep intermediate data for incremental runs. `--full` forces a rebuild.

## Package layout

```text
apps/
└── storyline-redesign/      # React viewer; currently contains hardcoded fixture data
packages/
├── schema/                  # JSON Schema, types, validator, migrations
├── analyzer-core/           # Understand Anything adapter and agent orchestration
├── artifact/                # Normalize, validate, persist
├── local-server/            # Token-gated server and safe source reads
└── cli/                     # analyze, validate, view, open
skills/
└── storyline/               # Agent prompt and output contract
```

The first viewer refactor replaces `stories`, `steps`, `stepSchemas`, and `operationDetails` in `apps/storyline-redesign/src/main.jsx` with one artifact loaded through an adapter. Keep the existing interaction behavior.

## Validation and testing

Prioritize contract tests:

- Valid and invalid artifact fixtures.
- Projection tests for `.ua/domain-graph.json` and `.ua/knowledge-graph.json`.
- Stable ID, explicit ordering, and missing-reference tests.
- Event/Action/Decision/Outcome invariant tests.
- Source path traversal and binary-file rejection tests.
- Local-server token and source allowlist tests.
- Schema compatibility and incremental freshness tests.
- One end-to-end fixture based on `analysis/storysketch` that opens the redesign and renders Source Traces.

Acceptance test:

> Given a repository with no Storyline source installed, `storyline analyze` produces a valid `.storyline/visualization.json`, and `storyline open` displays Stories with working Step, Implementation, schema, and Source Trace interactions.

## Delivery phases

### Phase 1: Artifact contract and redesign adapter

- Define `packages/schema` and artifact version `1.0.0`.
- Create a StorySketch fixture.
- Load it into the redesign through an adapter.
- Remove hardcoded Story data from `main.jsx`.
- Validate and render the fixture locally.

### Phase 2: Understand Anything projection

- Read the structural and domain graphs.
- Project domain/flow/step nodes into Stories, Paths, and Steps.
- Attach source evidence and implementation calls.
- Emit diagnostics when the domain graph lacks detail.

### Phase 3: Standalone viewer and CLI

- Build the frontend into the Viewer Module.
- Implement `validate` and `view`.
- Add loopback binding, port selection, tokens, and safe source previews.

### Phase 4: Agent and incremental workflow

- Add schema-constrained Storyline prompts.
- Implement `analyze`, fingerprints, stale checks, `--full`, ignore configuration, and `open`.

## First implementation slice

Start with the artifact contract and the existing redesign. Do not start by rebuilding repository analysis.

The first pull request should contain:

1. `packages/schema` with types and a validator.
2. A StorySketch `.storyline/visualization.json` fixture.
3. A data-loading adapter in `apps/storyline-redesign`.
4. Removal of hardcoded Story data.
5. A projection test using small structural and domain graph fixtures.
6. A local command that validates and opens the redesign with that artifact.

This gives the agent, artifact, and viewer one real contract before analysis variability is introduced.
