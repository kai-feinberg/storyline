import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { projectName, stories as artifactStories, stepsByStory, stepSchemas as artifactStepSchemas, operationDetails as artifactOperationDetails } from './viewer-data.js';

const fallbackStories = [
  { group: 'Extraction flows', title: 'Extract PDF batch', detail: '6 steps', system: 'Pipeline', summary: 'Process many PDFs in parallel and merge them into one validated dataset.', active: true },
  { group: 'Extraction flows', title: 'Extract invoice line items', detail: '7 steps', system: 'Pipeline', summary: 'Capture normalized invoice headers and line items from mixed vendor formats.' },
  { group: 'Extraction flows', title: 'Compare contract clauses', detail: '8 steps', system: 'Pipeline', summary: 'Extract clauses from multiple contracts and align equivalent language.' },
  { group: 'Operations', title: 'Reprocess failed documents', detail: '5 steps', system: 'Workers', summary: 'Retry recoverable failures without repeating completed extraction work.' },
  { group: 'Operations', title: 'Review low-confidence fields', detail: '6 steps', system: 'Review', summary: 'Route uncertain values to a reviewer and fold corrections into the result.' },
  { group: 'Configuration', title: 'Configure extraction schema', detail: '4 steps', system: 'Settings', summary: 'Define fields, types, validation rules, and merge behavior for a flow.' },
  { group: 'Configuration', title: 'Set model and concurrency policy', detail: '5 steps', system: 'Settings', summary: 'Choose providers, fallbacks, timeouts, and parallel worker limits.' },
];

const fallbackSteps = [
  { id: 'batch-submitted', type: 'Event', title: 'PDF batch submitted', summary: 'A user starts a configured flow with one or more PDF documents.', system: 'Flow API', needs: 'PDF files, flow ID', produces: 'Accepted batch request', source: 'api/batches/createBatch.ts', lines: '18–54' },
  { id: 'load-config', type: 'Action', title: 'Fetch extraction configuration', summary: 'Pin the schema, model policy, and limits used for the entire run.', system: 'Config service', needs: 'Flow ID, tenant ID', produces: 'Immutable runtime configuration', source: 'pipeline/loadFlowConfig.ts', lines: '24–96', operations: ['Fetch published flow', 'Validate extraction schema', 'Generate runtime policy'] },
  { id: 'fan-out', type: 'Action', title: 'Prepare document extraction', summary: 'Create durable extraction work for every PDF while respecting configured capacity.', system: 'Orchestrator', needs: 'Batch request, runtime configuration', produces: 'Tracked document extractions', source: 'pipeline/fanOutDocuments.ts', lines: '31–118', operations: ['Create batch manifest', 'Trigger document extraction', 'Limit concurrent extractions'] },
  { id: 'extract-parallel', type: 'Action', title: 'Extract document information', summary: 'Recover text and generate schema-constrained fields for every PDF.', system: 'Worker pool', needs: 'Document extractions, runtime policy', produces: 'Per-document extraction results', source: 'workers/extractDocument.ts', lines: '42–176', operations: ['Parse PDF pages', 'Extract text and layout', 'Generate structured fields'] },
  { id: 'merge-results', type: 'Action', title: 'Merge extraction results', summary: 'Wait for every extraction, match repeated entities, and resolve field conflicts.', system: 'Merge service', needs: 'Document result promises, merge rules', produces: 'Unified extraction dataset', source: 'pipeline/mergeResults.ts', lines: '37–164', operations: ['Wait for document extractions', 'Match repeated entities', 'Resolve field conflicts'] },
  { id: 'dataset-ready', type: 'Outcome', title: 'Dataset ready', summary: 'The validated dataset and document-level evidence are available for review or export.', system: 'Results API', needs: 'Unified extraction dataset', produces: 'Versioned result with source evidence', source: 'results/publishDataset.ts', lines: '20–82' },
];

const fallbackStepSchemas = {
  'batch-submitted': {
    input: { title: 'Batch submission', fields: [{ name: 'files', type: 'FileRef[]', required: true, description: 'One or more PDF files.' }, { name: 'flowId', type: 'string · uuid', required: true, description: 'Published extraction flow.' }] },
    output: { title: 'Accepted batch request', fields: [{ name: 'batchId', type: 'string · uuid', required: true, description: 'Stable batch identifier.' }, { name: 'status', type: '"accepted"', required: true, description: 'Initial processing state.' }, { name: 'documentCount', type: 'integer', required: true, description: 'Accepted PDF count.' }] },
  },
  'load-config': {
    input: { title: 'Configuration lookup', fields: [{ name: 'flowId', type: 'string · uuid', required: true, description: 'Flow to load.' }, { name: 'tenantId', type: 'string · uuid', required: true, description: 'Owning tenant.' }] },
    output: { title: 'Runtime configuration', fields: [{ name: 'revisionId', type: 'string', required: true, description: 'Pinned flow revision.' }, { name: 'schema', type: 'SchemaPlan', required: true, description: 'Compiled field rules.' }, { name: 'policy', type: 'RuntimePolicy', required: true, description: 'Model and concurrency limits.' }] },
  },
  'fan-out': {
    input: { title: 'Extraction preparation', fields: [{ name: 'batch', type: 'BatchRequest', required: true, description: 'Accepted batch.' }, { name: 'config', type: 'RuntimeConfig', required: true, description: 'Pinned configuration.' }] },
    output: { title: 'Tracked extractions', fields: [{ name: 'manifestId', type: 'string · uuid', required: true, description: 'Durable manifest.' }, { name: 'tasks', type: 'TaskHandle[]', required: true, description: 'One handle per document.' }] },
  },
  'extract-parallel': {
    input: { title: 'Document extraction', fields: [{ name: 'tasks', type: 'TaskHandle[]', required: true, description: 'Tracked document work.' }, { name: 'policy', type: 'RuntimePolicy', required: true, description: 'Execution limits.' }] },
    output: { title: 'Document results', fields: [{ name: 'results', type: 'DocumentResult[]', required: true, description: 'Typed fields by document.' }, { name: 'evidence', type: 'Citation[]', required: true, description: 'Page-level source links.' }] },
  },
  'merge-results': {
    input: { title: 'Merge request', fields: [{ name: 'results', type: 'SettledResult[]', required: true, description: 'Successful and failed branches.' }, { name: 'rules', type: 'MergeRule[]', required: true, description: 'Field resolution policy.' }] },
    output: { title: 'Unified dataset', fields: [{ name: 'fields', type: 'Record<string, Value>', required: true, description: 'Resolved field values.' }, { name: 'reviewTasks', type: 'ReviewTask[]', required: false, description: 'Conflicts requiring review.' }] },
  },
  'dataset-ready': {
    input: { title: 'Publish request', fields: [{ name: 'dataset', type: 'UnifiedDataset', required: true, description: 'Validated merged result.' }] },
    output: { title: 'Published dataset', fields: [{ name: 'datasetId', type: 'string · uuid', required: true, description: 'Versioned result identifier.' }, { name: 'version', type: 'integer', required: true, description: 'Published version.' }, { name: 'evidence', type: 'Citation[]', required: true, description: 'Source evidence for values.' }] },
  },
};

const fallbackOperationDetails = {
  'Fetch published flow': { summary: 'Fetch the exact published flow revision requested by the batch.', logic: 'Reads the active revision once, resolves inherited defaults, then pins its version so later settings changes cannot alter an in-flight batch.', needs: 'Flow ID, tenant ID', produces: 'Pinned flow revision', source: 'pipeline/loadFlowConfig.ts', lines: '31–49', calls: [{ name: 'flowRepo.getPublished()', mode: 'await I/O', description: 'Fetches the tenant-scoped published flow and rejects drafts.', flow: 'flowId + tenantId → FlowRevision' }, { name: 'resolveInheritedDefaults()', mode: 'sync', description: 'Overlays organization defaults only where the flow has no explicit value.', flow: 'FlowRevision + OrgDefaults → ResolvedFlow' }, { name: 'pinRevision()', mode: 'transaction', description: 'Stores the revision ID on the batch before any worker can start.', flow: 'batchId + revisionId → PinnedBatch' }] },
  'Validate extraction schema': { summary: 'Compile field definitions into rules workers can enforce.', logic: 'Walks nested field definitions, rejects ambiguous paths and unsupported types, then compiles validators and merge strategies into an immutable schema plan.', needs: 'Resolved flow schema', produces: 'Compiled schema plan', source: 'schema/compileExtractionSchema.ts', lines: '18–87', calls: [{ name: 'walkFieldTree()', mode: 'sync', description: 'Flattens nested objects and arrays while preserving canonical field paths.', flow: 'FieldDefinition[] → FieldPath[]' }, { name: 'assertUniquePaths()', mode: 'sync', description: 'Fails fast when two fields would write to the same output location.', flow: 'FieldPath[] → ValidatedPaths' }, { name: 'compileFieldRules()', mode: 'CPU', description: 'Builds type validators, confidence thresholds, and per-field merge rules.', flow: 'ValidatedPaths → SchemaPlan' }] },
  'Generate runtime policy': { summary: 'Generate provider, retry, timeout, and concurrency rules.', logic: 'Normalizes limits, caps them against tenant quotas, and produces one policy object shared by the orchestrator and every worker.', needs: 'Flow settings, tenant quotas', produces: 'Runtime policy', source: 'pipeline/buildRuntimePolicy.ts', lines: '22–74', calls: [{ name: 'normalizeProviderChain()', mode: 'sync', description: 'Orders the primary model and fallbacks and removes duplicate providers.', flow: 'ProviderConfig[] → ProviderChain' }, { name: 'clampConcurrency()', mode: 'sync', description: 'Limits requested parallelism to the tenant and environment ceilings.', flow: 'requested + quotas → workerLimit' }, { name: 'createRetryPolicy()', mode: 'sync', description: 'Marks retryable errors and calculates exponential backoff with jitter.', flow: 'RetryConfig → RetryPolicy' }] },
  'Create batch manifest': { summary: 'Create the durable document inventory used by the extraction run.', logic: 'Hashes each PDF, assigns stable document IDs, and writes the batch plus document rows atomically so retries can resume without duplicating work.', needs: 'Accepted batch request', produces: 'Durable batch manifest', source: 'pipeline/fanOutDocuments.ts', lines: '39–67', calls: [{ name: 'hashDocuments()', mode: 'parallel I/O', description: 'Streams all files concurrently and computes content hashes without loading them fully into memory.', flow: 'PDF streams → ContentHash[]' }, { name: 'buildManifest()', mode: 'sync', description: 'Pairs stable IDs, object keys, hashes, and original ordering.', flow: 'BatchRequest + hashes → Manifest' }, { name: 'manifestRepo.insertAtomic()', mode: 'transaction', description: 'Writes the batch and every document row in one database transaction.', flow: 'Manifest → StoredManifest' }] },
  'Trigger document extraction': { summary: 'Trigger one idempotent extraction for every PDF.', logic: 'Maps manifest entries to durable queue messages, uses the document ID as the deduplication key, and records task handles used later by the merge barrier.', needs: 'Durable batch manifest', produces: 'Document extraction handles', source: 'pipeline/fanOutDocuments.ts', lines: '69–96', external: 'Task queue', calls: [{ name: 'manifest.documents.map()', mode: 'sync', description: 'Creates a worker payload containing the pinned configuration and document identity.', flow: 'ManifestDocument → WorkerPayload' }, { name: 'queue.enqueueMany()', mode: 'await I/O', boundary: 'Task queue', description: 'Publishes tasks in one broker call with per-document deduplication keys.', flow: 'WorkerPayload[] → QueueReceipt[]' }, { name: 'taskRepo.attachReceipts()', mode: 'transaction', description: 'Associates queue receipts with document rows for status tracking and recovery.', flow: 'receipts + documentIds → TaskHandle[]' }] },
  'Limit concurrent extractions': { summary: 'Limit extraction work to the configured worker capacity.', logic: 'Feeds queued tasks through a semaphore, releases capacity in finally blocks, and keeps failed branches observable instead of cancelling sibling work.', needs: 'Document extraction handles, worker limit', produces: 'Bounded async extractions', source: 'orchestrator/runWithLimit.ts', lines: '14–63', calls: [{ name: 'createSemaphore()', mode: 'sync', description: 'Creates a fair permit pool sized to the effective concurrency limit.', flow: 'workerLimit → Semaphore' }, { name: 'tasks.map(runWithPermit)', mode: 'async fan-out', description: 'Starts each task when a permit is available and returns a promise immediately.', flow: 'TaskHandle[] → Promise<Result>[]' }, { name: 'permit.release()', mode: 'finally', description: 'Returns capacity after success, failure, or timeout so the queue cannot deadlock.', flow: 'settled branch → available permit' }] },
  'Parse PDF pages': { summary: 'Parse each PDF into ordered, renderable page units.', logic: 'Streams the source PDF, validates encryption and page limits, then emits page descriptors and raster jobs while preserving original page order.', needs: 'PDF object key', produces: 'Ordered page jobs', source: 'workers/preparePdf.ts', lines: '27–91', external: 'Object storage', calls: [{ name: 'objectStore.openStream()', mode: 'await I/O', boundary: 'Object storage', description: 'Opens a bounded stream from object storage and verifies the content hash.', flow: 'objectKey → PDF stream' }, { name: 'pdf.inspect()', mode: 'CPU', description: 'Reads metadata, encryption state, dimensions, and page count before rendering.', flow: 'PDF stream → PdfMetadata' }, { name: 'renderPool.schedulePages()', mode: 'async fan-out', description: 'Queues page renders in parallel but returns descriptors in source order.', flow: 'PdfMetadata → Promise<PageImage>[]' }] },
  'Extract text and layout': { summary: 'Extract text, tables, and reading order from every page.', logic: 'Runs native-text extraction and OCR concurrently, selects the stronger text per region, then builds one layout graph ordered by page and geometry.', needs: 'Ordered page jobs', produces: 'Document layout graph', source: 'workers/analyzeLayout.ts', lines: '34–128', external: 'OCR API', calls: [{ name: 'Promise.all(pageAnalyses)', mode: 'async fan-out', boundary: 'OCR API', description: 'Analyzes independent pages concurrently under the document-level page limit.', flow: 'PageImage[] → PageAnalysis[]' }, { name: 'chooseTextSource()', mode: 'sync merge', description: 'Chooses native text or OCR per region using coverage and confidence signals.', flow: 'native + OCR regions → TextRegions' }, { name: 'buildLayoutGraph()', mode: 'CPU', description: 'Links headings, paragraphs, tables, and reading order across page boundaries.', flow: 'PageAnalysis[] → LayoutGraph' }] },
  'Generate structured fields': { summary: 'Generate schema-constrained values and source evidence.', logic: 'Chunks the layout graph by token budget, extracts candidates in parallel, then validates and repairs outputs before emitting typed fields with page citations.', needs: 'Layout graph, schema plan, model policy', produces: 'Document extraction result', source: 'workers/extractFields.ts', lines: '41–152', external: 'AI model API', calls: [{ name: 'chunkLayoutGraph()', mode: 'sync', description: 'Creates overlap-aware chunks that keep tables and their headings together.', flow: 'LayoutGraph + tokenBudget → ContextChunk[]' }, { name: 'model.extractBatch()', mode: 'async fan-out', boundary: 'AI model API', description: 'Runs schema-constrained extraction across chunks with provider fallback and timeout handling.', flow: 'ContextChunk[] → CandidateField[][]' }, { name: 'validateAndRepair()', mode: 'async merge', boundary: 'AI model API', description: 'Deduplicates candidates, validates types, and makes one targeted repair call for invalid values.', flow: 'candidates + SchemaPlan → ExtractedField[]' }] },
  'Wait for document extractions': { summary: 'Wait for every PDF extraction without losing partial successes.', logic: 'Uses allSettled rather than fail-fast aggregation, classifies retryable failures, and converts every branch into a normalized success-or-failure record for the merge stage.', needs: 'Bounded async extractions', produces: 'Settled document results', source: 'pipeline/mergeResults.ts', lines: '44–76', calls: [{ name: 'Promise.allSettled()', mode: 'async barrier', description: 'Waits until every document promise settles, even when some branches reject.', flow: 'Promise<DocumentResult>[] → SettledResult[]' }, { name: 'classifyFailures()', mode: 'sync', description: 'Separates retryable infrastructure failures from terminal document errors.', flow: 'SettledResult[] → ClassifiedResults' }, { name: 'normalizeBranchResult()', mode: 'sync merge', description: 'Wraps successes and failures in one ordered record keyed by document ID.', flow: 'ClassifiedResults → BranchResult[]' }] },
  'Match repeated entities': { summary: 'Match values that refer to the same real-world entity.', logic: 'Groups candidates by schema path, links likely duplicates with normalized keys and embeddings, then reduces each cluster using the field’s configured merge strategy.', needs: 'Settled document results, schema plan', produces: 'Entity clusters with merged values', source: 'pipeline/reconcileEntities.ts', lines: '29–119', calls: [{ name: 'groupBySchemaPath()', mode: 'sync', description: 'Prevents values from unrelated fields from entering the same comparison set.', flow: 'BranchResult[] → FieldCandidateMap' }, { name: 'linkDuplicateCandidates()', mode: 'parallel CPU', description: 'Combines exact normalized keys with bounded similarity matching for fuzzy entities.', flow: 'FieldCandidateMap → EntityCluster[]' }, { name: 'reduceCluster()', mode: 'sync merge', description: 'Applies first, union, sum, latest, or custom merge behavior per field.', flow: 'EntityCluster + MergeRule → MergedEntity' }] },
  'Resolve field conflicts': { summary: 'Resolve a field value or preserve a reviewable conflict.', logic: 'Scores competing values by confidence, source quality, and cross-document agreement; auto-resolves only above the configured margin and otherwise emits an explicit review task.', needs: 'Merged entities, conflict policy', produces: 'Unified dataset with review tasks', source: 'pipeline/resolveConflicts.ts', lines: '33–137', external: 'Review service', calls: [{ name: 'scoreCandidateEvidence()', mode: 'parallel CPU', description: 'Computes comparable scores from model confidence, OCR quality, and source agreement.', flow: 'ConflictingCandidate[] → ScoredCandidate[]' }, { name: 'selectAboveMargin()', mode: 'sync branch', description: 'Selects the leader only when it exceeds the runner-up by the policy margin.', flow: 'scores + margin → Resolution | Conflict' }, { name: 'reviewQueue.createMany()', mode: 'await I/O', boundary: 'Review service', description: 'Persists unresolved conflicts with citations and candidate explanations for reviewers.', flow: 'Conflict[] → ReviewTask[]' }] },
};

const stories = artifactStories;
const stepSchemas = artifactStepSchemas;
const operationDetails = artifactOperationDetails;

function Icon({ name, size = 18 }) {
  const paths = {
    story: <><path d="M5 4.5h8.5A2.5 2.5 0 0 1 16 7v9H7.5A2.5 2.5 0 0 1 5 13.5v-9Z"/><path d="M8 8h5M8 11h4"/></>,
    search: <><circle cx="9" cy="9" r="5"/><path d="m13 13 4 4"/></>,
    branch: <><circle cx="6" cy="5" r="2"/><circle cx="14" cy="15" r="2"/><path d="M6 7v3a5 5 0 0 0 5 5h1"/></>,
    source: <><path d="M6 3.5h6l3 3V17H6z"/><path d="M12 3.5V7h3M8.5 10h4M8.5 13h4"/></>,
    chevron: <path d="m8 5 5 5-5 5"/>,
    close: <path d="m6 6 8 8m0-8-8 8"/>,
    menu: <path d="M4 6h12M4 10h12M4 14h12"/>,
    compass: <><circle cx="10" cy="10" r="7"/><path d="m12.5 7.5-1.2 3.8-3.8 1.2 1.2-3.8z"/></>,
    grid: <><rect x="4" y="4" width="4" height="4" rx="1"/><rect x="12" y="4" width="4" height="4" rx="1"/><rect x="4" y="12" width="4" height="4" rx="1"/><rect x="12" y="12" width="4" height="4" rx="1"/></>,
    back: <path d="m12 5-5 5 5 5"/>,
    plus: <path d="M10 4v12M4 10h12"/>,
    help: <><circle cx="10" cy="10" r="7"/><path d="M8.3 7.7a2 2 0 1 1 2.7 1.9c-.7.3-1 .7-1 1.4M10 14h.01"/></>,
    external: <><path d="M8 5H5v10h10v-3"/><path d="M10 5h5v5M15 5l-6 6"/></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function LogoMark() {
  return <svg className="logo-mark" viewBox="0 0 38 46" aria-hidden="true"><path className="logo-frame" d="M30 10V7.5A5.5 5.5 0 0 0 24.5 2h-14A5.5 5.5 0 0 0 5 7.5v31"/><path className="logo-frame" d="M8 44h16.5a5.5 5.5 0 0 0 5.5-5.5V25"/><path className="logo-path" d="M26.8 12.3c-7.1 1-13.1 2.7-13.2 6.1-.1 2.6 4.3 4.2 7.5 6.1 3.4 2 5.6 4.2 3.9 7.1-2.2 3.8-9.1 5.2-16 6.1 5.1-2.8 9.4-5.5 9.5-8.5.1-2.3-3-3.8-6.1-5.7-3.5-2.2-6.2-4.7-4-7.7 2.5-3.2 10.2-3.9 18.4-3.5Z"/></svg>;
}

function NavigationRail({ view, onOpenStory, onOpenStories, onOpenShortcuts }) {
  return <aside className="nav-rail" aria-label="Workspace navigation">
    <button className="rail-logo" aria-label="Storyline home"><LogoMark /></button>
    <nav>
      <button className={`rail-button ${view === 'story' ? 'active' : ''}`} onClick={onOpenStory} aria-label="Current story"><Icon name="story"/><span>Story</span></button>
      <button className={`rail-button ${view === 'stories' ? 'active' : ''}`} onClick={onOpenStories} aria-label="All stories"><Icon name="grid"/><span>All</span></button>
      <button className="rail-button" aria-label="Search"><Icon name="search"/><span>Search</span></button>
      <button className="rail-button" onClick={onOpenShortcuts} aria-label="Keyboard shortcuts"><Icon name="help"/><span>Help</span></button>
    </nav>
    <div className="rail-bottom"><span className="status-dot"/><button className="avatar" aria-label="User profile">KM</button></div>
  </aside>;
}

function StoryTabs({ onOpenStories }) {
  return <div className="story-tabs">
    <button className="story-picker" onClick={onOpenStories}><span className="repo-mark">N</span><span><strong>northstar / document-ai</strong><small>7 stories</small></span><Icon name="chevron" size={14}/></button>
    <div className="tab-strip" role="tablist" aria-label="Open stories">
      <button className="story-tab active" role="tab" aria-selected="true"><span>Extract PDF batch</span><Icon name="close" size={13}/></button>
      <button className="story-tab" role="tab" aria-selected="false"><span>Review low-confidence fields</span><Icon name="close" size={13}/></button>
      <button className="new-tab" aria-label="Open another story"><Icon name="plus" size={15}/></button>
    </div>
  </div>;
}

function StoriesPopover({ open, onClose, activeStoryId, onSelectStory }) {
  if (!open) return null;
  return <div className="stories-popover" role="dialog" aria-label="Choose a story">
    <div className="popover-head"><div><strong>All product stories</strong><span>{projectName}</span></div><button onClick={onClose} aria-label="Close story picker"><Icon name="close"/></button></div>
    <label className="story-search"><Icon name="search"/><input autoFocus placeholder="Search stories…"/></label>
    <div className="popover-list">{stories.map((story) => <button key={story.id} className={story.id === activeStoryId ? 'active' : ''} onClick={() => onSelectStory(story.id)}><span className="story-pin"/><span><strong>{story.title}</strong><small>{story.group} · {story.detail}</small></span><Icon name="chevron" size={14}/></button>)}</div>
  </div>;
}

function StructureKey() {
  return <div className="structure-key" aria-label="Story structure">
    <span className="active">Story</span><Icon name="chevron" size={11}/><span>Step</span><Icon name="chevron" size={11}/><span>Implementation</span>
  </div>;
}

function CompactStoryHeader({ view, onStories, story }) {
  return <header className="content-header">
    <div className="content-breadcrumbs">
      {view === 'stories' ? <strong>Stories</strong> : <><button onClick={onStories}>Stories</button><Icon name="chevron" size={11}/><strong>{story?.title}</strong></>}
    </div>
    {view === 'story' && <StructureKey/>}
  </header>;
}

function StoriesIndex({ onOpenStory, activeStoryId }) {
  const groups = [...new Set(stories.map((story) => story.group))];
  return <section className="stories-index" aria-label="All product stories">
    <div className="stories-toolbar">
      <div><strong>{projectName}</strong><span>{stories.length} mapped stories across {groups.length} categories</span></div>
      <label><Icon name="search" size={16}/><input placeholder="Search stories" aria-label="Search stories"/><kbd>⌘K</kbd></label>
    </div>
    <div className="category-list">{groups.map((group) => {
      const groupedStories = stories.filter((story) => story.group === group);
      return <section className="category-band" key={group} aria-labelledby={`category-${group}`}>
        <header><h2 id={`category-${group}`}>{group}</h2><span>{groupedStories.length} {groupedStories.length === 1 ? 'story' : 'stories'}</span></header>
        <div className="category-stories">{groupedStories.map((story) => <button key={story.id} className={story.id === activeStoryId ? 'active' : ''} onClick={() => onOpenStory(story.id)}>
          <span className="story-status" aria-hidden="true"/><span className="story-copy"><strong>{story.title}</strong><small>{story.summary}</small></span><span className="story-system">{story.system}</span><span className="story-count">{story.detail}</span><Icon name="chevron" size={15}/>
        </button>)}</div>
      </section>;
    })}</div>
  </section>;
}

function ImplementationCall({ call, index }) {
  return <li className="implementation-call">
    <span>{String(index + 1).padStart(2, '0')}</span>
    <div><div className="call-heading"><code>{call.name}</code><span className="call-tags">{call.boundary && <em className="boundary-tag"><Icon name="external" size={10}/>{call.boundary}</em>}<em>{call.mode}</em></span></div><p>{call.description}</p><small className="call-flow">{call.flow}</small></div>
  </li>;
}

function ImplementationInputsUsed({ detail }) {
  const needs = typeof detail?.needs === 'string' ? detail.needs.trim() : '';
  const fields = detail?.inputs?.length
    ? detail.inputs
    : needs.split(',').filter(Boolean).map((input) => {
      const label = input.trim();
      return {
        name: label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
        description: `${label} required by this Implementation part.`,
      };
    });

  if (fields.length === 0) return null;

  return <section className="implementation-inputs-used">
    <h4>Inputs used</h4>
    <dl>{fields.map((field) => <div key={field.name}><dt><code>{field.name}</code></dt><dd>{field.description}</dd></div>)}</dl>
  </section>;
}

function ImplementationItem({ name, detail, defaultOpen }) {
  return <details className="implementation-item" open={defaultOpen}>
    <summary><span><small>Implementation part</small><strong>{name}</strong><em>{detail?.summary}</em></span><Icon name="chevron" size={15}/></summary>
    <div className="implementation-body">
      <ImplementationInputsUsed detail={detail}/>
      {detail?.logic && <p className="implementation-logic">{detail.logic}</p>}
      <div className="implementation-source"><Icon name="source" size={15}/><code>{detail?.source}</code><span>Lines {detail?.lines}</span></div>
      {detail?.calls?.length > 0 && <ol className="implementation-calls">{detail.calls.map((call, index) => <ImplementationCall call={call} index={index} key={call.name}/>)}</ol>}
    </div>
  </details>;
}

function InputsUsed({ schema }) {
  if (!schema?.fields?.length) return null;

  return <section className="inputs-used" aria-labelledby={`inputs-${schema.title.replaceAll(' ', '-').toLowerCase()}`}>
    <h3 id={`inputs-${schema.title.replaceAll(' ', '-').toLowerCase()}`}>Inputs used</h3>
    <dl>{schema.fields.map((field) => <div key={field.name}><dt><code>{field.name}</code></dt><dd>{field.description}</dd></div>)}</dl>
  </section>;
}

function StepImplementation({ step, focused }) {
  const parts = step.operations?.map((name) => ({ name, detail: operationDetails[name] })) || [];
  const schemas = stepSchemas[step.id];
  return <div className="step-implementation">
    <InputsUsed schema={schemas?.input ?? { title: 'Input', fields: [] }}/>
    {parts.length > 0 ? <><div className="implementation-heading"><div><small>Implementation</small><strong>{parts.length} parts</strong></div></div><div className="implementation-list">{parts.map(({ name, detail }, index) => <ImplementationItem name={name} detail={detail} defaultOpen={focused && index === 0} key={name}/>)}</div></> : <div className="implementation-entry"><Icon name="source" size={15}/><span><strong>{step.type === 'Event' ? 'Event entry point' : 'Outcome publisher'}</strong><code>{step.source} · Lines {step.lines}</code></span></div>}
  </div>;
}

function StoryStep({ step, index, totalSteps, selected, expanded, focused, onSelect, onFocus, onToggle }) {
  return <li className={`route-stop ${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`} data-nav-id={step.id}>
    <div className="route-index" aria-hidden="true"><span>{index + 1}</span></div>
    <article className="step-card">
      {focused && <div className="focus-bar"><span>Focused Step · {index + 1} of {totalSteps}</span><button onClick={() => onFocus(null)}><Icon name="close" size={15}/>Exit focus</button></div>}
      <button className="step-main" onClick={() => { onSelect(step); onToggle(step.id); }} aria-label={`${expanded ? 'Contract' : 'Expand'} ${step.title}`} aria-expanded={expanded}>
        <span className="step-type">{step.type}</span><span className="step-system">{step.system}</span>
        <strong>{step.title}</strong><span className="step-summary">{step.summary}</span>
      </button>
      <div className="step-actions"><button onClick={() => { onSelect(step); onToggle(step.id); }} aria-expanded={expanded}>{expanded ? 'Hide implementation' : 'Show implementation'} <Icon name="chevron" size={14}/></button>{expanded && !focused && <button onClick={() => onFocus(step.id)}><Icon name="grid" size={13}/>Focus full screen</button>}</div>
      {expanded && <StepImplementation step={step} focused={focused}/>}
    </article>
  </li>;
}

function FlowView({ story, steps, selectedId, expanded, focusedId, onSelect, onFocus, onToggle }) {
  return <section className="story-canvas" aria-label={`${story.title} Story`}>
    <header className="story-intro"><div><span>Story · {story.group}</span><h1>{story.title}</h1><p>{story.summary}</p></div><dl><div><dt>Starts with</dt><dd>{steps[0]?.title ?? 'Not mapped'}</dd></div><div><dt>Ends with</dt><dd>{steps.at(-1)?.title ?? 'Not mapped'}</dd></div><div><dt>Steps</dt><dd>{String(steps.length).padStart(2, '0')}</dd></div></dl></header>
    <div className="timeline-label"><span>Story timeline</span><em>Select any Step to reveal its Implementation</em></div>
    <ol className="story-route">{steps.map((step, index) => <StoryStep key={step.id} step={step} index={index} totalSteps={steps.length} selected={selectedId === step.id} expanded={expanded.has(step.id)} focused={focusedId === step.id} onSelect={onSelect} onFocus={onFocus} onToggle={onToggle}/>)}</ol>
    <div className="route-end"><span>{steps.at(-1)?.summary ?? 'Story complete.'}</span></div>
    {focusedId && <button className="focus-backdrop" aria-label="Exit full-screen Step" onClick={() => onFocus(null)}/>}</section>;
}

function ShortcutModal({ open, onClose }) {
  if (!open) return null;
  const shortcuts = [['↑ / ↓', 'Move between Steps'], ['→ / Enter', 'Expand the selected Step'], ['←', 'Contract the selected Step'], ['Esc', 'Exit full-screen focus']];
  return <div className="shortcut-modal" role="dialog" aria-modal="true" aria-labelledby="shortcut-title"><div className="shortcut-modal-head"><div><h2 id="shortcut-title">Navigate the Story</h2><p>Stay on the timeline as you inspect Implementation.</p></div><button onClick={onClose} aria-label="Close keyboard shortcuts"><Icon name="close"/></button></div><ul>{shortcuts.map(([keys, label]) => <li key={keys}><kbd>{keys}</kbd><span>{label}</span></li>)}</ul></div>;
}

function App() {
  const [activeStoryId, setActiveStoryId] = useState(stories[0]?.id);
  const activeStory = stories.find((story) => story.id === activeStoryId) ?? stories[0];
  const steps = stepsByStory[activeStory?.id] ?? [];
  const [view, setView] = useState('story');
  const [selectedId, setSelectedId] = useState(steps[0]?.id);
  const [focusId, setFocusId] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const toggle = (id) => setExpanded((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const setFocus = (id) => { if (id) { setExpanded((current) => new Set(current).add(id)); setSelectedId(id); } setFocusId(id); };
  const scrollToSelection = (id) => requestAnimationFrame(() => document.querySelector(`[data-nav-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  const selectStory = (storyId) => {
    const nextSteps = stepsByStory[storyId] ?? [];
    setActiveStoryId(storyId);
    setSelectedId(nextSteps[0]?.id);
    setExpanded(new Set());
    setFocusId(null);
    setStoriesOpen(false);
    setView('story');
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && shortcutsOpen) { event.preventDefault(); setShortcutsOpen(false); return; }
      if (view === 'stories' || storiesOpen || shortcutsOpen || event.metaKey || event.ctrlKey || event.altKey || ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Escape' && focusId) { setFocus(null); return; }
      const currentIndex = Math.max(0, steps.findIndex((step) => step.id === selectedId));
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const offset = event.key === 'ArrowUp' ? -1 : 1;
        const next = steps[Math.max(0, Math.min(steps.length - 1, currentIndex + offset))];
        setSelectedId(next.id); scrollToSelection(next.id);
      } else if (steps[currentIndex] && (event.key === 'ArrowRight' || event.key === 'Enter')) setExpanded((current) => new Set(current).add(steps[currentIndex].id));
      else if (steps[currentIndex] && event.key === 'ArrowLeft' && expanded.has(steps[currentIndex].id)) toggle(steps[currentIndex].id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded, focusId, selectedId, shortcutsOpen, storiesOpen, view]);

  useEffect(() => {
    document.body.classList.toggle('step-focus-open', Boolean(focusId));
    return () => document.body.classList.remove('step-focus-open');
  }, [focusId]);

  const showStory = () => { setView('story'); setFocus(null); setStoriesOpen(false); };
  const showStories = () => { setView('stories'); setFocus(null); setStoriesOpen(false); };

  return <div className="app-shell">
    <NavigationRail view={view} onOpenStory={showStory} onOpenStories={showStories} onOpenShortcuts={() => setShortcutsOpen(true)}/>
    <main className="workspace" id="flow">
      <CompactStoryHeader view={view} onStories={showStories} story={activeStory}/>
      {view === 'stories' ? <StoriesIndex onOpenStory={selectStory} activeStoryId={activeStoryId}/> : activeStory ? (
        <div className="workspace-grid"><FlowView story={activeStory} steps={steps} selectedId={selectedId} expanded={expanded} focusedId={focusId} onSelect={(step) => setSelectedId(step.id)} onFocus={setFocus} onToggle={toggle}/></div>
      ) : (
        <div className="empty">This artifact has no Stories.</div>
      )}
    </main>
    <StoriesPopover open={storiesOpen} onClose={() => setStoriesOpen(false)} activeStoryId={activeStoryId} onSelectStory={selectStory}/>
    {storiesOpen && <button className="popover-backdrop" aria-label="Close stories" onClick={() => setStoriesOpen(false)}/>}
    <ShortcutModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)}/>
    {shortcutsOpen && <button className="popover-backdrop" aria-label="Close keyboard shortcuts" onClick={() => setShortcutsOpen(false)}/>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
