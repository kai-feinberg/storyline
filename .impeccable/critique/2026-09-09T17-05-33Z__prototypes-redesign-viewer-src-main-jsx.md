---
target: Storyline viewer context sidebar and data-flow schema IA
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-09-09T17-05-33Z
slug: prototypes-redesign-viewer-src-main-jsx
---
# Storyline viewer information architecture critique

Method: dual-agent (A: /root/ia_review · B: /root/detector_review)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Selection and readiness are clear; copy has no feedback. |
| 2 | Match system / real world | 3 | Story and Step are natural; several technical labels blur audiences. |
| 3 | User control and freedom | 3 | Closures and Escape work; ordinary selection forces a wide panel open. |
| 4 | Consistency and standards | 2 | Sidebar, inline expansion, and modal overlap. |
| 5 | Error prevention | 3 | Read-only paths are safe; inferred schema changes can overstate certainty. |
| 6 | Recognition rather than recall | 2 | Users must remember prior schemas because Flow shows names, not shapes. |
| 7 | Flexibility and efficiency | 3 | Search and keyboard navigation help; schema comparison is manual. |
| 8 | Aesthetic and minimalist design | 2 | The open sidebar repeats content and competes with the story. |
| 9 | Error recovery | 3 | Load recovery is clear; copy failure is silent. |
| 10 | Help and documentation | 2 | Shortcut help exists; schema and evidence semantics lack local help. |
| **Total** | | **26/40** | **Acceptable; significant IA improvement needed** |

## Design Specificity Verdict

The warm paper palette, coral timeline, numbered route, and Story/Step language feel authored for Storyline. The right panel and focused modal fall back to a generic inspector pattern. The strongest product idea is the narrative path of a story or data object; the weakest parts repeat the same fact in several containers.

The source-only detector returned zero findings. The rendered scan found 68 unique issues: mainly undersized functional text, tiny text, and low contrast. The cream-palette warning is a false positive because that palette is intentional. Many sidebar and schema labels are 7–10px, so the readability findings reinforce the cognitive-load concern.

No reliable user-visible overlay remains open. Injection succeeded in the isolated browser assessment, but that thread could not present the in-app browser. Screenshot and console evidence were used instead.

## Overall Impression

The default Story view is calm and understandable. Opening Quick context makes it worse: the main story compresses, the headline wraps, and the user gets a dense restatement of the selected card. The Data Flow view is the right concept, but it stops one level before the key answer: the current object shape and what changed.

## What Is Working

1. The numbered vertical timeline is the correct primary model for a Story.
2. Local implementation expansion preserves the Story while revealing technical detail.
3. Data objects with Created, Updated, Branched, and Completed states are a strong product-specific model.

## Priority Issues

### [P1] The right sidebar duplicates rather than contextualizes

The title, summary, system, boundary names, Needs/Produces, and source either repeat the card or belong inside its expansion. Remove the persistent Step inspector. Put a compact Input → Output boundary inside the expanded Step. Put Source evidence there too. Move Related Stories to Flow or a Story-level Connections disclosure. Move Artifact notes to a top-level artifact-health surface. If a side panel remains, reserve it for truly cross-step information and never open it automatically.

Suggested command: `$impeccable distill`.

### [P1] Three detail mechanisms have no clear contract

“Show implementation,” “Details,” and “Open full details” overlap. Replace them with one Step disclosure. Inside it, use stable sections such as Data, Implementation, and Evidence. Open Data by default. Keep a modal only for deep source inspection if it still has a unique job.

Suggested command: `$impeccable shape` and `$impeccable clarify`.

### [P1] The object lifecycle does not show the object

Each Flow stage shows only a schema title. Add View initial schema in each object header. Give later stages a compact delta summary and an inline disclosure. Default later stages to a structural diff against the previous stage, with unchanged fields collapsed. Offer Full schema at this stage as a secondary view.

Suggested command: `$impeccable shape`.

### [P2] Schema language conflates schema, payload, and lifecycle state

Separate the object instance or example payload from the schema. Use evidence-safe labels: Added, No longer present, Type changed, and Requiredness changed. Use Renamed only with explicit mapping evidence. Do not count Preserved fields as changes; group them under Unchanged.

Suggested command: `$impeccable clarify` and `$impeccable harden`.

### [P2] Information is placed by available space instead of semantic scope

Project diagnostics, Story relationships, Step boundaries, and field evolution need separate owners. Put artifact health at project scope, relationships at Story/Flow scope, inputs/outputs and source at Step scope, and schema evolution at data-object scope.

Suggested command: `$impeccable shape`.

## Persona Red Flags

**Alex, power user:** The panel changes layout during scanning. Three overlapping detail actions slow expert use. Five-stage object evolution still requires manual comparison.

**Jordan, first-time user:** Needs/Produces, Input/Output, and schema titles can look like different concepts. Quick context does not state its unique value. The user cannot inspect a schema from Flow.

**Sam, keyboard or screen-reader user:** The controls are generally labeled, but updated aside content occurs after the full Story in DOM order. The focused dialog does not show a complete focus trap. Copy has no announced result. Small, low-contrast metadata reduces readability.

## Cognitive Load

Four of eight checks fail: single focus, visual hierarchy, one thing at a time, and working memory. This is high cognitive load. The open panel exposes more than eight content blocks. The five-stage object row crosses the four-item working-memory threshold. Local chunking, grouping, and basic progressive disclosure are otherwise good.

## Minor Observations

- Starts with, Ends with, and Steps repeat information visible in a short timeline.
- Ready in the top bar and Artifact verified in the footer overlap.
- Relationship rows use more space than their information value.
- Horizontal lifecycle stages can be cut off at common widths.
- Functional metadata at 7–10px is too small even when visually secondary.

## Questions to Consider

1. If selection only highlighted a Step and expansion answered all Step questions, what unique job would remain for the sidebar?
2. Should users learn what changed first, then inspect what exists now? Recommended: full initial schema once, then deltas by default.
3. Could evidence appear beside each claim instead of becoming a separate destination?
4. Does a five-step Story need a modal, or can one local disclosure cover most use cases?
