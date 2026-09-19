# Storyline plugin

This package contains the Storyline agent skills, artifact validator, local server, and compiled viewer.

## Create a visualization

Use the end-to-end skill for normal repository analysis:

```text
Use $storyline-create to create and open a Storyline visualization of this repository.
```

The skill initializes `.storyline/`, runs `storyline-understand`, runs `storyline-generate`, validates `visualization.json`, and opens the local viewer. Invoke the two specialist skills directly only when one phase needs separate review or repetition.

Before validation, the workflow stamps the artifact with its update time, source fingerprint, Git commit, and dirty-worktree state:

```bash
node ./scripts/storyline.mjs stamp <repository-root>
node ./scripts/storyline.mjs validate <repository-root>
```

Validation and viewing stop when the current source fingerprint differs from the recorded fingerprint. Regenerate and stamp the visualization after source changes.

## Update the viewer

Edit the viewer source in `../../viewer/`. For local UI development, run:

```bash
pnpm --dir viewer dev
```

Publish the current UI into the plugin after each viewer change:

```bash
pnpm --dir plugins/storyline build:viewer
```

The command runs the Vite production build and replaces `assets/viewer/` with the new `dist/` bundle. Commit the source changes and compiled plugin assets together.

Verify the plugin after publishing:

```bash
pnpm --dir plugins/storyline test
```

The installed plugin uses only `assets/viewer/`. It does not load files from `viewer/` at runtime.
