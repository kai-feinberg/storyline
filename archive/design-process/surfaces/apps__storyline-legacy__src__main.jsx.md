---
version: 1
slug: "apps__storyline-legacy__src__main.jsx"
primary_target: "apps/storyline-legacy/src/main.jsx"
related_targets: ["apps/storyline-legacy/src/styles.css"]
---

# Surface brief — Core flow workspace

## Job and audience

- **Mode:** Operate.
- **Audience:** Developers opening an unfamiliar codebase.
- **Job:** Start from a meaningful product flow and build a dependable mental model of how the codebase behaves, without being dropped into implementation detail or a generic dependency graph.

## Outcome and proof

- The primary outcome is comprehension: a developer can articulate the story’s main path, the business behaviors that make it work, and where to inspect evidence next.
- The flow remains the canonical reading order; evidence, systems, inputs, outputs, branches, and source locations progressively clarify it.

## Selected direction

- Replace the incumbent visual world with a light **Approach Plate** system: cloud-white chart stock, deep navy structure, teal route lines, restrained orange markers, and distinct humanist sans plus compact mono labels.
- Use a stable left rail for story wayfinding and one dominant vertical route strip as the focal surface. The selected behavior opens locally into operations and evidence without breaking the full reading path.
- Approved composition: `.impeccable/mocks/route-strip.png`.

## Scope and boundaries

- Build the redesign as an independent Vite + React app at `apps/storyline-redesign`, while preserving the current app at `apps/storyline-legacy`.
- Scope the core workspace at production-screen fidelity, including the story flow, behavior focus, search entry point, and their essential feedback states.
- Preserve the product’s flow-first model. Do not turn this surface into a system architecture diagram, a raw call graph, a code editor, or a dashboard that prioritizes counts over comprehension.

## States and ranges

- Support a concise default path of roughly 3–7 meaningful steps; longer flows should retain scanability through grouping and progressive disclosure.
- Essential states: no analyzed stories, a selected behavior, expanded and collapsed operations, and no semantic search result.

## Interaction and layout

- Treat every story step as a clear, sequential reading unit with a visible semantic role: event, behavior, or outcome.
- Keep dependencies as supporting context rather than arrows that compete with story progression.
- On narrow screens, preserve the active story and selected behavior while collapsing secondary navigation and presenting detail below the flow.
- Keyboard traversal, discernible focus, and non-color semantic cues are required for all selection, expansion, and search interactions.

## Open decisions

- Accessibility target is not yet specified; implementations must avoid inventing one.
