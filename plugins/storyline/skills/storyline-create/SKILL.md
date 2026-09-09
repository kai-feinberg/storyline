---
name: storyline-create
description: Create and open a complete Storyline visualization from a local source repository with minimal user intervention. Use when Codex is asked to “use Storyline,” create a Storyline visualization, explain a repository as product Stories, run the full Storyline workflow, refresh an existing Storyline artifact, or initialize, understand, generate, validate, and view Storyline output end to end.
---

# Storyline Create

Run the complete Storyline workflow. Coordinate the specialist skills instead of replacing their instructions.

## Required result

Produce these files under the target repository:

```text
.storyline/
├── README.md
├── understanding.json
└── visualization.json
```

Validate `visualization.json`, then open it in the bundled Storyline viewer unless the user asks not to open it.

## Resolve paths

1. Resolve the target repository root from the user’s request or current workspace.
2. Resolve `<plugin-root>` as the `plugins/storyline` directory that contains this skill, its sibling skills, `scripts/storyline.mjs`, and the bundled viewer.
3. Keep all generated analysis in `<repository-root>/.storyline/`.

Do not write generated Storyline data elsewhere in the repository.

## Run the workflow

### 1. Inspect existing state

Check for `.storyline/understanding.json` and `.storyline/visualization.json`.

When `visualization.json` exists, run `node <plugin-root>/scripts/storyline.mjs validate <repository-root>` before deciding to reuse or open it. Validation compares `metadata.sourceFingerprint` with the current repository source. Treat a fingerprint mismatch as stale; regenerate the visualization, stamp it, and validate it again.

- Start from a fresh understanding when it is missing, invalid, clearly stale, or the user requests a refresh.
- Reuse an existing understanding when it is evidence-backed, relevant to the current source, and the request only needs artifact regeneration.
- Reuse an existing visualization only when the user asks to open or inspect it without regeneration.
- If freshness cannot be established safely, refresh the understanding.

Do not ask the user to choose between these routine cases. Inspect the files and source state, then use judgment.

### 2. Initialize the workspace

When `.storyline/` does not exist, run:

```bash
node <plugin-root>/scripts/storyline.mjs init <repository-root>
```

Do not overwrite valid existing artifacts during initialization.

### 3. Understand the repository

When a new or refreshed understanding is required:

1. Read `../storyline-understand/SKILL.md` completely.
2. Read every reference that skill requires.
3. Follow that skill’s workflow against `<repository-root>`.
4. Write and verify `<repository-root>/.storyline/understanding.json`.

Do not reduce this phase to a file inventory or route list. Trace important product behaviors and their source evidence.

### 4. Generate the visualization

When a new or refreshed visualization is required:

1. Read `../storyline-generate/SKILL.md` completely.
2. Read its required references in the stated order, including all correct JSON examples.
3. Follow that skill’s workflow using the current understanding and source evidence.
4. Write `<repository-root>/.storyline/visualization.json` atomically.

Do not generate directly from folder names, route names, or call graphs. Preserve the Story → Step → Implementation hierarchy and canonical language.

### 5. Validate and repair

Stamp the completed artifact, then validate it:

```bash
node <plugin-root>/scripts/storyline.mjs stamp <repository-root>
node <plugin-root>/scripts/storyline.mjs validate <repository-root>
```

If validation fails, inspect the artifact, fix every error, stamp it again, and validate again. Do not open an invalid or stale artifact.

Also perform the editorial checks required by `storyline-generate`. Structural validity does not prove that the Stories are understandable or accurate.

### 6. Open the visualization

Unless the user asks for files only, run:

```bash
node <plugin-root>/scripts/storyline.mjs open <repository-root>
```

Keep the viewer process running and give the user the opened visualization. Use the local viewer only; do not publish or upload repository data.

## Recovery behavior

- If understanding fails for one area, record the uncertainty and continue with supported behavior when a useful artifact is still possible.
- If no complete behavior can be supported, stop before generation and explain the missing evidence.
- If generation exposes an understanding gap, return to source, update `understanding.json`, then regenerate.
- If the viewer cannot start, keep the validated artifact and report the runtime error with the command needed to retry.
- Never invent source evidence to complete the flow.

## Completion report

Report:

- Whether the understanding was created, refreshed, or reused.
- The number of Domains, Stories, and Steps generated.
- Validation status and important Diagnostics.
- The recorded visualization update time, Git commit and dirty state, and whether the source fingerprint is current.
- The paths to both JSON files.
- Whether the viewer opened successfully.

Do not require the user to invoke `storyline-understand` and `storyline-generate` separately unless they ask for manual control.
