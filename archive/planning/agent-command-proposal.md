# Storyline Agent Command Plan

## Purpose

Storyline will own the repository-understanding pipeline. It will not depend on the external Understand Anything plugin at runtime.

The agent pipeline has two analysis levels:

1. `understand` — build a deterministic structural model of the repository.
2. `understand-domain` — use the structural model and source evidence to identify business domains, Stories, flows, and ordered Steps.

The viewer then converts the domain result into the Storyline visualization artifact and opens it locally.

## Command surface

The command names below are the target public interface.

| Command | Purpose | Main output |
| --- | --- | --- |
| `storyline init` | Create project configuration and data directories | `.storyline/config.json` |
| `storyline understand` | Scan files and build the structural repository graph | `.storyline/understanding.json` |
| `storyline understand-domain` | Analyze business domains and process flows | `.storyline/domain.json` |
| `storyline build` | Combine structural and domain data into the viewer artifact | `.storyline/visualization.json` |
| `storyline validate` | Validate all generated data and references | Diagnostics and exit status |
| `storyline view` | Start the local viewer server | Local URL |
| `storyline open` | Run stale checks, build data, start viewer, and open browser | Local URL |
| `storyline status` | Report freshness and generated artifact status | Human-readable status |
| `storyline clean` | Remove generated intermediate data | Recoverable project-local cleanup |

The first implementation should support `understand`, `understand-domain`, `build`, `validate`, `view`, and `open`. Add `init`, `status`, and `clean` after the end-to-end path works.

## Typical workflows

### First analysis

```bash
storyline init /path/to/repository
storyline understand /path/to/repository
storyline understand-domain /path/to/repository
storyline build /path/to/repository
storyline validate /path/to/repository
storyline open /path/to/repository
```

### One-command workflow

```bash
storyline open /path/to/repository
```

`open` should run the missing or stale stages in this order:

```text
init -> understand -> understand-domain -> build -> validate -> view
```

### Incremental workflow

```bash
storyline open /path/to/repository
```

The command compares the current Git commit and file fingerprints with `.storyline/meta.json` and `.storyline/fingerprints.json`:

- No source changes: reuse all generated data.
- Structural source changes: rerun `understand`, then `understand-domain`, then `build`.
- Only domain prompt or Storyline schema changes: reuse `understanding.json`, rerun `understand-domain` and `build`.
- Only viewer changes: reuse all data and start `view`.
- `--full`: discard caches and rerun every analysis stage.

## Shared options

Every command that accepts a repository should support:

```text
<project-root>       Repository path. Default: current directory.
--full               Ignore generated caches and rebuild.
--json               Print machine-readable output.
--quiet              Suppress progress output.
--config <path>      Use an explicit config file.
```

Analysis commands should also support:

```text
--include <glob>     Add an inclusion rule.
--exclude <glob>     Add an exclusion rule.
--max-files <n>      Bound the scan.
--model <name>       Select the analysis model.
```

Viewer commands should support:

```text
--host <address>     Default: 127.0.0.1.
--port <number>      Default: choose an available port.
--no-open            Start the server without opening a browser.
```

## `storyline init`

### Behavior

1. Resolve the repository root.
2. Create `.storyline/` and `.storyline/intermediate/`.
3. Create a default config only when one does not exist.
4. Never overwrite generated or user-owned files.

### Files

```text
.storyline/
├── config.json
├── intermediate/
└── .storylineignore
```

### Default config

```json
{
  "version": "1.0.0",
  "language": "en",
  "include": [],
  "exclude": [".git", ".storyline", "node_modules", "dist", "build", "coverage"],
  "maxSourceExcerptLines": 80,
  "maxSourceFileBytes": 200000,
  "analysis": {
    "maxStructuralFiles": 20000,
    "maxDomainStories": 50,
    "maxStepsPerStory": 30
  }
}
```

## `storyline understand`

### Purpose

Build a deterministic structural model. This stage must work without an LLM for supported languages and must be repeatable for the same source tree.

### Pipeline

```text
resolve root
  -> apply ignore rules
  -> inventory files
  -> detect languages and frameworks
  -> parse symbols, exports, imports, routes, calls, queries, and entry points
  -> assign stable IDs
  -> write structural graph and fingerprints
```

### Outputs

```text
.storyline/
├── understanding.json
├── fingerprints.json
├── meta.json
└── intermediate/
    ├── file-inventory.json
    ├── file-evidence.jsonl
    └── structural-batches/
```

`understanding.json` should contain files, symbols, relationships, entry points, detected project metadata, and bounded source locations. It should not contain business Stories.

### Required structural entities

- File
- Module
- Function
- Class
- Route or command entry point
- Database table or schema
- External service boundary
- Import, call, contains, reads, writes, triggers, and depends-on relationships

### Acceptance criteria

- Stable output for unchanged input.
- Repository-relative POSIX paths only.
- No source file is read outside the project root.
- Unsupported files are recorded as resources instead of causing failure.
- One failed parser does not discard the rest of the repository.
- Every symbol and relationship has source evidence.

## `storyline understand-domain`

### Purpose

Translate structural evidence into a conservative business model. This is the LLM-assisted stage. It must describe behavior supported by the repository and mark reconstruction uncertainty.

### Inputs

- `.storyline/understanding.json`
- `.storyline/config.json`
- Relevant bounded source excerpts from the structural evidence
- Optional previous `.storyline/domain.json` for incremental review

### Pipeline

```text
load structural graph
  -> group evidence by entry point and connected behavior
  -> dispatch bounded domain-analysis batches
  -> assemble candidate domains, Stories, flows, and Steps
  -> deduplicate and order Steps
  -> attach evidence and confidence
  -> validate and write domain.json
```

### Domain output

Write `.storyline/domain.json` with this shape:

```json
{
  "schemaVersion": "1.0.0",
  "project": { "name": "example", "analyzedAt": "2026-08-14T12:00:00Z" },
  "domains": [
    {
      "id": "domain:document-processing",
      "name": "Document processing",
      "summary": "Processes documents into structured results.",
      "status": "inferred",
      "storyIds": ["story:extract-document"],
      "evidenceIds": ["evidence:route-documents"]
    }
  ],
  "stories": [
    {
      "id": "story:extract-document",
      "domainId": "domain:document-processing",
      "title": "Extract document",
      "summary": "Extract structured information from a document.",
      "status": "inferred",
      "pathIds": ["path:extract-document:default"]
    }
  ],
  "paths": [
    {
      "id": "path:extract-document:default",
      "storyId": "story:extract-document",
      "stepIds": ["step:extract-document:submit", "step:extract-document:parse"]
    }
  ],
  "steps": [
    {
      "id": "step:extract-document:submit",
      "pathId": "path:extract-document:default",
      "order": 1,
      "kind": "event",
      "title": "Document submitted",
      "summary": "Accept the document for processing.",
      "status": "confirmed",
      "evidenceIds": ["evidence:route-documents"]
    }
  ],
  "evidence": [],
  "diagnostics": []
}
```

### Domain rules

- Prefer 2–6 domains and 2–5 Stories per domain.
- Prefer 3–8 Steps per Story Path.
- Create a Story only when the code shows a user or system goal.
- Use `event`, `action`, `decision`, and `outcome` for Step kinds.
- Keep Story progression separate from technical dependencies.
- Use `confirmed` for direct evidence, `inferred` for supported reconstruction, and `uncertain` for incomplete evidence.
- Do not invent business behavior, files, routes, functions, or schemas.
- Every Story, Path, and Step must resolve to source evidence or emit a diagnostic.

## `storyline build`

### Purpose

Convert `.storyline/understanding.json` and `.storyline/domain.json` into `.storyline/visualization.json`, the only file the viewer consumes.

### Responsibilities

- Map domain objects to the Storyline artifact schema.
- Join Steps to structural implementations and Calls.
- Create input/output schemas when supported by types, validation, or API contracts.
- Copy only bounded source evidence needed by the viewer.
- Generate stable IDs and explicit ordering.
- Reject dangling references and unsafe paths.
- Preserve diagnostics instead of hiding uncertainty.

## `storyline validate`

Validate, in order:

1. JSON shape and schema version.
2. Unique IDs.
3. All references.
4. Story → Path → Step hierarchy.
5. Step kinds and ordering.
6. Evidence status and source paths.
7. Source allowlist and size limits.
8. Viewer compatibility.

Exit codes:

```text
0  valid
1  validation errors
2  command or configuration error
```

## `storyline view`

### Behavior

1. Load `.storyline/visualization.json`.
2. Validate it before serving.
3. Bind to `127.0.0.1` by default.
4. Select an available port.
5. Generate a random access token.
6. Serve the prebuilt redesign frontend.
7. Serve the artifact through a token-protected endpoint.
8. Serve source previews only for referenced evidence IDs.

Expected endpoints:

```text
GET /                         viewer app
GET /api/artifact?token=...  validated visualization artifact
GET /api/source/:id?token=... bounded source preview
GET /api/health               local health check
```

## `storyline open`

`open` is the user-facing command. It should be safe to run repeatedly.

```text
resolve -> status -> understand if stale -> understand-domain if stale
  -> build -> validate -> view -> open browser
```

If analysis fails, do not open a partial artifact. Print the failing stage, preserve intermediate files, and give the exact command needed to retry that stage.

## Agent contract

The agent receives a command-specific task. It must write files only under `.storyline/` and return a short machine-readable summary.

```json
{
  "command": "understand-domain",
  "status": "success",
  "output": ".storyline/domain.json",
  "counts": { "domains": 2, "stories": 4, "steps": 21 },
  "warnings": []
}
```

The agent must not return frontend code. The CLI owns validation, persistence, and process control.

## Implementation order

1. Extract the current structural scanner into `packages/analyzer`.
2. Add `understanding.json` schema and fingerprints.
3. Add the domain-analysis prompt and `domain.json` schema.
4. Add `understand` and `understand-domain` CLI commands.
5. Update `build` to consume Storyline-owned files instead of `.ua` files.
6. Implement dynamic artifact loading in the viewer.
7. Implement `view` and `open` with the local server.
8. Add incremental status and full rebuild behavior.

## First command milestone

The first complete milestone is:

```bash
storyline understand ./fixture-repository
storyline understand-domain ./fixture-repository
storyline build ./fixture-repository
storyline validate ./fixture-repository
storyline open ./fixture-repository --no-open
```

It must produce valid data and a local viewer without any `.ua` files or external Understand Anything installation.
