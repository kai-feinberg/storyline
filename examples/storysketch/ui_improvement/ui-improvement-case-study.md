# UI Improvement Case Study: Whiteboard Studio

This note compares `old_ui.png` and `new_ui.png` as an example of how to improve a production workflow UI with design principles. The core improvement is not visual polish alone. The new screen changes the information architecture so the app reflects the current product behavior: assets are generated automatically, editing work is grouped by task, and the user can see what is ready without managing unnecessary steps.

## High-Level Change

The old UI treated the page like several independent work areas: project setup in the top bar, scene list on the left, preview in the center, visual generation and audio generation in the right sidebar, and final generation/export controls at the bottom of the left sidebar.

The new UI turns the page into a clearer studio workspace:

- The left sidebar is for project and scene navigation.
- The center is the preview bench.
- The right sidebar is for editing the selected scene.
- The top status/action bar is for global readiness, save state, delete, and export.

This is better because the interface now matches the user's mental model: choose a scene, refine the drawing and voiceover, preview the result, then export when the whole video is ready.

## Element-by-Element Changes

| Element | Old UI | New UI | Why It Changed | Why It Is Better |
| --- | --- | --- | --- | --- |
| Product name | `WHITEBOARD SAAS` | `WHITEBOARD STUDIO` | The old name described the business model. The new name describes the user's workspace. | "Studio" makes the product feel like a creative tool, not a generic SaaS shell. It sets a better expectation for editing, previewing, and producing. |
| Workspace pill | `Private workspace` pill in the top header | Removed | The workspace state was not actionable in this screen and competed with project controls. | Removing it reduces chrome and keeps the header focused on identity, account, and primary actions. |
| Project selector placement | Project title and voice selector were both in a secondary top bar | Project selector moved into the left sidebar under `PROJECT` | Project choice belongs with navigation, not with production status. | The left sidebar now starts with context, then scenes. This makes the sidebar read as "what am I working on?" before "which part am I editing?" |
| Voice selector placement | Voice selector lived beside the project title in the top bar | Voice selector moved into the right sidebar under `VOICEOVER` | Voice selection affects narration for the selected video/scene, so it belongs near the script and audio controls. | Related controls are grouped together. Users no longer scan the entire page to understand how voice, script, audio, and playback relate. |
| Secondary top bar | Held project name, voice selector, saved state, and delete | Simplified into status metrics plus action cluster | The old bar mixed setup, metadata, destructive actions, and progress. | The new bar has a clean job: show readiness and expose global actions. This reduces cognitive switching. |
| Status metrics | `3 scenes`, `3/3 visuals`, `2/3 with audio`, `16.2s total` | `3 scenes`, `3/3 drawings`, `2/3 audio`, `16.2s total` with colored readiness dots | Copy was tightened and aligned with the new asset model. `Drawings` is more specific than `visuals`; `audio` is shorter than `with audio`. | Shorter labels scan faster. The green/yellow dots create immediate readiness signals without asking the user to parse every number. |
| Export action | `Export Video` was at the bottom of the left sidebar under `EXPORT` | `Export video` moved to the top action cluster | Export is a global final action, not a navigation-sidebar item. | The primary action is now visible without scrolling and sits beside readiness status. This makes the workflow feel decisive: check status, export. |
| Save state | `Saved 2:32 PM` was a pill in the top project bar | `Saved 2:32 PM` moved next to export, styled as a calm success state | Save state is global feedback and belongs near global actions. | The user can trust changes are saved before exporting. The green tint communicates safety without shouting. |
| Delete action | Text button `Delete` in the project bar | Compact trash icon in the action cluster | Delete is important but should not visually compete with export or save. | The destructive action is still available, but visually demoted. This lowers accidental attention while keeping the action discoverable. |
| Scene list header | `LATEST SCENES` plus separate `3 scenes` count | `PROJECT` selector followed by scene cards | The old header duplicated the global scene count and created an extra hierarchy level. | The sidebar is cleaner. Counts live in the top status row; the left column can focus on scene identity and selection. |
| Selected scene card | White card with circular number badge | Blue-tinted selected row with blue number badge and border | Selection needed stronger contrast and a clearer active state. | The active scene is now obvious at a glance. The selected row uses color, border, and badge treatment together instead of relying on card position alone. |
| Long scene names | Full titles could occupy more horizontal space | Long titles are truncated with ellipses | The sidebar is a navigation surface with fixed width. | Truncation preserves layout stability and keeps timestamps aligned. The user still gets enough title context to identify the scene. |
| Batch/generate section | Left sidebar had `GENERATE` with `All Visuals 3/3 ready` and `All Audio 2/3 ready` batch buttons | Removed | Assets are now generated automatically, so batch generation controls are no longer part of the user's job. | Removing obsolete controls prevents users from wondering whether they need to press something. System automation becomes ambient status instead of manual work. |
| Left sidebar export section | Separate `EXPORT` section at bottom | Removed | Export moved to the global action cluster. | The sidebar no longer has unrelated bottom sections. It stays dedicated to project and scene navigation. |
| Preview card label | `LIVE PREVIEW` and `Scene preview` | `PREVIEW BENCH` and selected scene title | The old heading described the component. The new heading describes the workspace area and names the current content. | "Curb Appeal vs Reality" as the main header is more useful than "Scene preview." Users orient by content, not component labels. |
| Preview mode control | No visible mode toggle in the preview header | `Scene` / `Full video` segmented control added | Users need to know whether they are previewing the selected scene or the full composition. | The toggle makes preview scope explicit and keeps the control beside the preview it affects. |
| Right sidebar heading | `SCENE FOCUS` repeated scene title and time | Removed as a standalone block | The scene title and timing already appear in the scene list and preview header. | Removing duplicate scene metadata gives the sidebar more room for actual editing controls. |
| Visual section title | `WHITEBOARD VISUALS` and `Pick the best direction` | `DRAWING` and `Choose the strongest frame` | The new copy is more direct and better matched to the whiteboard output. | "Drawing" is concrete. "Strongest frame" tells the user to make an editorial choice rather than decipher "direction." |
| Refresh visuals action | `Refresh 3` button | `New drawings` button | The old label mixed action and count. | The new label states the outcome. It is clearer that clicking creates new drawing options. |
| Visual generation helper copy | `Active visual generated with google/gemini-3-flash-preview` | Removed | Model provenance is implementation detail unless the user needs it for trust, billing, or debugging. | The sidebar feels calmer and less technical. Users can focus on choosing the best frame. |
| Drawing option layout | Large selected preview plus three smaller cards, with heavier vertical scroll feel | Large selected preview plus three evenly grouped option cards | The visual choices are now a tighter decision group. | The selected drawing and alternatives feel like one task. This supports comparison and reduces page scanning. |
| Audio section | `SCENE AUDIO`, `Scene script for voiceover`, `Generate Audio` button, script box, audio player, voice metadata | `VOICEOVER`, `Narration and audio`, voice selector, mute button, script box, `Generate audio`, player, voice metadata | Audio controls were split across the top bar and sidebar. The new UI consolidates narration, voice, generation, and playback. | Everything needed to understand and produce voiceover is in one place. Grouping related controls reduces memory load and makes the workflow teach itself. |
| Generate audio button placement | Small button next to the audio section title | Full-width button below the script | The button depends on the script content and selected voice. | Placing it after the script follows reading order: review/edit narration, then generate audio. The full-width treatment also makes the next step unmistakable. |
| Audio readiness language | `2/3 with audio` and `All Audio 2/3 ready` | `2/3 audio` in status row, scene-level `Generate audio` in right panel | Batch readiness moved from action buttons into global status. | The app communicates progress while keeping the user focused on the selected scene's missing work. |
| Support/chat affordance | Red circular `N` button overlays bottom-right area | Black rounded action button at bottom-right | The old control looked like a brand badge and visually competed with creation controls. | The new affordance is quieter and more obviously utility-like. It no longer steals attention from export or scene editing. |
| Color system | Mostly neutral beige and black with minimal state color | Adds purposeful blue for selected scene/export, green for saved/drawing readiness, yellow for partial audio | State colors were introduced where they carry meaning. | The new palette is still restrained, but status and selection are easier to parse. Color now supports decisions instead of decorating the page. |
| Density and rhythm | Several stacked cards and labels made the interface feel tall and procedural | Related controls are grouped into fewer, clearer bands | The old UI repeated headers and spread related actions apart. | The new layout has better spatial rhythm: navigation, preview, drawing, voiceover, global actions. Each area has one clear responsibility. |

## Design Principles Demonstrated

### 1. Put Controls Where Their Effects Happen

The voice selector moved from the top project bar into the voiceover panel because it affects narration. The preview mode toggle sits inside the preview header because it affects the preview. Export moved beside global readiness because it produces the whole video.

When controls live near the thing they change, the UI needs less explanation.

### 2. Replace Manual Steps With Ambient Status

The old `All Visuals` and `All Audio` batch controls made users manage asset generation. In the new flow, drawing generation is automatic or scene-specific, so global batch controls were removed.

Automation should not leave behind old buttons. If the system does the work, the UI should report readiness, not ask the user to initiate stale tasks.

### 3. Group By User Task, Not Data Type Alone

The new right sidebar groups drawing choices and voiceover work for the selected scene. This is stronger than scattering project-level voice settings, scene metadata, generation buttons, and playback controls across the page.

Good grouping answers: "What am I trying to do right now?" For this screen, the answer is "choose the best drawing and make the narration work."

### 4. Remove Copy That Describes the Interface

The old UI included labels like `Scene preview`, `Scene script for voiceover`, and model-generation copy. Some of that text described the UI rather than helping the user act.

The new UI uses more purposeful copy:

- `Choose the strongest frame`
- `Narration and audio`
- `New drawings`
- `Generate audio`

This copy is action-oriented and tied to user decisions.

### 5. Make Primary Actions Global and Persistent

Export, save state, and delete are all project-level concerns. The new UI groups them in the top action area instead of distributing them through the secondary header and sidebar footer.

This makes the global workflow clear: watch readiness, trust save state, export when ready.

### 6. Use Color For State, Not Decoration

The new UI introduces blue for selection and primary action, green for complete/saved states, and yellow for partial audio readiness. These colors are meaningful because they are rare and consistent.

Color works best when it answers a question:

- What is selected?
- What is ready?
- What still needs attention?
- What is the primary action?

### 7. Let Navigation Stay Navigation

The left sidebar used to mix scenes, generation buttons, and export. The new sidebar only handles project and scene navigation.

Keeping navigation pure makes the page easier to scan. Users can trust that the left column answers "where am I?" instead of also hiding production actions.

## Before And After Summary

The old UI exposed the mechanics of making a whiteboard video. The new UI exposes the decisions that matter.

The biggest improvements are:

- Fewer redundant headers.
- Fewer manual generation controls.
- Clearer grouping of scene-level editing.
- Stronger active-scene state.
- Global actions placed together.
- Status moved from buttons into ambient progress indicators.
- Copy rewritten around user decisions rather than implementation details.

The result is a calmer, more confident workspace. It does not merely look cleaner; it asks less of the user because the structure now matches the workflow.
