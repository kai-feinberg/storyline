export const artifact = {
  schemaVersion: '1.0.0',
  artifactType: 'storyline.visualization',
  project: { id: 'project:storysketch', name: 'StorySketch' },
  stories: [
    { id: 'story:extract-pdf-batch', group: 'Extraction flows', title: 'Extract PDF batch', detail: '6 steps', system: 'Pipeline', summary: 'Process many PDFs in parallel and merge them into one validated dataset.', active: true },
    { id: 'story:review-low-confidence-fields', group: 'Operations', title: 'Review low-confidence fields', detail: '6 steps', system: 'Review', summary: 'Route uncertain values to a reviewer and fold corrections into the result.' },
    { id: 'story:configure-extraction-schema', group: 'Configuration', title: 'Configure extraction schema', detail: '4 steps', system: 'Settings', summary: 'Define fields, types, validation rules, and merge behavior for a flow.' },
  ],
  storyPaths: [{ id: 'path:extract-pdf-batch:default', storyId: 'story:extract-pdf-batch', stepIds: ['batch-submitted', 'load-config', 'fan-out', 'extract-parallel', 'merge-results', 'dataset-ready'] }],
  steps: [
    { id: 'batch-submitted', type: 'Event', title: 'PDF batch submitted', summary: 'A user starts a configured flow with one or more PDF documents.', system: 'Flow API', needs: 'PDF files, flow ID', produces: 'Accepted batch request', source: 'src/app/api/projects/route.ts', lines: '18–54' },
    { id: 'load-config', type: 'Action', title: 'Fetch extraction configuration', summary: 'Pin the schema, model policy, and limits used for the entire run.', system: 'Config service', needs: 'Flow ID, tenant ID', produces: 'Immutable runtime configuration', source: 'src/lib/project-persistence.ts', lines: '24–96', operations: ['Fetch published flow', 'Validate extraction schema', 'Generate runtime policy'] },
    { id: 'fan-out', type: 'Action', title: 'Prepare document extraction', summary: 'Create durable extraction work for every PDF while respecting configured capacity.', system: 'Orchestrator', needs: 'Batch request, runtime configuration', produces: 'Tracked document extractions', source: 'src/app/api/render/helpers.ts', lines: '31–118', operations: ['Create batch manifest', 'Trigger document extraction', 'Limit concurrent extractions'] },
    { id: 'extract-parallel', type: 'Action', title: 'Extract document information', summary: 'Recover text and generate schema-constrained fields for every PDF.', system: 'Worker pool', needs: 'Document extractions, runtime policy', produces: 'Per-document extraction results', source: 'src/lib/scene-planning.ts', lines: '42–176', operations: ['Parse PDF pages', 'Extract text and layout', 'Generate structured fields'] },
    { id: 'merge-results', type: 'Action', title: 'Merge extraction results', summary: 'Wait for every extraction, match repeated entities, and resolve field conflicts.', system: 'Merge service', needs: 'Document result promises, merge rules', produces: 'Unified extraction dataset', source: 'src/lib/project-persistence.ts', lines: '37–164', operations: ['Wait for document extractions', 'Match repeated entities', 'Resolve field conflicts'] },
    { id: 'dataset-ready', type: 'Outcome', title: 'Dataset ready', summary: 'The validated dataset and document-level evidence are available for review or export.', system: 'Results API', needs: 'Unified extraction dataset', produces: 'Versioned result with source evidence', source: 'src/app/api/projects/[projectId]/route.ts', lines: '20–82' },
  ],
  stepSchemas: {
    'batch-submitted': { input: { title: 'Batch submission', fields: [{ name: 'files', type: 'FileRef[]', required: true, description: 'One or more PDF files.' }] }, output: { title: 'Accepted batch request', fields: [{ name: 'batchId', type: 'string · uuid', required: true, description: 'Stable batch identifier.' }] } },
    'load-config': { input: { title: 'Configuration lookup', fields: [{ name: 'flowId', type: 'string · uuid', required: true, description: 'Flow to load.' }] }, output: { title: 'Runtime configuration', fields: [{ name: 'revisionId', type: 'string', required: true, description: 'Pinned flow revision.' }] } },
    'fan-out': { input: { title: 'Extraction preparation', fields: [{ name: 'batch', type: 'BatchRequest', required: true, description: 'Accepted batch.' }] }, output: { title: 'Tracked extractions', fields: [{ name: 'tasks', type: 'TaskHandle[]', required: true, description: 'One handle per document.' }] } },
    'extract-parallel': { input: { title: 'Document extraction', fields: [{ name: 'tasks', type: 'TaskHandle[]', required: true, description: 'Tracked document work.' }] }, output: { title: 'Document results', fields: [{ name: 'results', type: 'DocumentResult[]', required: true, description: 'Typed fields by document.' }] } },
    'merge-results': { input: { title: 'Merge request', fields: [{ name: 'results', type: 'SettledResult[]', required: true, description: 'Successful and failed branches.' }] }, output: { title: 'Unified dataset', fields: [{ name: 'fields', type: 'Record<string, Value>', required: true, description: 'Resolved field values.' }] } },
    'dataset-ready': { input: { title: 'Publish request', fields: [{ name: 'dataset', type: 'UnifiedDataset', required: true, description: 'Validated merged result.' }] }, output: { title: 'Published dataset', fields: [{ name: 'datasetId', type: 'string · uuid', required: true, description: 'Versioned result identifier.' }] } },
  },
  operationDetails: {},
};

for (const name of [...new Set(artifact.steps.flatMap((step) => step.operations ?? []))]) {
  artifact.operationDetails[name] = {
    summary: `${name} for the current extraction run.`,
    logic: `The implementation performs ${name.toLowerCase()} using the inputs from the previous step.`,
    needs: 'Step input',
    produces: 'Step output',
    source: 'analysis evidence',
    lines: '—',
    calls: [],
  };
}

export const stories = artifact.stories;
export const steps = artifact.steps;
export const stepSchemas = artifact.stepSchemas;
export const operationDetails = artifact.operationDetails;
