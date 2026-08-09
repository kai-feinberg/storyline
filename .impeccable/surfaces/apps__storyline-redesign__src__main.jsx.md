---
version: 1
slug: "apps__storyline-redesign__src__main.jsx"
primary_target: "apps/storyline-redesign/src/main.jsx"
related_targets: ["apps/storyline-redesign/src/styles.css", "apps/storyline-redesign/index.html"]
---

# Surface brief — Storyline vertical route mock

## Scope and mode

- **Mode:** Operate.
- **Audience:** Developers opening an unfamiliar codebase.
- **Job:** Understand one meaningful product flow and progressively inspect the behaviors and source evidence that support it.
- **Boundary:** High-fidelity frontend mock; no backend or analyzer functionality.

## Direction

- Apply `BRAND_KIT.md` Option 1, **The Clear Path**.
- Keep the approved vertical route composition from `.impeccable/mocks/route-strip.png` while replacing its earlier approach-plate styling with the brand's warm ivory, ink navy, soft coral, pale mint, and warm gray system.
- The memorable moment is progressive depth: the coral story path stays continuous at story level, while opening a complex behavior replaces the center with its own operation path and advances the breadcrumbs.

## Component grammar

- Story cards use 16px radii, one soft offset shadow, and no visible border.
- Supporting source traces use compact 14px rounded chips with mint icon fields.
- Navigation uses quiet filled active states; coral marks progression and selection only.
- Display/interface type uses Albert Sans as an obtainable humanist substitute for Suisse Intl Text; Source Code Pro is reserved for paths, line numbers, and compact metadata.

## Visible ingredient inventory

| Ingredient | Medium |
| --- | --- |
| Path-in-frame Storyline logo | Authored semantic SVG |
| Repository and story navigation | Semantic React + CSS |
| Narrow navigation rail and responsive bottom rail | Semantic React + CSS breakpoints |
| Searchable story picker and open-story tabs | Mock React controls + CSS |
| Vertical story path and numbered markers | Semantic ordered list + CSS geometry |
| Story-step and local expansion cards | Semantic React + CSS |
| Behavior focus and semantic-operation path | Semantic ordered list + React state |
| Expandable implementation traces with calls and I/O | Semantic React + compact source-code typography |
| Evidence/source trace | Semantic React + authored SVG icon |
| Responsive drawer and stacked detail panel | CSS breakpoints + React state |

## Constraints

- The story must remain the dominant reading order.
- Dependencies and source details remain supporting context.
- Story switching is presented as tabs plus a searchable picker; mock controls do not require data wiring.
- Desktop context touches the right viewport edge; mobile context follows the selected content locally.
- Keyboard navigation follows the hierarchy: Up/Down moves selection, Right enters the child layer, Left contracts or returns, and Enter toggles inline expansion.
- The three canonical layers are Story, Behavior, and Implementation; use the terms defined in `UBIQUITOUS_LANGUAGE.md`.
- No generic code glyphs, terminal aesthetics, gradients, or stock-office imagery.
