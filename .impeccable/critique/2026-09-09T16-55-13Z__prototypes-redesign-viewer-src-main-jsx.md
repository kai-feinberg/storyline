---
score: 33
max_score: 40
label: Good
target: prototypes/redesign-viewer/src/main.jsx
scope: ui
timestamp: 2026-09-09T16-55-13Z
slug: prototypes-redesign-viewer-src-main-jsx
---
⚠️ DEGRADED: single-context (spawn_agent unavailable in this session)

# Impeccable critique: Storyline viewer

## Design health

| Heuristic | Score | Finding |
|---|---:|---|
| Visibility of system status | 4/4 | Artifact status, selected Step, URL state, and source evidence are visible. |
| Match to the real world | 3/4 | Story, Step, Input, Output, and named data objects use clear product language. |
| User control | 4/4 | Quick context is opt-in, modal detail is dismissible, and URL state is shareable. |
| Consistency | 3/4 | Story, Flow, Search, and focused detail use a coherent visual language. |
| Error prevention | 3/4 | Invalid URL IDs fall back safely; artifact validation now checks data-flow references. |
| Recognition over recall | 3/4 | Data stages expose labels and schema titles; relationship labels are clearer. |
| Flexibility and efficiency | 3/4 | Search and keyboard navigation remain available; deep links reduce repeat navigation. |
| Aesthetic and minimal design | 4/4 | The first viewport is full-width; secondary detail is disclosed only when requested. |
| Help and documentation | 3/4 | Contract, design system, viewer guide, and follow-up plan are updated. |
| Recovery and resilience | 3/4 | Missing schemas and source details have explicit states; browser-level regression coverage is still pending. |

Overall: 33/40. The direction is strong for an example viewer. It is now clear enough to test with real artifacts, but not yet a production-quality navigation shell.

## Decision evaluation

### Keep the right sidebar always open

Reject. It consumed first-viewport space, repeated modal information, and forced users to read implementation context before they asked for it.

### Remove the sidebar and use the modal only

Valid minimal option. It has the lowest visual complexity. It loses fast comparison while a user scans the Story timeline.

### Keep an optional quick-context sidebar and make the modal canonical

Recommended. The sidebar now answers only “what does this Step need, produce, and connect to?” The modal answers “how does it work, what are the schemas, and what code supports it?” This is a clean separation of jobs.

### Keep “Step data handoffs”

Reject. The former view listed local Step boundaries without a named object or lifecycle. It was hard to understand and did not match the requested “video object is created, schema changes, audio is added” mental model.

### Add named data objects

Keep. The new model makes the data story explicit: object title, lifecycle stages, stage state, owning Step, and schema title. It should remain intentionally selective. It must not become a full variable-level trace.

## Highest-value remaining improvements

1. Add browser regression tests for URL hydration, search, keyboard navigation, focus restoration, sidebar drawer behavior, and mobile layout.
2. Add stable field identifiers and first-class lineage only when source evidence can prove exact mappings. Current `schemaChanges` remain editorial and are correctly labeled as such.
3. Add a host-integrated source viewer handoff for exact file and line navigation. Copying the source location is useful but incomplete.
4. Define a generator policy for `dataFlows`: emit only high-value product objects, require typed Step/Schema references, and reject vague flow names during review.
5. Add result virtualization and grouped filtering if artifacts exceed a few hundred Stories or Steps.

## Minor issues observed

- The Story header is smaller and less dominant, but its summary and three stats still compete on very wide screens. Recheck after testing with longer real titles.
- The quick-context panel can still become tall when diagnostics and related Stories are numerous. Consider collapsible lower sections if real artifacts expose that case.
- The focused modal is visually strong, but production use should add a full focus trap and explicit focus restoration tests.
- Relationship labels are clearer, but future relationship kinds need a small controlled vocabulary to avoid cryptic fallback labels.

## Verification notes

- Manual CUA review completed for Story, optional quick context, Data flow, data-object stage navigation, and focused detail modal.
- URL state verified for `story`, `step`, `view`, `panel=open`, and `focus`.
- Browser console logs showed no output or runtime errors during the review.
- Impeccable detector result: `[]`.
- Artifact validation passed: 3 Stories and 13 Steps.
- Test suite passed: 16/16.
- Viewer production build and plugin asset publish passed.
- Dev server remains running on port 5173 by request.
