# Storyline Showcase

The Showcase contains small, checked-in Storyline artifacts that demonstrate the viewer without carrying the full source repositories that produced them.

## Examples

### StorySketch

An explainer-video application analyzed as three product Stories:

- Create a whiteboard explainer.
- Save and restore a project.
- Export a whiteboard video.

Files: [showcase/storysketch](storysketch/)

Launch the example viewer:

```bash
node plugins/storyline/scripts/storyline.mjs open-artifact showcase/storysketch/visualization.json
```

The example keeps both the Repository Understanding and the Visualization Artifact. It does not keep the original StorySketch application source.
