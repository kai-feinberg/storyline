const byId = (items = []) => new Map(items.map((item) => [item.id, item]));

const sourceFor = (evidence, ids = []) => {
  const item = ids.map((id) => evidence.get(id)).find(Boolean);
  return item
    ? { source: item.path, lines: `${item.lineStart}–${item.lineEnd}`, status: item.status ?? 'confirmed', supports: item.supports }
    : { source: 'No source evidence', lines: '—', status: 'uncertain' };
};

const fieldMap = (schema) => new Map((schema?.fields ?? []).map((field) => [field.name, field]));

export const deriveSchemaChanges = (input, output) => {
  if (!input && !output) return [];
  const inputFields = fieldMap(input);
  const outputFields = fieldMap(output);
  const changes = [];

  for (const field of output?.fields ?? []) {
    const previous = inputFields.get(field.name);
    if (!previous) {
      changes.push({ kind: 'added', from: null, to: field.name, description: `${field.name} is established by this Step.` });
    } else if (previous.type !== field.type || previous.required !== field.required) {
      changes.push({ kind: 'changed', from: previous.name, to: field.name, description: `${previous.type}${previous.required ? ', required' : ''} becomes ${field.type}${field.required ? ', required' : ''}.` });
    } else {
      changes.push({ kind: 'preserved', from: previous.name, to: field.name, description: `${field.name} continues through this Step.` });
    }
  }

  for (const field of input?.fields ?? []) {
    if (!outputFields.has(field.name)) {
      changes.push({ kind: 'removed', from: field.name, to: null, description: `${field.name} is not present after this Step.` });
    }
  }

  return changes;
};

export function normalizeArtifact(artifact) {
  const domains = byId(artifact.domains);
  const paths = byId(artifact.storyPaths);
  const rawSteps = byId(artifact.steps);
  const implementations = byId(artifact.implementations);
  const calls = byId(artifact.calls);
  const schemas = byId(artifact.schemas);
  const evidence = byId(artifact.sourceEvidence);

  const stories = (artifact.stories ?? []).map((story, index) => {
    const path = paths.get(story.pathIds?.[0]);
    return {
      ...story,
      group: story.group ?? domains.get(story.domainId)?.name ?? 'Product stories',
      detail: `${path?.stepIds?.length ?? 0} steps`,
      system: story.system ?? 'Repository',
      active: index === 0,
      source: sourceFor(evidence, story.evidenceIds),
    };
  });

  const stepSchemas = {};
  const operationDetails = {};
  const stepsByStory = {};
  const storyById = byId(stories);

  for (const story of stories) {
    const path = paths.get(story.pathIds?.[0]);
    stepsByStory[story.id] = (path?.stepIds ?? []).map((id) => {
      const step = rawSteps.get(id);
      const implementation = implementations.get(step?.implementationId);
      const input = schemas.get(step?.inputSchemaId) ?? null;
      const output = schemas.get(step?.outputSchemaId) ?? null;
      const stepSource = sourceFor(evidence, step?.evidenceIds);
      const implementationSource = sourceFor(evidence, implementation?.evidenceIds ?? step?.evidenceIds);
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

      stepSchemas[step.id] = { input, output };
      return {
        ...step,
        type: step.kind.charAt(0).toUpperCase() + step.kind.slice(1),
        needs: implementation?.needs ?? 'Not documented',
        produces: implementation?.produces ?? 'Not documented',
        ...stepSource,
        implementationSource,
        operations: operationId ? [operationId] : [],
        inputSchema: input,
        outputSchema: output,
        schemaChanges: step.schemaChanges?.length ? step.schemaChanges : deriveSchemaChanges(input, output),
      };
    });
  }

  const dataFlows = (artifact.dataFlows ?? []).map((flow) => ({
    ...flow,
    stages: (flow.stages ?? []).map((stage) => {
      const step = rawSteps.get(stage.stepId);
      const story = stories.find((item) => item.pathIds?.includes(step?.pathId));
      return {
        ...stage,
        step,
        storyId: story?.id,
        schema: schemas.get(stage.schemaId) ?? null,
      };
    }),
  }));

  return {
    artifact,
    project: artifact.project ?? {},
    projectName: artifact.project?.name ?? artifact.project?.title ?? artifact.project?.id ?? 'Repository',
    stories,
    storyById,
    stepsByStory,
    stepSchemas,
    operationDetails,
    relationships: artifact.relationships ?? [],
    dataFlows,
    diagnostics: artifact.diagnostics ?? [],
    metadata: artifact.metadata ?? {},
    schemas: artifact.schemas ?? [],
    schemaById: schemas,
    sourceEvidence: artifact.sourceEvidence ?? [],
  };
}

export async function loadArtifact() {
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const response = await fetch(`/api/artifact?token=${encodeURIComponent(token)}`);
  if (!response.ok) throw new Error(`Could not load the Storyline artifact (HTTP ${response.status}).`);
  return normalizeArtifact(await response.json());
}
