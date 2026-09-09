---
target: most recent UI overhaul, high-level architecture and information design
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 5
timestamp: 2026-09-09T18-43-48Z
slug: prototypes-redesign-viewer-src-main-jsx
---
# Storyline information architecture critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2 | Local selection is clear; cross-view location is not. |
| 2 | Match with the real world | 2 | Human story language gives way too quickly to schema language. |
| 3 | User control and freedom | 2 | Moving between Story and Flow loses the exploration context. |
| 4 | Consistency and standards | 2 | Story Path and data-object stages act as competing timelines. |
| 5 | Error prevention | 1 | Derived schema differences can imply unsupported lineage. |
| 6 | Recognition rather than recall | 2 | Users must reconcile separate representations from memory. |
| 7 | Flexibility and efficiency | 2 | Search exists, but cross-cutting evidence navigation is weak. |
| 8 | Aesthetic and minimalist design | 2 | The first view is calm; expanded Steps expose too much technical structure. |
| 9 | Error recognition and recovery | 2 | Uncertainty is not attached to each important claim. |
| 10 | Help and documentation | 2 | Shortcut help exists; conceptual help for the model does not. |
| **Total** | | **19/40** | **Poor: the visual design is stronger than the information architecture.** |

## Design specificity verdict

The interface is visually authored for Storyline. The coral route, warm surfaces, and outcome-led cards support the product. The conceptual architecture is unresolved: Story, Stories, and Flow appear as peer models, although the product states that Story is primary and other technical views support it. The deterministic detector found no mechanical anti-patterns. Its zero findings do not cover conceptual loss, alternate paths, evidence navigation, or false lineage.

## Overall impression

The overhaul made one linear Story easier to read. It did not yet make a repository easier to understand as a whole. The next change should not be another visual polish pass. It should define one canonical mental model and make every other view a lens on that model.

## What works

- A Story starts with a human outcome and a short ordered route.
- Local disclosure keeps the reader near the Step that created the question.
- The artifact contains Stories, Steps, implementations, calls, schemas, relationships, and evidence. The raw model is rich enough to support a better architecture.

## Priority issues

### [P1] One product, two competing mental models

Story and Data Flow each present progression. Users must reconcile a Story Path with separate data-object stage timelines. Make the repository Story map the home. Make a selected Story the stable workspace. Present systems, data, relationships, and evidence as lenses or contextual inspectors tied to that Story.

### [P1] Alternate paths are discarded

The normalization code reads only the first `pathId`. Branches, failure paths, and alternate outcomes can therefore disappear from the overview. Make Story Paths first-class. Show the main path by default and reveal branch points and alternate outcomes in place.

### [P1] The disclosure ladder skips the semantic layer

The first Step expansion shows schemas, field differences, and pseudocode. It should first answer what happened, why it matters, what entered, what changed in domain terms, what could vary, and how certain the claim is. Raw schemas, calls, and line ranges belong one level deeper.

### [P1] Evidence is marginal instead of forming a trust loop

Important claims do not carry a compact provenance and confidence cue. Some source search results have no usable destination. Build a reverse index from evidence to Story, Path, Step, Implementation, and claim. Let users open source while the Story and selected Step remain visible.

### [P1] The technical overview is incomplete and sometimes overconfident

Systems appear mainly as labels. Boundary crossings are buried in calls. Adjacent schema snapshots are compared by field name and presented like a transformation even when exact lineage is not proven. Add an evidence-backed system/boundary lens. Describe unproven schema changes as snapshots or new outputs, not lineage.

### [P2] Cross-story exploration will not scale

A flat relationship list and stacked object timelines work for three Stories, not dozens. Add domain, system, actor, and data-object filters. Show incoming and outgoing context for the selected Story. Use a full repository map only for orientation, not as the main reading surface.

## Persona red flags

- **First-time reader:** “Story,” “Stories,” and “Flow” do not explain one stable hierarchy. “Flow” can mean Story Path, data movement, or system flow.
- **Experienced maintainer:** There is no direct pivot from a file or function to the exact supported Step, and no system ownership overview.
- **Architect or technical lead:** Alternate paths and boundary crossings are incomplete, while derived schema deltas can look more certain than the evidence supports.

## Questions

- If Data Flow were not a top-level tab, which essential question would become impossible to answer?
- Is schema change truly the next question after a Step summary, or is it only the easiest technical object to render?
- What one persistent frame must remain visible from repository overview down to a source line?

## Recommended direction

Use one canonical spine: Repository purpose → Story map → Story → Story Path → Step → semantic explanation → implementation evidence. Attach four optional lenses to the selected item: Paths, Systems, Data, and Evidence. Do not create another independent timeline for a lens.
