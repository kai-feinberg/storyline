# Storyline

Storyline helps people see the story behind the code. It turns source code into understandable product stories that connect an intended outcome to the steps and implementation that produce it.

The primary visualization is a **Story**: a meaningful product flow such as signing in, completing a payment, extracting information from a document, or searching for a result. Data structures, services, dependencies, and source details support the Story instead of becoming the main experience.

## What we want to accomplish

We want to make unfamiliar codebases easier to understand by helping a reader:

- Understand the purpose and outcome of a Story first.
- Follow the smallest useful sequence of Steps without starting at the system or data level.
- Expand a Step locally without losing the original Story.
- Distinguish Story progression from data dependencies and implementation calls.
- Inspect meaningful inputs, outputs, branches, and external boundaries.
- Trace each Step back to functions, files, services, APIs, and queries when needed.

The guiding principle is: **show what the product accomplishes, then reveal the implementation when more detail is useful.**

## Core model

Storyline uses three clear levels:

1. **Story:** The complete product flow and intended outcome.
2. **Step:** One meaningful event, action, decision, or outcome within the Story.
3. **Implementation:** The code and systems that perform or support a Step.

A Story should normally contain about 3–7 meaningful Steps. Group work only when the group produces a recognizable outcome. Show dependencies as supporting context unless they are part of the Story progression.

## Example

```text
Story: Confirm a completed payment

Payment completed
→ Prepare payment confirmation
→ Send payment confirmation
→ Confirmation sent
```

Expanding a Step reveals its Implementation:

```text
Prepare payment confirmation
├ collectPurchaseDetails()
├ formatConfirmation()
└ queueMessage()
```

Selecting a Step can reveal its inputs, outputs, branches, external systems, and source location without replacing the Story.

## Start here

Read [How Storyline Works](docs/how-storyline-works.md) for the repository layout, command flow, generated files, agent review step, viewer server, and current limitations.

The agent method for selecting and shaping Stories is in the [Storyline Guidelines](plugins/storyline/skills/storyline-generate/references/storyline-guidelines.md). The canonical product terms are in the [Storyline Ubiquitous Language](docs/product/ubiquitous-language.md).

## Visualization priorities

1. **Stories** provide purpose, context, and the complete flow.
2. **Steps** explain the meaningful progression through a Story.
3. **Implementation** connects each Step to code, systems, and source evidence.

The current viewer also provides Data flow and Search modes. Data flow shows supporting Story relationships and named data objects as they change across Steps. Search finds Stories, Steps, and source evidence from one keyboard-accessible command. The active design follow-up list is in [Storyline follow-up](docs/planning/storyline-follow-up.md).

## Current priorities

- Define a reliable model for Stories, Steps, metadata, and Implementation evidence.
- Build an analyzer that reconstructs product intent before it chooses labels or grouping.
- Identify product Stories and connect their Steps to the code paths that implement them.
- Generate clear Step labels with consistent grammar.
- Support independent disclosure of dependencies, branches, and Implementation.
- Add quality checks for comprehension, grouping, abstraction level, arrow meaning, uncertainty, and evidence grounding.
- Test the approach against representative Stories such as payments, document extraction, search, renewals, and authentication.

## Non-goals

This project is not intended to make a data model, system architecture diagram, or complete call graph the primary experience. It is also not intended to expose every local variable or replace source code with a simplified diagram. Storyline should remain human-centered, useful, traceable, and honest about uncertainty.

## Status

The installable implementation lives in [`plugins/storyline`](plugins/storyline). It includes one end-to-end orchestration skill, two specialist skills, artifact validation, tests, and a bundled local viewer. Agents perform repository understanding and artifact generation directly from source.

For normal use, give the agent one request:

```text
Use Storyline to create and open a visualization of this repository.
```

This invokes `$storyline-create`, which initializes the workspace, runs understanding and generation as needed, validates the artifact, and opens the viewer.

Use the specialist skills only when you want manual control over one phase:

```text
$storyline-understand
$storyline-generate
```

You can also open an existing validated artifact directly:

```bash
node plugins/storyline/scripts/storyline.mjs open examples/storysketch
```

## Viewer development

The editable viewer source is in `prototypes/redesign-viewer/`. The plugin runs the compiled copy in `plugins/storyline/assets/viewer/`.

Start Vite while changing the interface:

```bash
pnpm --dir prototypes/redesign-viewer dev
```

The prototype dev server serves the checked-in example artifact at `/api/artifact`. Viewer state is shareable through URL parameters for the active view, Story, selected Step, optional quick context, and focused detail modal.

After a UI change, rebuild and publish the viewer into the plugin:

```bash
pnpm --dir plugins/storyline build:viewer
node --test plugins/storyline/tests/*.test.mjs
```

The build command replaces old hashed assets. Commit the prototype source and the rebuilt plugin assets together.
