import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { deriveSchemaChanges, loadArtifact } from './viewer-data.js';

const ICON_PATHS = {
  story: <><path d="M5 4.5h8.5A2.5 2.5 0 0 1 16 7v9H7.5A2.5 2.5 0 0 1 5 13.5v-9Z"/><path d="M8 8h5M8 11h4"/></>,
  search: <><circle cx="9" cy="9" r="5"/><path d="m13 13 4 4"/></>,
  branch: <><circle cx="6" cy="5" r="2"/><circle cx="14" cy="15" r="2"/><path d="M6 7v3a5 5 0 0 0 5 5h1"/></>,
  source: <><path d="M6 3.5h6l3 3V17H6z"/><path d="M12 3.5V7h3M8.5 10h4M8.5 13h4"/></>,
  chevron: <path d="m8 5 5 5-5 5"/>,
  close: <path d="m6 6 8 8m0-8-8 8"/>,
  compass: <><circle cx="10" cy="10" r="7"/><path d="m12.5 7.5-1.2 3.8-3.8 1.2 1.2-3.8z"/></>,
  grid: <><rect x="4" y="4" width="4" height="4" rx="1"/><rect x="12" y="4" width="4" height="4" rx="1"/><rect x="4" y="12" width="4" height="4" rx="1"/><rect x="12" y="12" width="4" height="4" rx="1"/></>,
  help: <><circle cx="10" cy="10" r="7"/><path d="M8.3 7.7a2 2 0 1 1 2.7 1.9c-.7.3-1 .7-1 1.4M10 14h.01"/></>,
  external: <><path d="M8 5H5v10h10v-3"/><path d="M10 5h5v5M15 5l-6 6"/></>,
  copy: <><rect x="7" y="7" width="8" height="9" rx="1.5"/><path d="M5 12V5.5A1.5 1.5 0 0 1 6.5 4H12"/></>,
  flow: <><path d="M4 5h12M4 10h7M4 15h12"/><circle cx="14" cy="10" r="2"/></>,
  arrow: <path d="M4 10h11m-4-4 4 4-4 4"/>,
  alert: <><path d="M10 3 18 17H2L10 3Z"/><path d="M10 8v4M10 14h.01"/></>,
  refresh: <><path d="M16 7V3m0 0-3 3m3-3a7 7 0 1 0 1 8"/></>,
};

function Icon({ name, size = 18 }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON_PATHS[name]}</svg>;
}

function LogoMark() {
  return <svg className="logo-mark" viewBox="0 0 38 46" aria-hidden="true"><path className="logo-frame" d="M30 10V7.5A5.5 5.5 0 0 0 24.5 2h-14A5.5 5.5 0 0 0 5 7.5v31"/><path className="logo-frame" d="M8 44h16.5a5.5 5.5 0 0 0 5.5-5.5V25"/><path className="logo-path" d="M26.8 12.3c-7.1 1-13.1 2.7-13.2 6.1-.1 2.6 4.3 4.2 7.5 6.1 3.4 2 5.6 4.2 3.9 7.1-2.2 3.8-9.1 5.2-16 6.1 5.1-2.8 9.4-5.5 9.5-8.5.1-2.3-3-3.8-6.1-5.7-3.5-2.2-6.2-4.7-4-7.7 2.5-3.2 10.2-3.9 18.4-3.5Z"/></svg>;
}

const kindLabel = { added: 'Added', removed: 'No longer present', changed: 'Changed', preserved: 'Unchanged' };

function readUrlState(stories, stepsByStory) {
  const params = new URLSearchParams(window.location.search);
  const view = ['story', 'stories', 'flow'].includes(params.get('view')) ? params.get('view') : 'story';
  const storyId = stories.some((story) => story.id === params.get('story')) ? params.get('story') : stories[0]?.id;
  const storySteps = stepsByStory[storyId] ?? [];
  const stepId = storySteps.some((step) => step.id === params.get('step')) ? params.get('step') : storySteps[0]?.id;
  return { view, storyId, stepId };
}

function writeUrlState({ view, storyId, stepId }) {
  const params = new URLSearchParams(window.location.search);
  if (view === 'story') params.delete('view');
  else params.set('view', view);
  if (storyId) params.set('story', storyId);
  else params.delete('story');
  if (view === 'story' && stepId) params.set('step', stepId);
  else params.delete('step');
  params.delete('panel');
  params.delete('focus');
  const query = params.toString();
  window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
}

function NavigationRail({ view, onOpenStory, onOpenStories, onOpenFlow, onOpenSearch, onOpenHelp }) {
  const links = [
    ['story', 'Story', 'story', onOpenStory],
    ['stories', 'Stories', 'grid', onOpenStories],
    ['flow', 'Flow', 'flow', onOpenFlow],
    ['search', 'Search', 'search', onOpenSearch],
  ];
  return <aside className="nav-rail" aria-label="Workspace navigation">
    <button className="rail-logo" aria-label="Storyline home" onClick={onOpenStory}><LogoMark /></button>
    <nav>{links.map(([id, label, icon, onClick]) => <button key={id} className={`rail-button ${view === id ? 'active' : ''}`} onClick={onClick} aria-current={view === id ? 'page' : undefined} aria-label={label}><Icon name={icon}/><span>{label}</span></button>)}</nav>
    <button className="rail-help" onClick={onOpenHelp} aria-label="Keyboard shortcuts"><Icon name="help"/><span>Help</span></button>
    <div className="rail-bottom"><span className="status-dot" aria-label="Artifact available"/><button className="avatar" aria-label="User profile">KM</button></div>
  </aside>;
}

function Topbar({ view, projectName, story, metadata, diagnostics, onOpenStories, onOpenSearch }) {
  const label = view === 'stories' ? 'All stories' : view === 'flow' ? 'Data flow' : story?.title ?? 'Story';
  const artifactLabel = metadata.gitDirty ? 'Source changed' : diagnostics.length ? `${diagnostics.length} notes` : 'Verified';
  return <header className="topbar">
    <div className="topbar-context"><button className="project-link" onClick={onOpenStories}>{projectName}</button><span aria-hidden="true">/</span><strong>{label}</strong></div>
    <div className="topbar-actions"><button className="search-trigger" onClick={onOpenSearch}><Icon name="search" size={16}/><span>Search Stories, Steps, and source</span><kbd>⌘K</kbd></button><details className="artifact-health"><summary className="status-chip"><span className="status-dot"/>{artifactLabel}<Icon name="chevron" size={13}/></summary><div className="artifact-health-popover"><strong>Artifact health</strong><p>{metadata.gitDirty ? 'Source changed since this artifact was generated.' : metadata.gitCommit ? `Verified at commit ${metadata.gitCommit.slice(0, 7)}.` : 'Artifact verified.'}</p>{diagnostics.map((diagnostic, index) => <p className="diagnostic-line" key={`${diagnostic.message}-${index}`}><Icon name={diagnostic.severity === 'warning' ? 'alert' : 'compass'} size={14}/>{diagnostic.message}</p>)}</div></details></div>
  </header>;
}

function StoryHeader({ story }) {
  return <header className="story-header">
    <div className="story-heading-row">
      <div className="story-heading-copy"><h1>{story.title}</h1><p>{story.summary}</p></div>
    </div>
    <div className="story-meta-row"><span>{story.group}</span><span>{story.system}</span><span className={`status-label ${story.status ?? 'confirmed'}`}>{story.status ?? 'confirmed'}</span></div>
  </header>;
}

function StoriesIndex({ stories, projectName, activeStoryId, onOpenStory }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return stories;
    return stories.filter((story) => [story.title, story.summary, story.group, story.system].some((value) => value?.toLowerCase().includes(term)));
  }, [query, stories]);
  const groups = [...new Set(filtered.map((story) => story.group))];
  return <section className="stories-index" aria-label="All product stories">
    <div className="stories-toolbar"><div><h1>Stories</h1><p>{projectName} · {stories.length} mapped stories</p></div><label className="search-field"><Icon name="search" size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" aria-label="Search stories"/><kbd>⌘K</kbd></label></div>
    {filtered.length === 0 ? <EmptyState icon="search" title="No stories found" body={`Nothing matches “${query}”. Try a Story title, system, or category.`} action={query ? () => setQuery('') : undefined} actionLabel="Clear search"/> : <div className="category-list">{groups.map((group) => {
      const groupedStories = filtered.filter((story) => story.group === group);
      return <section className="category-band" key={group} aria-labelledby={`category-${group}`}><header><h2 id={`category-${group}`}>{group}</h2><span>{groupedStories.length} {groupedStories.length === 1 ? 'story' : 'stories'}</span></header><div className="category-stories">{groupedStories.map((story) => <button key={story.id} className={story.id === activeStoryId ? 'active' : ''} onClick={() => onOpenStory(story.id)}><span className="story-status" aria-hidden="true"/><span className="story-copy"><strong>{story.title}</strong><small>{story.summary}</small></span><span className="story-system">{story.system}</span><span className="story-count">{story.detail}</span><Icon name="chevron" size={15}/></button>)}</div></section>;
    })}</div>}
  </section>;
}

function StepChangePills({ changes = [] }) {
  if (!changes.length) return null;
  const sign = { added: '+', removed: '−', changed: '~' };
  return <span className="field-change-pills">{changes.map((change, index) => { const isSplit = change.kind === 'changed' && /\bsplit\b/i.test(change.description ?? ''); const fieldName = isSplit ? `${change.from} → multiple ${change.to}` : change.kind === 'added' ? (change.from && change.from !== change.to ? `${change.from}.${change.to}` : change.to) : change.kind === 'removed' ? change.from : (change.from && change.to && change.from !== change.to ? `${change.from} → ${change.to}` : change.to ?? change.from); const label = `${kindLabel[change.kind] ?? change.kind}: ${fieldName}. ${change.description}`; return <span className={`field-change-pill ${change.kind}`} data-tooltip={change.description} aria-label={label} key={`${change.kind}-${fieldName}-${index}`}><span aria-hidden="true">{sign[change.kind] ?? '·'}</span><code>{fieldName}</code></span>; })}</span>;
}

function SchemaFields({ schema, schemaById, showTitle = true, depth = 0, full = false }) {
  const [showAll, setShowAll] = useState(false);
  if (!schema) return <p className="muted-copy">No schema recorded at this boundary.</p>;
  const visibleFields = full || showAll ? schema.fields : schema.fields.slice(0, 6);
  return <div className="schema-fields">{showTitle && <div className="schema-title"><strong>{schema.title}</strong><span>{schema.fields.length} fields</span></div>}{visibleFields.map((field) => { const linkedSchema = depth < 6 && field.schemaId ? schemaById?.get(field.schemaId) : null; return <div className="schema-field" key={field.name}><code>{field.name}</code><span>{field.type}</span>{field.required && <em>required</em>}<p>{field.description}</p>{linkedSchema && <details className="linked-schema" open={full || undefined}><summary><Icon name="chevron" size={13}/>{full ? linkedSchema.title : `View ${linkedSchema.title}`}</summary><SchemaFields schema={linkedSchema} schemaById={schemaById} depth={depth + 1} full={full}/></details>}</div>; })}{!full && schema.fields.length > 6 && <button className="show-schema-fields" onClick={(event) => { event.stopPropagation(); setShowAll((value) => !value); }}>{showAll ? 'Show fewer fields' : `Show all ${schema.fields.length} fields`}</button>}</div>;
}

function BoundarySchemaCard({ direction, schema, schemaById, changes = [], onOpenJson }) {
  const addedFields = new Set(changes.filter((change) => change.kind === 'added').map((change) => change.to));
  return <section className={`boundary-schema-card ${direction.toLowerCase()}`}><header><span>{direction}</span><button className="schema-json-button" onClick={(event) => { event.stopPropagation(); onOpenJson(schema, direction); }}><span>JSON</span><Icon name="external" size={11}/></button></header><div className="schema-fields">{(schema?.fields ?? []).slice(0, 6).map((field) => <div className="schema-field" key={field.name}><code>{field.name}</code><span>{field.type}</span>{field.required && <em>required</em>}{direction === 'Output' && addedFields.has(field.name) && <b className="field-added" aria-label="Added in this Step">+ added</b>}<p>{field.description}</p></div>)}</div></section>;
}

function schemaType(type = '') {
  const base = type.replace(/\[.*\]$/, '');
  if (/^(string|number|integer|boolean)$/.test(base)) return { type: base };
  if (/^(URL|datetime)$/.test(base)) return { type: 'string', format: base === 'URL' ? 'uri' : 'date-time' };
  return { type: 'object', title: base };
}

function schemaAsJson(schema, schemaById) {
  const definitions = {};
  const build = (item, seen = new Set()) => {
    if (!item) return {};
    const properties = {};
    const required = [];
    for (const field of item.fields ?? []) {
      const isArray = /\[.*\]$/.test(field.type);
      let shape;
      if (field.schemaId) {
        const linked = schemaById?.get(field.schemaId);
        if (linked && !seen.has(field.schemaId)) {
          definitions[field.schemaId] = build(linked, new Set([...seen, field.schemaId]));
        }
        shape = isArray ? { type: 'array', items: { $ref: `#/$defs/${field.schemaId}` } } : { $ref: `#/$defs/${field.schemaId}` };
      } else {
        const primitive = schemaType(field.type);
        shape = isArray ? { type: 'array', items: primitive } : primitive;
      }
      properties[field.name] = { ...shape, description: field.description };
      if (field.required) required.push(field.name);
    }
    return { title: item.title, type: 'object', properties, ...(required.length ? { required } : {}) };
  };
  const root = build(schema, new Set([schema?.id]));
  return { $schema: 'https://json-schema.org/draft/2020-12/schema', ...root, ...(Object.keys(definitions).length ? { $defs: definitions } : {}) };
}

function JsonSchemaDialog({ schema, direction, schemaById, onClose }) {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef(null);
  useEffect(() => { if (schema) { setCopied(false); requestAnimationFrame(() => copyRef.current?.focus()); } }, [schema]);
  if (!schema) return null;
  const json = JSON.stringify(schemaAsJson(schema, schemaById), null, 2);
  const copy = async () => { await navigator.clipboard.writeText(json); setCopied(true); };
  return <div className="focus-layer json-schema-layer" role="dialog" aria-modal="true" aria-labelledby="json-schema-title"><button className="layer-backdrop" onClick={onClose} aria-label="Close JSON schema"/><div className="json-schema-dialog"><header><div><span>{direction} JSON schema</span><strong id="json-schema-title">{schema.title}</strong></div><div><button ref={copyRef} onClick={copy}><Icon name="copy" size={14}/>{copied ? 'Copied' : 'Copy schema'}</button><button onClick={onClose}><Icon name="close" size={14}/>Close</button></div></header><pre>{json}</pre></div></div>;
}

function SchemaSummary({ step }) {
  const changes = (step.schemaChanges ?? []).filter((change) => change.kind !== 'preserved');
  const unchanged = (step.schemaChanges ?? []).filter((change) => change.kind === 'preserved');
  return <div className="schema-summary"><div className="schema-summary-head"><div><strong>Schema diff</strong></div><span>{changes.length ? `${changes.length} documented` : 'No structural changes'}</span></div><SchemaChangeList changes={changes}/>{unchanged.length > 0 && <details className="unchanged-fields"><summary>{unchanged.length} unchanged {unchanged.length === 1 ? 'field' : 'fields'}</summary><div>{unchanged.map((change, index) => <code key={`${change.to}-${index}`}>{change.to ?? change.from}</code>)}</div></details>}</div>;
}

function SchemaChangeList({ changes }) {
  if (!changes.length) return null;
  const sign = { added: '+', removed: '−', changed: '~' };
  return <div className="schema-diff">{changes.map((change, index) => <div className={`schema-diff-line ${change.kind}`} key={`${change.kind}-${change.from}-${change.to}-${index}`}><span aria-hidden="true">{sign[change.kind] ?? '·'}</span><code>{change.from && change.to && change.from !== change.to ? `${change.from} → ${change.to}` : change.to ?? change.from}</code><em>{kindLabel[change.kind] ?? change.kind}</em><p>{change.description}</p></div>)}</div>;
}

function ImplementationCall({ call, index }) {
  return <li className="implementation-call"><span>{String(index + 1).padStart(2, '0')}</span><div><div className="call-heading"><code>{call.name}</code><span className="call-tags">{call.boundary && <em className="boundary-tag"><Icon name="external" size={10}/>{call.boundary}</em>}{call.mode && <em>{call.mode}</em>}</span></div><p>{call.description}</p>{call.flow && <small className="call-flow">{call.flow}</small>}</div></li>;
}

function ImplementationItem({ name, detail, defaultOpen = false }) {
  return <details className="implementation-item" open={defaultOpen}><summary><span><small>Implementation</small><strong>{name.replace(/^implementation:[^:]+:/, '')}</strong><em>{detail?.summary ?? 'Implementation detail is not documented.'}</em></span><Icon name="chevron" size={15}/></summary><div className="implementation-body">{detail?.logic && <p className="implementation-logic">{detail.logic}</p>}<div className="implementation-source"><Icon name="source" size={15}/><code>{detail?.source ?? 'No source evidence'}</code><span>Lines {detail?.lines ?? '—'}</span></div>{detail?.calls?.length > 0 && <ol className="implementation-calls">{detail.calls.map((call, index) => <ImplementationCall call={call} index={index} key={`${call.name}-${index}`}/>)}</ol>}</div></details>;
}

function StepImplementation({ step, operationDetails }) {
  const parts = step.operations?.map((name) => ({ name, detail: operationDetails[name] })) ?? [];
  return <div className="step-implementation">{parts.length ? <div className="implementation-list">{parts.map(({ name, detail }) => <ImplementationItem key={name} name={name} detail={detail}/>)}</div> : <p className="muted-copy">No implementation trace is documented for this Step.</p>}</div>;
}

function Pseudocode({ step, operationDetails }) {
  const parts = step.operations?.map((id) => ({ id, detail: operationDetails[id] })) ?? [];
  const asInstruction = (text) => text ? text.replace(/[.]$/, '').replace(/^./, (letter) => letter.toLowerCase()) : null;
  const instructions = parts.flatMap(({ detail }) => detail?.calls?.map((call) => asInstruction(call.description)) ?? (detail?.summary ? [asInstruction(detail.summary)] : [])).filter(Boolean);
  const actions = [`Read ${step.inputSchema?.title ?? 'the Step input'}`, ...instructions.map((instruction) => instruction.charAt(0).toUpperCase() + instruction.slice(1)), `Return ${step.outputSchema?.title ?? 'the Step output'}`];
  return <div className="pseudocode"><div className="pseudocode-head"><strong>High-level logic</strong></div><pre aria-label={`High-level logic for ${step.title}`}><code><span className="logic-trigger">{`on "${step.title}"`}</span>{actions.map((action, index) => <span className={`logic-line ${index === 0 ? 'logic-input' : index === actions.length - 1 ? 'logic-output' : 'logic-transform'}`} key={`${action}-${index}`}>{`${index + 1}. ${action}`}</span>)}</code></pre></div>;
}

function StepDetails({ step, operationDetails, schemaById, onOpenDetail, onOpenJson }) {
  const hasChanges = (step.schemaChanges ?? []).some((change) => change.kind !== 'preserved');
  return <div className="step-details"><section className="step-detail-section"><div className="step-detail-heading"><span>Data</span>{!hasChanges && <small className="no-field-changes">No field changes</small>}</div><div className="boundary-schema-grid"><BoundarySchemaCard direction="Input" schema={step.inputSchema} schemaById={schemaById} onOpenJson={onOpenJson}/><span className="boundary-arrow"><Icon name="arrow" size={22}/></span><BoundarySchemaCard direction="Output" schema={step.outputSchema} schemaById={schemaById} changes={step.schemaChanges} onOpenJson={onOpenJson}/></div></section><section className="step-detail-section logic-section"><Pseudocode step={step} operationDetails={operationDetails}/><button className="open-detail-button" onClick={(event) => { event.stopPropagation(); onOpenDetail(step.id); }}>View implementation details <Icon name="arrow" size={14}/></button></section></div>;
}

function StoryStep({ step, index, selected, expanded, onToggle, operationDetails, schemaById, onOpenDetail, onOpenJson }) {
  const toggleFromCard = (event) => {
    if (event.target.closest('button, a, summary, input, textarea, select')) return;
    onToggle(step.id);
  };
  const changes = (step.schemaChanges ?? []).filter((change) => ['added', 'changed'].includes(change.kind));
  return <li className={`route-stop ${selected ? 'selected' : ''} ${expanded ? 'expanded' : ''}`} data-nav-id={step.id}><div className="route-index" aria-hidden="true"><span>{index + 1}</span></div><article className="step-card" onClick={toggleFromCard}><button className="step-main" onClick={() => onToggle(step.id)} aria-expanded={expanded}><span className="step-type">{step.type}</span><span className="step-system">{step.system}</span><strong>{step.title}</strong><span className="step-summary">{step.summary}</span><StepChangePills changes={changes}/><span className="step-toggle-label">{expanded ? 'Collapse Step' : 'Expand Step'}<Icon name="chevron" size={15}/></span></button>{expanded && <StepDetails step={step} operationDetails={operationDetails} schemaById={schemaById} onOpenDetail={onOpenDetail} onOpenJson={onOpenJson}/>}</article></li>;
}

function FieldLedger({ step }) {
  const changes = step.schemaChanges ?? [];
  const inputFields = new Map((step.inputSchema?.fields ?? []).map((field) => [field.name, field]));
  const outputFields = new Map((step.outputSchema?.fields ?? []).map((field) => [field.name, field]));
  if (!changes.length) return <p className="muted-copy">No field continuity is documented for this Step.</p>;
  return <section className="modal-field-ledger"><header><h2>Field continuity</h2><p>See which fields remain, change shape, appear, or leave this Step.</p></header><div className="field-ledger">{changes.map((change, index) => {
    const isSplit = change.kind === 'changed' && /\bsplit\b/i.test(change.description ?? '');
    const fieldName = isSplit ? `${change.from} → multiple ${change.to}` : change.from && change.to && change.from !== change.to ? `${change.from} → ${change.to}` : change.to ?? change.from;
    const field = outputFields.get(change.to) ?? inputFields.get(change.from);
    const state = change.kind === 'preserved' ? 'kept' : change.kind;
    const mark = change.kind === 'added' ? '+' : change.kind === 'removed' ? '−' : change.kind === 'changed' ? '→' : '•';
    return <div className={state} key={`${change.kind}-${fieldName}-${index}`}><span className="continuity-mark" aria-hidden="true">{mark}</span><code>{fieldName}</code><span>{field?.type ?? change.description}</span><strong>{state}</strong><p>{change.description}</p></div>;
  })}</div></section>;
}

function StepDetailDialog({ step, operationDetails, onClose }) {
  const [tab, setTab] = useState('implementation');
  const closeRef = useRef(null);
  useEffect(() => { if (step) { setTab('implementation'); requestAnimationFrame(() => closeRef.current?.focus()); } }, [step]);
  if (!step) return null;
  return <div className="focus-layer" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button className="layer-backdrop" onClick={onClose} aria-label="Close detailed Step view"/><div className="focus-dialog"><header className="focus-bar"><div><span>Detailed Step</span><strong id="detail-title">{step.title}</strong></div><button ref={closeRef} onClick={onClose}><Icon name="close" size={15}/>Close</button></header><nav className="detail-tabs" aria-label="Detailed Step sections"><button className={tab === 'implementation' ? 'active' : ''} onClick={() => setTab('implementation')} aria-current={tab === 'implementation' ? 'page' : undefined}>Implementation</button><button className={tab === 'schema' ? 'active' : ''} onClick={() => setTab('schema')} aria-current={tab === 'schema' ? 'page' : undefined}>Field changes</button></nav><div className="focus-content">{tab === 'implementation' && <><Pseudocode step={step} operationDetails={operationDetails}/><div className="modal-implementation"><StepImplementation step={step} operationDetails={operationDetails}/></div></>}{tab === 'schema' && <FieldLedger step={step}/>}</div></div></div>;
}

function StageSchema({ schema, schemaById }) {
  if (!schema) return null;
  return <details className="stage-schema-menu"><summary>Schema <span>{schema?.fields?.length ?? 0}</span><Icon name="chevron" size={12}/></summary><div className="stage-schema-popover"><SchemaFields schema={schema} schemaById={schemaById}/></div></details>;
}

function DataObjectCard({ flow, schemaById, onOpenStep }) {
  return <article className="data-object-card"><header><div><h3>{flow.title}</h3><p>{flow.description}</p></div></header><ol className="data-object-stages">{flow.stages.map((stage, index) => { const changes = (stage.step?.schemaChanges ?? []).filter((change) => ['added', 'changed'].includes(change.kind)); return <li key={`${flow.id}-${stage.stepId}-${index}`}><span className="data-stage-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="data-stage-copy"><div className="data-stage-heading"><button onClick={() => stage.storyId && onOpenStep(stage.storyId, stage.stepId)}>{stage.step?.title ?? stage.label}<Icon name="arrow" size={13}/></button><StageSchema schema={stage.schema} schemaById={schemaById}/></div><p>{stage.description}</p><StepChangePills changes={changes}/></div></li>; })}</ol></article>;
}

function DataFlowView({ dataFlows, schemaById, onOpenStep }) {
  return <section className="data-flow-view" aria-label="Data object flows"><header className="data-flow-header"><div><h1>Data flow</h1><p>Follow each object from creation to completion.</p></div></header><section className="data-object-section">{dataFlows.length === 0 ? <EmptyState icon="flow" title="No data objects documented" body="Add data flows to show how important objects evolve."/> : <div className="data-object-list">{dataFlows.map((flow) => <DataObjectCard flow={flow} schemaById={schemaById} onOpenStep={onOpenStep} key={flow.id}/>)}</div>}</section></section>;
}

function GlobalSearch({ open, stories, stepsByStory, sourceEvidence, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useEffect(() => { if (open) { setQuery(''); requestAnimationFrame(() => inputRef.current?.focus()); } }, [open]);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const matches = [];
    for (const story of stories) if ([story.title, story.summary, story.group, story.system].some((value) => value?.toLowerCase().includes(term))) matches.push({ type: 'Story', label: story.title, detail: story.summary, storyId: story.id });
    for (const story of stories) for (const step of stepsByStory[story.id] ?? []) if ([step.title, step.summary, step.system, step.source].some((value) => value?.toLowerCase().includes(term))) matches.push({ type: 'Step', label: step.title, detail: `${story.title} · ${step.system}`, storyId: story.id, stepId: step.id });
    for (const evidence of sourceEvidence) if ([evidence.path, evidence.symbol, evidence.supports].some((value) => value?.toLowerCase().includes(term))) matches.push({ type: 'Source', label: evidence.path, detail: `${evidence.symbol ?? 'Source evidence'} · lines ${evidence.lineStart}–${evidence.lineEnd}`, storyId: stories.find((story) => story.evidenceIds?.includes(evidence.id))?.id });
    return matches.slice(0, 30);
  }, [query, sourceEvidence, stories, stepsByStory]);
  if (!open) return null;
  return <div className="search-layer"><button className="layer-backdrop" onClick={onClose} aria-label="Close search"/><div className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title"><header><div><span>Search the artifact</span><h2 id="search-title">Find a Story, Step, or source</h2></div><button onClick={onClose} aria-label="Close search"><Icon name="close"/></button></header><label className="search-dialog-input"><Icon name="search" size={18}/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “render”, “project”, or “page.tsx”" aria-label="Search the artifact"/><kbd>Esc</kbd></label><div className="search-results" aria-live="polite">{!query && <p className="search-hint">Search across {stories.length} Stories, their Steps, and {sourceEvidence.length} source references.</p>}{query && results.length === 0 && <EmptyState icon="search" title="No matches" body="Try a different Story title, Step, system, or source path."/>}{results.map((result, index) => <button className="search-result" key={`${result.type}-${result.label}-${index}`} onClick={() => onSelect(result)}><span className={`result-kind ${result.type.toLowerCase()}`}>{result.type}</span><span><strong>{result.label}</strong><small>{result.detail}</small></span><Icon name="chevron" size={14}/></button>)}</div></div></div>;
}

function ShortcutModal({ open, onClose }) {
  if (!open) return null;
  const shortcuts = [['⌘K / Ctrl K', 'Open artifact search'], ['↑ / ↓', 'Move between Steps'], ['Enter', 'Expand or collapse the selected Step'], ['Esc', 'Collapse the selected Step or close a dialog']];
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="shortcut-title"><button className="layer-backdrop" onClick={onClose} aria-label="Close keyboard shortcuts"/><div className="shortcut-modal"><header><div><span>Keyboard</span><h2 id="shortcut-title">Navigate the Story</h2></div><button onClick={onClose} aria-label="Close keyboard shortcuts"><Icon name="close"/></button></header><ul>{shortcuts.map(([keys, label]) => <li key={keys}><kbd>{keys}</kbd><span>{label}</span></li>)}</ul></div></div>;
}

function EmptyState({ icon = 'compass', title, body, action, actionLabel }) {
  return <div className="empty-state"><span className="empty-mark"><Icon name={icon} size={22}/></span><h2>{title}</h2><p>{body}</p>{action && <button onClick={action}>{actionLabel}<Icon name="refresh" size={14}/></button>}</div>;
}

function LoadingState() {
  return <div className="loading-state" role="status" aria-live="polite"><div className="loading-bar"/><div className="loading-title"/><div className="loading-copy"/><div className="loading-card"/><div className="loading-card short"/><span>Loading Storyline artifact…</span></div>;
}

function ErrorState({ message, onRetry }) {
  return <div className="error-state"><span className="empty-mark error"><Icon name="alert" size={22}/></span><h1>Artifact could not load</h1><p>{message}</p><button onClick={onRetry}>Try again <Icon name="refresh" size={14}/></button></div>;
}

function Workspace({ data }) {
  const { projectName, stories, storyById, stepsByStory, relationships, dataFlows, operationDetails, sourceEvidence, diagnostics, metadata, schemaById } = data;
  const initialUrlState = readUrlState(stories, stepsByStory);
  const [view, setView] = useState(initialUrlState.view);
  const [activeStoryId, setActiveStoryId] = useState(initialUrlState.storyId);
  const [selectedId, setSelectedId] = useState(initialUrlState.stepId);
  const [expanded, setExpanded] = useState(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [detailStepId, setDetailStepId] = useState(null);
  const [jsonSchema, setJsonSchema] = useState(null);
  const activeStory = storyById.get(activeStoryId) ?? stories[0];
  const steps = stepsByStory[activeStory?.id] ?? [];
  const detailStep = steps.find((step) => step.id === detailStepId) ?? null;

  const openStory = (storyId, stepId = null) => {
    const nextSteps = stepsByStory[storyId] ?? [];
    setActiveStoryId(storyId);
    setSelectedId(stepId ?? nextSteps[0]?.id);
    setExpanded(stepId ? new Set([stepId]) : new Set());
    setDetailStepId(null);
    setView('story');
  };
  const toggleStep = (stepId) => { setSelectedId(stepId); setExpanded((current) => { const next = new Set(current); next.has(stepId) ? next.delete(stepId) : next.add(stepId); return next; }); };

  useEffect(() => {
    writeUrlState({ view, storyId: activeStoryId, stepId: selectedId });
  }, [activeStoryId, selectedId, view]);

  useEffect(() => {
    const syncFromUrl = () => {
      const next = readUrlState(stories, stepsByStory);
      setView(next.view);
      setActiveStoryId(next.storyId);
      setSelectedId(next.stepId);
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [stories, stepsByStory]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); return; }
      if (event.key === 'Escape') { if (jsonSchema) { setJsonSchema(null); return; } if (searchOpen) { setSearchOpen(false); return; } if (shortcutsOpen) { setShortcutsOpen(false); return; } if (detailStepId) { setDetailStepId(null); return; } if (expanded.has(selectedId)) { toggleStep(selectedId); return; } }
      if (view !== 'story' || jsonSchema || searchOpen || shortcutsOpen || detailStepId || event.metaKey || event.ctrlKey || event.altKey || ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = Math.max(0, steps.findIndex((step) => step.id === selectedId));
      if (event.key === 'Enter') { toggleStep(selectedId); return; }
      const nextIndex = Math.max(0, Math.min(steps.length - 1, currentIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      setSelectedId(steps[nextIndex]?.id);
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => document.querySelector(`[data-nav-id="${CSS.escape(steps[nextIndex]?.id ?? '')}"]`)?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' }));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailStepId, expanded, jsonSchema, searchOpen, selectedId, shortcutsOpen, steps, view]);

  return <div className="app-shell"><NavigationRail view={view} onOpenStory={() => setView('story')} onOpenStories={() => setView('stories')} onOpenFlow={() => setView('flow')} onOpenSearch={() => setSearchOpen(true)} onOpenHelp={() => setShortcutsOpen(true)}/><main className="workspace"><Topbar view={view} projectName={projectName} story={activeStory} metadata={metadata} diagnostics={diagnostics} onOpenStories={() => setView('stories')} onOpenSearch={() => setSearchOpen(true)}/>{view === 'stories' && <StoriesIndex stories={stories} projectName={projectName} activeStoryId={activeStoryId} onOpenStory={openStory}/>} {view === 'flow' && <DataFlowView dataFlows={dataFlows} schemaById={schemaById} onOpenStep={openStory}/>} {view === 'story' && activeStory && <div className="workspace-grid"><section className="story-canvas" aria-label={`${activeStory.title} Story`}><StoryHeader story={activeStory}/><div className="timeline-label"><span>Story timeline</span><em>Select a Step, or press Enter, to expand it</em></div><ol className="story-route">{steps.map((step, index) => <StoryStep key={step.id} step={step} index={index} selected={selectedId === step.id} expanded={expanded.has(step.id)} onToggle={toggleStep} operationDetails={operationDetails} schemaById={schemaById} onOpenDetail={setDetailStepId} onOpenJson={(schema, direction) => setJsonSchema({ schema, direction })}/>)}</ol><div className="route-end"><span>{steps.at(-1)?.summary ?? 'Story complete.'}</span></div></section></div>} {!activeStory && <EmptyState title="No Stories available" body="This artifact does not contain a Story Path yet."/>}</main><GlobalSearch open={searchOpen} stories={stories} stepsByStory={stepsByStory} sourceEvidence={sourceEvidence} onClose={() => setSearchOpen(false)} onSelect={(result) => { setSearchOpen(false); if (result.storyId) openStory(result.storyId, result.stepId); }}/><ShortcutModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)}/><StepDetailDialog step={detailStep} operationDetails={operationDetails} onClose={() => setDetailStepId(null)}/><JsonSchemaDialog schema={jsonSchema?.schema} direction={jsonSchema?.direction} schemaById={schemaById} onClose={() => setJsonSchema(null)}/></div>;
}

function App() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const load = () => { setState({ status: 'loading', data: null, error: null }); loadArtifact().then((data) => setState({ status: 'ready', data, error: null })).catch((error) => setState({ status: 'error', data: null, error })); };
  useEffect(load, []);
  if (state.status === 'loading') return <LoadingState/>;
  if (state.status === 'error') return <ErrorState message={state.error?.message ?? 'The viewer received an invalid response.'} onRetry={load}/>;
  return <Workspace data={state.data}/>;
}

createRoot(document.getElementById('root')).render(<App/>);
