---
name: storyline-understand
description: Explore an unfamiliar local repository and create an evidence-backed `.storyline/understanding.json` for Storyline. Use when Codex must learn a product from its code, identify actors and outcomes, trace important user or system behaviors across entry points and boundaries, establish domain vocabulary, or prepare source evidence for Storyline artifact generation.
---

# Storyline Understand

Create the evidence base for Story selection. Explore the repository directly. Do not generate the final Visualization Artifact.

Read these references completely before writing output:

1. [repository-analysis-guide.md](references/repository-analysis-guide.md) for the discovery method.
2. [understanding-contract.md](references/understanding-contract.md) for the output structure.

## Workflow

1. Resolve the repository root. Run `node <plugin-root>/scripts/storyline.mjs init <root>` when `.storyline/` does not exist.
2. Read repository instructions, product documents, READMEs, manifests, workspace configuration, and deployment configuration.
3. Inventory source files with `rg --files`. Exclude ignored, generated, vendored, dependency, build, coverage, and secret files.
4. Form an initial product model: actors, valuable outcomes, domain objects, applications, and system boundaries.
5. Find user and system entry points. Trace concrete paths through handlers, services, rules, persistence, jobs, external calls, and outputs.
6. Record candidate behaviors with their trigger, outcome, ordered stages, state changes, decisions, boundaries, and evidence.
7. Reconcile vocabulary across product text and source. Record ambiguous or conflicting terms.
8. Cover important behaviors, not every route or utility.
9. Write `<root>/.storyline/understanding.json` atomically.
10. Read it back. Check every source path, line range, evidence reference, status, and unknown.

## Investigation order

Prioritize:

1. Product purpose and actors.
2. User and system entry points.
3. End-to-end outcomes.
4. Domain concepts and business rules.
5. State transitions and persistence.
6. External boundaries and asynchronous work.
7. Material decisions, permissions, failures, and retries.
8. Shared implementation that supports several behaviors.

Do not treat a route, file, class, function, or table as a behavior without tracing its use.

## Completion standard

Finish when another agent can select product Stories, explain their triggers and outcomes, trace their main progression, apply consistent domain terms, and verify claims from the recorded evidence without restarting repository discovery.

Do not create `.storyline/visualization.json`. Use `storyline-generate` for editorial selection and artifact creation.
