---
name: storyline-generate
description: Turn `.storyline/understanding.json` and repository source evidence into a validated `.storyline/visualization.json`. Use when an agent must select product behaviors as Stories, break user or system flows into plain-language Steps, apply Storyline vocabulary, attach Implementation traces, follow the supplied JSON Schema and correct examples, validate an artifact, or improve an existing Storyline visualization.
---

# Storyline Generate

Create the clearest truthful Visualization Artifact. Use agent judgment for Story selection, boundaries, grouping, naming, sequencing, and evidence. Do not derive Stories mechanically from routes or call graphs.

## Read first

Read these references completely and in this order:

1. [storyline-guidelines.md](references/storyline-guidelines.md) — goal, discovery-to-Story method, grouping rules, and quality tests.
2. [ubiquitous-language.md](references/ubiquitous-language.md) — required terms, label grammar, and verb distinctions.
3. [artifact.schema.json](references/artifact.schema.json) — machine-readable output contract.
4. Every file in [examples](references/examples/) — correct filled artifacts that show expected editorial choices.

Use [artifact-contract.md](references/artifact-contract.md) only as a field-level companion when the JSON Schema needs explanation.

## Workflow

1. Resolve the Storyline bundle root. In Claude Code, `${CLAUDE_PLUGIN_ROOT}` is the bundle root. In Codex, use the installed Storyline plugin directory. Read `<root>/.storyline/understanding.json` completely.
2. Inspect relevant source and product documents when evidence is incomplete, ambiguous, or too technical.
3. Write a short internal product model and list candidate Stories with actor, trigger, outcome, main object, and evidence.
4. Select distinct, useful product behaviors. Merge technical fragments and reject incomplete or unsupported candidates.
5. Define each Story boundary and its dominant successful Story Path.
6. Break the path into plain-language Events, Actions, Decisions, and Outcomes at a consistent abstraction level.
7. Add alternate Story Paths only when they materially change progression or outcome.
8. Attach Step Inputs, Step Outputs, Execution Contexts, Implementations, Implementation Calls, boundaries, and Source Evidence.
9. Apply the canonical vocabulary and compare the result with the supplied examples.
10. Review the artifact with every quality check in the guidelines.
11. Write `<root>/.storyline/visualization.json` atomically.
12. Run `node <plugin-root>/scripts/storyline.mjs stamp <root>` to record the current source fingerprint and Git provenance.
13. Run `node <plugin-root>/scripts/storyline.mjs validate <root>`. Fix every error and rerun it. Stamp the artifact again after any repair.

The stamp command maintains `metadata`. Do not manually invent its source fingerprint or Git values. Do not change the metadata when the artifact is only opened or validated.

Do not report generation as complete until validation confirms that `metadata.sourceFingerprint` matches the current repository source.

## Hard rules

- Keep Story and Step text understandable to a product designer or domain expert.
- Keep framework, storage, and symbol detail at the Implementation level.
- Keep Story progression separate from dependencies and call order.
- Support every semantic claim with checked Source Evidence.
- Preserve uncertainty. Omit unsupported detail and add a Diagnostic for material gaps.
- Use stable IDs and repository-relative POSIX source paths.
- Do not include secrets, large excerpts, executable code, JSX, HTML, or presentation instructions.
- Do not optimize for a fixed number of Stories or Steps.

## Completion standard

Finish when a reader can choose a product goal, follow its meaningful progression in plain language, inspect how each Step works, and trace every important claim to source without losing the Story context.

When the user asks to open it, run `node <plugin-root>/scripts/storyline.mjs view <root>` after validation succeeds.
