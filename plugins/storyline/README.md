# Storyline plugin

This package contains the Storyline agent skills, artifact validator, local server, and compiled viewer. It is compatible with both Codex and Claude Code.

## Claude Code

Claude Code discovers the skills from the `skills/` directory and the plugin metadata from `.claude-plugin/plugin.json`.

For a local session, load this plugin with:

```bash
pnpm --dir ./plugins/storyline install
claude --plugin-dir ./plugins/storyline
```

The dependency install is needed when loading a source checkout directly. Claude Code marketplace installs can install eligible Node.js dependencies automatically.

The skills can be invoked by their namespaced forms, such as `/storyline:storyline-create`, or selected automatically when the request matches their descriptions.

Claude Code resolves `${CLAUDE_PLUGIN_ROOT}` to this plugin directory. The Storyline skills use that path for the bundled scripts, references, and viewer assets.

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
