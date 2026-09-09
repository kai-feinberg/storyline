# Storyline follow-up

This list contains work that remains useful after the current viewer overhaul. It is intentionally separate from the completed high-level viewer work so the next pass has a clear scope.

## After the current pass

- [ ] Add stable field identifiers and first-class field lineage when a source artifact can prove exact mappings across schemas. The current `schemaChanges` entries support useful examples, but they do not claim automatic lineage.
- [ ] Add browser-level regression coverage for search, keyboard navigation, focus restoration, the context drawer, and the compact mobile layout.
- [ ] Add a source-viewer handoff when the host can open repository files at an exact line. The current viewer records and searches source evidence, then copies the location.
- [ ] Add result virtualization and grouped filtering if generated artifacts grow beyond a few hundred Stories or Steps.
- [ ] Add automated accessibility checks and visual snapshots across Chromium, Safari, and narrow mobile widths.

## Deferred product questions

- [x] Keep Data flow as a separate mode with explicit Story relationships and named data-object lifecycles.
- [x] Remove the right context panel. Keep Step data, implementation, and evidence in one local disclosure.
- [ ] Decide which relationship types deserve a dedicated visual treatment after more real repositories are tested.
