# How Storyline Works

## The model

Storyline uses agents for both repository understanding and visualization design.

```text
repository source
  -> storyline-create orchestration skill
  -> initialize .storyline workspace
  -> storyline-understand specialist skill
  -> .storyline/understanding.json
  -> storyline-generate specialist skill
  -> .storyline/visualization.json
  -> deterministic validation
  -> tokenized local viewer
```

There is no deterministic source scanner, route classifier, domain generator, or Story generator. Agents decide how to explore the repository and how to represent its behavior.

Deterministic code remains only at the safety boundary:

- Validate artifact structure and references.
- Reject unsafe source paths.
- Start the loopback-only viewer.
- Protect artifact access with a random token.

## Repository layout

```text
plugins/storyline/
├── .codex-plugin/plugin.json
├── skills/
│   ├── storyline-understand/
│   ├── storyline-generate/
│   └── storyline-create/
├── scripts/
│   ├── artifact.mjs
│   └── storyline.mjs
├── assets/viewer/index.html
└── tests/artifact.test.mjs

examples/storysketch/          end-to-end example repository
prototypes/redesign-viewer/   richer viewer design reference
archive/                       inactive history
```

## Default end-to-end flow: `storyline-create`

For normal use, ask the agent to use Storyline to create a visualization. The `storyline-create` skill owns the complete workflow:

1. Resolve the repository root and inspect existing Storyline files.
2. Initialize `.storyline/` when needed.
3. Run `storyline-understand` when the understanding is missing or stale.
4. Run `storyline-generate` from the current understanding and source evidence.
5. Validate the generated artifact and repair structural errors.
6. Open the artifact in the bundled local viewer.

Example request:

```text
Use Storyline to create and open a visualization of this repository.
```

An explicit skill request is also supported:

```text
Use $storyline-create for this repository.
```

The agent should complete the full flow without asking the user to invoke the two specialist skills. Use the specialist skills directly only when reviewing or repeating one phase.

## Specialist skill 1: `storyline-understand`

The understanding skill tells the agent how to explore an unfamiliar repository comprehensively.

The agent:

1. Reads project instructions, manifests, documentation, and workspace configuration.
2. Inventories relevant files with repository tools.
3. Identifies applications, frameworks, entry points, persistence, external systems, authentication, and background work.
4. Forms hypotheses about the product and its important behaviors.
5. Traces those behaviors across routes, handlers, services, calls, queries, state changes, and outputs.
6. Separates observed facts from interpretation.
7. Records exact source evidence and uncertainty.
8. Writes `.storyline/understanding.json`.

The skill is at [Storyline Understand](../plugins/storyline/skills/storyline-understand/SKILL.md). Its detailed output contract is in [Understanding Contract](../plugins/storyline/skills/storyline-understand/references/understanding-contract.md).

### What the understanding contains

The understanding describes:

- Product purpose.
- Architecture and major components.
- Domain concepts and business rules.
- Runtime entry points.
- Important end-to-end behaviors.
- Stages, inputs, outputs, state changes, and external boundaries.
- Alternate paths and failure modes.
- Evidence for important claims.
- Unknown or uncertain areas.

It does not contain the final visualization. It is a reusable explanation of the repository for the generation agent.

## Specialist skill 2: `storyline-generate`

The generation skill turns the repository understanding into the final viewer artifact.

The agent:

1. Reads `.storyline/understanding.json`.
2. Returns to source files when evidence is incomplete or ambiguous.
3. Selects the behaviors that best explain the product.
4. Groups behavior into business Domains and product Stories.
5. Defines ordered Story Paths and meaningful Steps.
6. Connects Steps to Implementations, Calls, schemas, and source evidence.
7. Preserves uncertainty and omits unsupported detail.
8. Writes `.storyline/visualization.json`.
9. Runs the deterministic artifact validator and fixes errors.

The skill is at [Storyline Generate](../plugins/storyline/skills/storyline-generate/SKILL.md). Its method is in [Storyline Guidelines](../plugins/storyline/skills/storyline-generate/references/storyline-guidelines.md), its machine contract is in [Artifact Schema](../plugins/storyline/skills/storyline-generate/references/artifact.schema.json), and field notes are in [Artifact Contract](../plugins/storyline/skills/storyline-generate/references/artifact-contract.md).

### Selection principles

The generator does not make every route a Story. It chooses meaningful user or system goals.

A good Story:

- Has a clear trigger and outcome.
- Explains why the behavior matters.
- Usually contains 3–8 meaningful Steps.
- Keeps low-level implementation behind the Step.
- Distinguishes progression from dependencies.
- Is traceable to source evidence.

## Generated files

The two skills write:

```text
<repository>/.storyline/
├── README.md
├── understanding.json
└── visualization.json
```

Both files are agent-created. They can be reviewed and edited directly.

### `understanding.json`

This is the handoff between the two skills. It is intentionally richer than the visualization and may include behaviors that the generator later decides not to show.

### `visualization.json`

This is the viewer contract. It contains:

- Domains.
- Stories.
- Story Paths.
- Steps.
- Implementations.
- Calls.
- Input and output schemas.
- Source evidence.
- Supporting relationships.
- Optional named data flows with stage-level Step and schema references.
- Diagnostics.

The viewer reads only this file.

The current viewer exposes the artifact in three complementary modes:

- **Story:** the ordered Story Path, with Step selection and progressive Implementation disclosure.
- **Data flow:** supporting relationships between Stories and named data objects as they are created, updated, branched, and completed across Steps.
- **Search:** a repository-wide search across Stories, Steps, and Source Evidence.

The Story view is intentionally minimal on first load. Clicking anywhere on a Step expands or collapses its local detail without changing the page layout. Compact change pills sit below the Step description and provide detail on hover. The expansion combines each Input or Output boundary with its schema. Plain-language pseudocode explains the broad logic. A focused modal opens on Implementation and provides a separate Schema tab for full before-and-after inspection. Data Flow focuses on object histories, and artifact diagnostics stay in the global artifact-health control.

The viewer preserves the active view, Story, selected Step, quick-context visibility, and focused Step in the URL. It uses history replacement so normal browsing does not create a new browser-history entry for every selection.

Expanded Steps include Input and Output schemas when they are available. Schema fields may reference a reusable object schema through an explicit `schemaId`; the viewer never infers this link from a type name alone. Data-object lifecycles also expose the initial schema and a structural diff at later stages. A Step may include optional `schemaChanges` entries for evidence-backed field mappings. When those entries are absent, the viewer derives a limited name-and-type comparison from the available schemas. Exact field lineage, consumption, and renaming are not implied unless the artifact records them.

## CLI commands

The CLI no longer analyzes source code. It manages the safe runtime boundary.

```bash
node plugins/storyline/scripts/storyline.mjs <command> <project-root>
```

### `init`

Creates the `.storyline/` workspace and its local README. Both skills put all generated Storyline data in this directory:

```bash
node plugins/storyline/scripts/storyline.mjs init examples/storysketch
```

The skills can also create the directory themselves.

### `validate`

Validates an agent-generated visualization:

```bash
node plugins/storyline/scripts/storyline.mjs validate examples/storysketch
```

It checks:

- Schema and artifact versions.
- Required collections.
- Unique IDs.
- Domain, Story, Path, Step, Implementation, Call, schema, and evidence references.
- Step kinds and ordering.
- Story and Path completeness.
- Source line ranges.
- Repository-relative source paths.

Validation does not decide whether an interpretation is good. That remains the agent’s responsibility.

### `view` and `open`

Both commands validate the existing artifact and start the viewer:

```bash
node plugins/storyline/scripts/storyline.mjs open examples/storysketch
```

Options:

```text
--no-open    Start the server without opening the system browser.
--port 4317  Request a local port.
```

The command prints a tokenized URL such as:

```text
http://127.0.0.1:4317/?token=<random-token>
```

Do not open `assets/viewer/index.html` directly. It requires the server’s `/api/artifact` endpoint.

### `status`

Reports whether the two agent outputs exist:

```bash
node plugins/storyline/scripts/storyline.mjs status examples/storysketch
```

## Complete agent workflow

When the plugin is installed, ask Codex:

```text
Use $storyline-understand to understand this repository.
Then use $storyline-generate to generate and open its Storyline visualization.
```

The agent should run the skills in that order. The generation skill may inspect source again, so the understanding is a strong handoff rather than a hard information boundary.

## Viewer security

The remaining deterministic server:

- Binds to `127.0.0.1`.
- Generates a new random token for each run.
- Requires the token for artifact access.
- Returns `403` without a valid token.
- Serves only the bundled viewer and validated in-memory artifact.

It does not expose the whole repository or run generated code.

## Testing

Run validator tests:

```bash
pnpm --dir plugins/storyline test
```

Validate the StorySketch artifact:

```bash
node plugins/storyline/scripts/storyline.mjs validate examples/storysketch
```

Start its viewer without opening the system browser:

```bash
node plugins/storyline/scripts/storyline.mjs view examples/storysketch --no-open --port 4317
```

## Current limitations

- Skill quality depends on the agent exploring enough source evidence.
- Large repositories may require staged exploration or several focused agent passes.
- The JSON validator checks integrity, not semantic truth.
- There is not yet an automated freshness check for source changes.
- The bundled viewer does not yet expose all Implementation, Call, schema, and source-preview detail supported by the artifact.
