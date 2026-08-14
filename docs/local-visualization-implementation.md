# Local Visualization Implementation

## Goal

Let a developer point an analysis agent at a repository, generate a Storyline visualization artifact inside that repository, and open the visualization in a reusable local frontend.

The implementation should keep analysis, persisted data, and rendering separate. The stable seam between them is a versioned, declarative Storyline artifact—not generated frontend code.

## User experience

The initial command flow should be:

```bash
pnpm dlx @storyline/cli analyze /path/to/project
pnpm dlx @storyline/cli view /path/to/project
```

Once both paths work reliably, add the convenience command:

```bash
pnpm dlx @storyline/cli open /path/to/project
```

`open` checks whether the visualization is missing or stale, runs analysis when necessary, starts a loopback-only server, and opens a tokenized localhost URL.

## Architecture

Use three deep Modules with one narrow artifact seam:

```text
Repository
  -> Analyzer Module
  -> Artifact Module
  -> .storyline/visualization.json
  -> Viewer Module
  -> localhost frontend
```

### Analyzer Module

The Analyzer Module owns repository discovery and semantic analysis. Its implementation should:

1. Scan files, manifests, routes, symbols, imports, calls, queries, and runtime entry points deterministically.
2. Divide the evidence into bounded batches.
3. Ask analysis agents to identify Stories and trace each Step to its Implementation evidence.
4. Preserve intermediate results so failed or incremental runs do not repeat all work.

Static analysis establishes what the code contains. Agents establish what it accomplishes. Agents should not own filesystem traversal, stable identifier generation, path sanitization, or reference integrity.

### Artifact Module

The Artifact Module is the authoritative seam between analysis and presentation. It owns:

- Runtime and JSON Schema validation.
- Stable identifiers.
- Repository-relative Source Evidence paths.
- Story Path ordering and reference integrity.
- Schema migrations and compatibility checks.
- Confidence and diagnostic reporting.
- Atomic writes of the final artifact.

Its public interface should accept untrusted analysis output and either return a valid Storyline artifact or structured diagnostics. The viewer must never render raw agent output.

### Viewer Module

The Viewer Module is a separately versioned, prebuilt frontend and a small read-only local server. It should:

- Locate `.storyline/visualization.json` from a project root.
- Validate the artifact before serving it.
- Bind to `127.0.0.1`, never all network interfaces by default.
- Select an available local port.
- Generate a random access token and require it on data endpoints.
- Open the tokenized URL in the default browser.
- Serve only source files explicitly referenced by the artifact.
- Reject absolute paths, traversal, binary files, and oversized previews.

The Viewer Module should be packaged with its compiled frontend. Users should not need to clone Storyline, install the frontend workspace, or run a Vite development server.

## Project-local files

Store analysis state in a hidden directory:

```text
.storyline/
├── config.json
├── visualization.json
├── meta.json
├── fingerprints.json
├── intermediate/
└── .storylineignore
```

| File | Ownership | Purpose |
| --- | --- | --- |
| `config.json` | User/tool | Language, exclusions, entry-point hints, and analysis preferences |
| `visualization.json` | Artifact Module | Validated Product Stories and Source Evidence consumed by the viewer |
| `meta.json` | Artifact Module | Analyzer version, schema version, Git commit, timestamp, and analysis status |
| `fingerprints.json` | Analyzer Module | Per-file state for incremental analysis |
| `intermediate/` | Analyzer Module | Deterministic scan results and cacheable agent outputs |
| `.storylineignore` | User/tool | Repository-specific exclusions |

Configuration is an input and the visualization is an output. They should not be combined.

## Visualization artifact

The artifact should encode Storyline's domain directly rather than expose a generic graph as its primary interface.

```json
{
  "schemaVersion": "1.0.0",
  "project": {
    "name": "example",
    "analyzedAt": "2026-08-10T12:00:00Z",
    "gitCommit": "abc123"
  },
  "stories": [],
  "storyPaths": [],
  "steps": [],
  "implementations": [],
  "sourceEvidence": [],
  "diagnostics": []
}
```

The first schema version should enforce these invariants:

- A Story contains one or more Story Paths.
- A Story Path contains an explicit ordered list of Steps.
- Every Step is exactly one Event, Action, Decision, or Outcome.
- A Step can reference one Implementation.
- An Implementation can contain ordered Implementation Calls.
- Every product or domain claim can reference Source Evidence.
- Source paths are relative to the analyzed repository.
- Every reference resolves to an existing identifier.
- Story progression is distinct from Dependencies.
- Evidence status is explicit: `confirmed`, `inferred`, or `uncertain`.
- The artifact contains data only and cannot include executable JavaScript or JSX.

Keep generated summaries and larger source excerpts out of the core objects when they make the artifact unwieldy. The schema can later support chunked files under `.storyline/data/`, but the first implementation should prefer one portable file.

## Analysis pipeline

Implement the first complete pipeline in this order:

1. **Resolve project** — Validate the project root, Git root, data directory, and ignore rules.
2. **Scan** — Produce a deterministic inventory of source and supporting files.
3. **Extract evidence** — Collect symbols, imports, routes, calls, queries, and source locations.
4. **Analyze stories** — Dispatch evidence-aware batches to agents using schema-constrained output.
5. **Assemble** — Combine batch results into Product Stories and deduplicate shared concepts.
6. **Normalize** — Assign identifiers, sanitize paths, repair safe omissions, and reject invalid references.
7. **Validate** — Run structural and Storyline-specific semantic checks.
8. **Persist** — Atomically write the artifact, metadata, and fingerprints.
9. **Open** — Launch the Viewer Module only when the artifact passes validation.

Persist enough intermediate data for a later run to analyze only files changed since the recorded Git commit. A `--full` option should force complete rebuilding.

## Suggested package layout

Convert the repository to a pnpm workspace as implementation begins:

```text
apps/
└── viewer/                 # Current Storyline React frontend
packages/
├── schema/                 # Types, Zod schemas, JSON Schema, migrations
├── analyzer-core/          # Scanning, evidence extraction, fingerprints
├── artifact/               # Normalization, validation, persistence
├── local-server/           # Token-gated localhost server and source reads
└── cli/                    # analyze, view, open, validate commands
skills/
└── storyline/              # Agent orchestration instructions and prompts
```

The `schema` package should have no dependency on React or the analysis-agent runtime. Both the Artifact Module and Viewer Module should consume it, making the artifact interface the shared test surface.

## Validation and testing

Prioritize contract tests over implementation-detail tests:

- Golden valid and invalid `visualization.json` fixtures.
- Agent-output normalization tests.
- Missing and dangling identifier tests.
- Story Path ordering and Event/Action/Decision/Outcome invariant tests.
- Absolute-path and traversal rejection tests.
- Local-server token tests.
- Source-file allowlist and size-limit tests.
- Schema-version compatibility tests.
- Incremental analysis tests using changed Git commits.
- One end-to-end fixture that analyzes StorySketch and opens the viewer.

The main acceptance test is:

> Given a repository without Storyline source code installed, an agent can generate a valid `.storyline/visualization.json`, and `pnpm dlx @storyline/cli view <repo>` opens the Stories with working Source Traces.

## Delivery phases

### Phase 1: Artifact and fixture

- Define schema version `1.0.0` in `packages/schema`.
- Hand-author a StorySketch visualization fixture using the stories already identified in the analysis audit.
- Replace hardcoded arrays in the redesign frontend with data loaded through the schema package.
- Add validation and render the fixture locally.

### Phase 2: Standalone viewer

- Build and embed the frontend in the Viewer Module.
- Implement loopback binding, port selection, access tokens, and safe source previews.
- Add `storyline view` and `storyline validate`.
- Verify that the packed viewer works from an unrelated repository.

### Phase 3: Analysis prototype

- Implement deterministic repository scanning and evidence extraction.
- Create the Storyline analysis skill and schema-constrained agent prompts.
- Add normalization, diagnostics, and `storyline analyze`.
- Use StorySketch as the first end-to-end target.

### Phase 4: Incremental workflow

- Add Git metadata and fingerprints.
- Reanalyze only changed evidence where possible.
- Add `storyline open`, `--full`, ignore configuration, and stale-artifact messaging.

## First implementation slice

Start with Phase 1 and do not begin with the full analyzer. A hand-authored, schema-valid StorySketch artifact will force the domain model and viewer interface to become concrete before agent orchestration adds variability.

The first pull request should contain:

1. `packages/schema` with the initial types and validators.
2. A `.storyline/visualization.json` fixture for StorySketch.
3. A small data-loading Adapter in the redesign frontend.
4. Removal of the frontend's hardcoded Story data.
5. Contract tests proving the fixture is valid and renderable.

Once this slice works, the same artifact can be produced by a hand-authored fixture, a test generator, and an analysis agent. Those multiple adapters make the artifact seam real and confirm that the interface provides useful leverage.
