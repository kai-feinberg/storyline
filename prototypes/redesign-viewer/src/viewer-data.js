const token = new URLSearchParams(window.location.search).get('token') ?? '';
const response = await fetch(`/api/artifact?token=${encodeURIComponent(token)}`);
if (!response.ok) throw new Error(`Could not load the Storyline artifact (HTTP ${response.status}).`);

export const artifact = await response.json();
const byId = (items) => new Map(items.map((item) => [item.id, item]));
const domains = byId(artifact.domains ?? []);
const paths = byId(artifact.storyPaths ?? []);
const rawSteps = byId(artifact.steps ?? []);
const implementations = byId(artifact.implementations ?? []);
const calls = byId(artifact.calls ?? []);
const schemas = byId(artifact.schemas ?? []);
const evidence = byId(artifact.sourceEvidence ?? []);

const sourceFor = (ids = []) => {
  const item = ids.map((id) => evidence.get(id)).find(Boolean);
  return item ? { source: item.path, lines: `${item.lineStart}–${item.lineEnd}` } : { source: 'No source evidence', lines: '—' };
};

export const stories = (artifact.stories ?? []).map((story, index) => {
  const path = paths.get(story.pathIds?.[0]);
  return {
    ...story,
    group: story.group ?? domains.get(story.domainId)?.name ?? 'Product stories',
    detail: `${path?.stepIds?.length ?? 0} steps`,
    system: story.system ?? 'Repository',
    active: index === 0,
  };
});

export const stepSchemas = {};
export const operationDetails = {};
export const stepsByStory = {};

for (const story of stories) {
  const path = paths.get(story.pathIds?.[0]);
  stepsByStory[story.id] = (path?.stepIds ?? []).map((id) => {
    const step = rawSteps.get(id);
    const implementation = implementations.get(step?.implementationId);
    const stepSource = sourceFor(step?.evidenceIds);
    const implementationSource = sourceFor(implementation?.evidenceIds ?? step?.evidenceIds);
    const operationId = implementation?.id;
    if (operationId) {
      operationDetails[operationId] = {
        summary: implementation.summary,
        logic: implementation.summary,
        needs: implementation.needs,
        produces: implementation.produces,
        ...implementationSource,
        calls: (implementation.callIds ?? []).map((callId) => {
          const call = calls.get(callId);
          return call ? { ...call, boundary: call.boundary } : null;
        }).filter(Boolean),
      };
    }
    stepSchemas[step.id] = {
      input: schemas.get(step.inputSchemaId) ?? { title: 'Input', fields: [] },
      output: schemas.get(step.outputSchemaId) ?? { title: 'Output', fields: [] },
    };
    return {
      ...step,
      type: step.kind.charAt(0).toUpperCase() + step.kind.slice(1),
      needs: implementation?.needs ?? 'Not documented',
      produces: implementation?.produces ?? 'Not documented',
      ...stepSource,
      operations: operationId ? [operationId] : [],
    };
  });
}

export const projectName = artifact.project?.name ?? artifact.project?.title ?? artifact.project?.id ?? 'Repository';
