---
name: Storyline
description: A calm, human-centered path from product behavior to source evidence.
colors:
  canvas-ivory: "#faf6f0"
  paper: "#fffdf9"
  paper-strong: "#ffffff"
  ink-navy: "#0f2638"
  ink-soft: "#4b5b66"
  path-coral: "#ff6f61"
  path-coral-soft: "#fff0ec"
  context-mint: "#d8eee6"
  context-mint-strong: "#79b9a7"
  warm-gray: "#ded7cd"
  warm-gray-soft: "#eee8df"
  line: "#e3ddd3"
typography:
  display:
    fontFamily: "Albert Sans, sans-serif"
    fontSize: "clamp(34px, 4vw, 52px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Albert Sans, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.09
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Albert Sans, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Albert Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Source Code Pro, monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  keycap: "5px"
  icon: "9px"
  compact: "10px"
  control: "11px"
  navigation: "12px"
  evidence: "14px"
  card: "16px"
  round: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "11px"
  lg: "17px"
  xl: "22px"
  2xl: "32px"
  3xl: "48px"
components:
  story-card:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.card}"
    padding: "21px 64px 20px 23px"
  story-card-selected:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.card}"
    padding: "21px 64px 20px 23px"
  navigation-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.navigation}"
    padding: "0 11px"
    height: "40px"
  navigation-item-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.navigation}"
    padding: "0 11px"
    height: "40px"
  search-control:
    backgroundColor: "{colors.warm-gray-soft}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "38px"
  source-trace:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.evidence}"
    padding: "15px"
  route-marker:
    backgroundColor: "{colors.canvas-ivory}"
    textColor: "{colors.path-coral}"
    rounded: "{rounded.round}"
    size: "47px"
  route-marker-selected:
    backgroundColor: "{colors.path-coral}"
    textColor: "{colors.paper-strong}"
    rounded: "{rounded.round}"
    size: "47px"
---

# Design System: Storyline

## Overview

**Creative North Star: “The Clear Path”**

Storyline is a gentle path through complexity. Warm paper-like surfaces and generous whitespace reduce cognitive pressure, while a continuous coral route gives the reader a dependable narrative thread. Pale mint fields reveal supporting behavior and source context without competing with the story.

The system is calm, friendly, intelligent, and quietly technical. Rounded frames and restrained linework soften the application shell; exact metadata and source locations remain crisp in monospace. Product behavior is always encountered before implementation evidence.

**Key Characteristics:**

- Warm ivory, layered paper, deep ink navy, sparse coral, and calm mint.
- A vertical story route as the dominant form and reading order.
- Progressive disclosure from story step to semantic operations to source trace.
- Ambient elevation, thin warm rules, rounded frames, and simple line icons.
- Spacious humanist typography with monospace reserved for implementation detail.

## Colors

The palette is warm and low-pressure: navy carries meaning, coral marks the path, mint supports context, and warm neutrals create paper-like depth.

### Primary

- **Path Coral** (`#ff6f61`): progression, selected route markers, active icons, and focused emphasis. Use sparingly and repeat intentionally.
- **Path Coral Soft** (`#fff0ec`): quiet halos and hover fields around coral interactions.

### Secondary

- **Context Mint** (`#d8eee6`): semantic expansion fields, source icons, completion halos, and supportive context.
- **Context Mint Strong** (`#79b9a7`): completion and readiness indicators.

### Neutral

- **Canvas Ivory** (`#faf6f0`): primary workspace canvas and sticky topbar ground.
- **Paper** (`#fffdf9`): navigation selections, repository control, and source traces.
- **Paper Strong** (`#ffffff`): story cards.
- **Ink Navy** (`#0f2638`): primary text, wordmark, avatar, and strongest linework.
- **Ink Soft** (`#4b5b66`): summaries and secondary prose.
- **Warm Gray** (`#ded7cd`): keycap and compact-control borders.
- **Warm Gray Soft** (`#eee8df`): quiet controls and hover surfaces.
- **Line** (`#e3ddd3`): structural dividers and panel boundaries.

**The Coral Path Rule.** Coral communicates progression, selection, or a key action; it is not a general surface fill.

**The Supporting Mint Rule.** Mint indicates context, evidence, completion, or semantic detail. It never replaces coral as the narrative path.

## Typography

**Display Font:** Albert Sans (sans-serif fallback)  
**Body Font:** Albert Sans (sans-serif fallback)  
**Label/Mono Font:** Source Code Pro (monospace fallback)

**Character:** Albert Sans keeps the interface open, human, and readable. Source Code Pro adds technical precision only where the content is genuinely implementation-oriented.

### Hierarchy

- **Display** (500, `clamp(34px, 4vw, 52px)`, 1.04): story titles; spacious and gently tightened.
- **Headline** (500, `28px`, 1.09): contextual detail titles.
- **Title** (600, `20px`, 1.15): story-step outcomes; mobile reduces this to `18px`.
- **Body** (400, `13px`, 1.5): summaries and explanations, generally limited to `52ch`; introductory copy uses `15px/1.55`.
- **Label** (500–700, `9–11px`): source paths, systems, counts, and compact metadata. Source locations use Source Code Pro; semantic labels remain Albert Sans.

**The Technical Accent Rule.** Reserve monospace for paths, line numbers, keyboard shortcuts, counts, and compact system metadata; never use it as the product’s dominant voice.

## Layout

Desktop uses a 276px repository sidebar and a fluid workspace. Inside the workspace, a centered grid caps at 1300px and divides into a story column (`minmax(500px, 1fr)`) and a 330px contextual detail panel. The first viewport therefore reads left to right as repository navigation, vertical story route, then selected-behavior context.

The story itself is a centered 660px measure with a 47px marker rail, 17px gutter, and 26px vertical cadence between stops. The story canvas uses `58px clamp(32px, 5vw, 76px) 90px`; detail uses `52px 34px`. A 70px sticky topbar anchors the workspace.

At 1080px, the sidebar contracts to 232px and detail to 280px. At 820px, navigation becomes an off-canvas drawer, the workspace stacks, desktop selected-detail content yields to local context inside the selected card, and the canvas uses `42px 20px 64px`. At 560px, markers shrink from 47px to 37px, card padding tightens, and system metadata hides to preserve the story.

## Elevation & Depth

Depth is a hybrid of tonal layering and soft ambient shadows. Structural regions are separated primarily by warm background shifts and 1px rules; shadows are reserved for interactive paper surfaces and selected emphasis.

### Shadow Vocabulary

- **Drawer Ambient** (`0 12px 38px rgba(53, 42, 30, 0.08)`): mobile navigation over the canvas.
- **Repository Lift** (`0 7px 24px rgba(53, 42, 30, 0.06)`): repository switcher.
- **Navigation Lift** (`0 7px 22px rgba(53, 42, 30, 0.05)`): active navigation and story links.
- **Card Rest** (`0 10px 34px rgba(53, 42, 30, 0.07)`): story cards.
- **Card Selected** (`0 18px 48px rgba(53, 42, 30, 0.11)`): selected story card, paired with a 2px upward shift.
- **Evidence Lift** (`0 8px 28px rgba(53, 42, 30, 0.07)`): source-trace container.

**The Ambient-Only Rule.** Shadows stay broad, warm, and low-opacity; never use hard, dark, or decorative elevation.

## Shapes

The form language is rounded but restrained. Story cards use 16px corners; evidence and repository surfaces use 14px; navigation uses 12px; compact controls use 9–11px; keycaps use 5px. Route markers, statuses, avatars, and icon actions are circular. Borders are 1px warm rules, not high-contrast outlines. The signature silhouette is a thin vertical path passing through circular numbered stops beside rounded paper cards.

## Components

### Navigation

- **Repository switcher:** 14px paper surface, `11px 12px` padding, 31px mint repository mark, ambient lift.
- **Primary item:** 40px minimum height, 12px radius, `0 11px` padding, 13px/600 text.
- **Story item:** 46px minimum height, 12px radius, `7px 9px` padding, dot-plus-label composition.
- **States:** default is transparent and muted; hover adds translucent paper; active becomes paper with low lift, navy text, and a coral icon or pin.
- **Mobile:** the 276px rail becomes a drawer of `min(310px, 88vw)` with an ink-tinted backdrop and a `0.28s cubic-bezier(.22, 1, .36, 1)` entrance.

### Search Control

- **Shape:** 11px radius, 38px height, `0 12px` padding.
- **Style:** quiet warm-gray fill with muted ink text and an inset paper keycap.
- **State:** hover darkens the warm surface and restores ink navy; keyboard focus uses a 3px translucent coral outline offset by 3px.
- **Responsive behavior:** collapses to a 42px icon control below 820px.

### Story Route & Markers

- **Rail:** 1px soft coral line, continuous behind the marker sequence.
- **Marker:** 47px circle with ivory fill, coral border, coral monospace number; selected becomes solid coral with white text and scales to 1.06.
- **Completion:** mint center with a larger pale-mint halo.
- **Mobile:** marker and rail offset reduce together to preserve alignment.

### Story Cards

- **Character:** quiet paper chapters that become more present only when selected.
- **Shape:** 16px radius, no visible border, clipped local expansion.
- **Layout:** minimum 150px; `21px 64px 20px 23px` padding; semantic type and system metadata precede title, summary, and action.
- **State:** selection raises the shadow, lifts 2px, fills the marker coral, rotates the circular indicator, and reveals contextual detail.
- **Motion:** 0.2–0.24s ease transitions; reduced-motion collapses durations to 0.01ms.

### Local Expansion

- **Style:** pale mint field (`#f0f7f3`) attached inside the story card, separated by a mint-gray 1px rule.
- **Structure:** 44px toggle row followed by 40px operation rows, with compact numbered mono indices.
- **Purpose:** reveal semantic operations locally without breaking the continuous story path.

### Source Trace

- **Shape:** 14px paper container with 15px padding and evidence lift.
- **Icon field:** 29px square, 9px radius, pale mint fill, restrained green line icon.
- **Typography:** 9px semantic label plus 9–10px Source Code Pro for path and line range; long paths truncate.
- **Purpose:** implementation evidence remains available and traceable, but visually subordinate to behavior.

### Context Panel

- **Desktop:** 330px sticky panel below the 70px topbar, warm tonal background, 52px/34px inset, thin section rules.
- **Empty state:** circular mint compass, reassuring heading and explanation, then a two-item coral/mint legend.
- **Mobile:** selected context moves into the card as a two-column needs/produces grid with a full-width source row.

## Do's and Don'ts

### Do:

- **Do** preserve the vertical story as the primary reading order.
- **Do** lead with human outcomes, then disclose semantic operations and source evidence locally.
- **Do** use coral sparingly for the path, selection, focus, and key progression cues.
- **Do** use mint for supporting detail, completion, readiness, and evidence icon fields.
- **Do** pair generous whitespace and warm tonal layers with thin 1px rules and broad ambient shadows.
- **Do** retain visible keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** turn the experience into a dense technical dashboard, data model, or call graph.
- **Don't** imply causal dependencies with decorative arrows when they are only metadata.
- **Don't** use literal code brackets, terminal aesthetics, generic sparkles, gradients, stock-office imagery, or generic AI imagery.
- **Don't** use coral as a broad background color or mint as the primary action color.
- **Don't** spread monospace across headlines or explanatory prose.
- **Don't** add hard shadows, heavy borders, sharp cards, or dense all-caps labels.
