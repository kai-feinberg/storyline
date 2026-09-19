# StorySketch example

This directory contains the checked-in Storyline output for the StorySketch example.

- `understanding.json`: evidence-backed repository understanding.
- `visualization.json`: viewer artifact with Stories, Steps, schemas, and source references.

The original StorySketch application source is not included. The example is intentionally artifact-only.

Launch it with the bundled viewer:

```bash
node plugins/storyline/scripts/storyline.mjs open-artifact showcase/storysketch/visualization.json
```

`open-artifact` validates the artifact structure and references, then serves it through the same bundled viewer used by the plugin. It does not perform repository freshness or source-file checks because this Showcase example does not include the original application.
