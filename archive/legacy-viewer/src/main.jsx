import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const flows = [
  { group: 'Commerce', name: 'Purchase credits', meta: '7 behaviors · Stripe', accent: 'coral', icon: '↗' },
  { group: 'Commerce', name: 'Renew subscription', meta: '6 behaviors · Daily job', accent: 'gold', icon: '↻' },
  { group: 'Commerce', name: 'Refund payment', meta: '5 behaviors · Stripe', accent: 'lavender', icon: '↙' },
  { group: 'Authentication', name: 'Sign in', meta: '5 behaviors · Session', accent: 'mint', icon: '→' },
  { group: 'Authentication', name: 'Reset password', meta: '4 behaviors · Email', accent: 'sky', icon: '↗' },
  { group: 'Documents', name: 'Extract document', meta: '8 behaviors · AI model', accent: 'orange', icon: '▧' },
];

const flowSteps = [
  { id: 'payment', kind: 'event', title: 'Payment completed', subtitle: 'Stripe confirms the charge', system: 'Stripe', color: 'coral' },
  { id: 'match', kind: 'behavior', title: 'Match payment to user', subtitle: 'Find the account that owns this payment', system: 'API + DB', color: 'mint', children: ['Fetch payment record', 'Extract customer reference', 'Match payment to user'] },
  { id: 'credits', kind: 'behavior', title: 'Add purchased credits', subtitle: 'Increase the user balance by the paid amount', system: 'Billing service', color: 'gold', children: ['Fetch current balance', 'Calculate credits purchased', 'Update user balance'] },
  { id: 'confirm', kind: 'behavior', title: 'Generate confirmation', subtitle: 'Prepare a human-readable receipt', system: 'Billing service', color: 'lavender', children: ['Fetch order details', 'Generate payment confirmation', 'Save confirmation'] },
  { id: 'sent', kind: 'outcome', title: 'Confirmation sent', subtitle: 'The customer can see what happened', system: 'Email service', color: 'sky' },
];

function Icon({ children, className = '' }) { return <span className={`icon ${className}`}>{children}</span>; }

function App() {
  const [activeFlow, setActiveFlow] = useState(flows[0]);
  const [selected, setSelected] = useState(null);
  const [nodeFocus, setNodeFocus] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set(flowSteps.filter((step) => step.children).map((step) => step.id)));
  const [showSystems, setShowSystems] = useState(false);
  const [search, setSearch] = useState('');
  const [palette, setPalette] = useState(false);
  const [notice, setNotice] = useState('');

  const toast = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200); };
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return [
      ...flows.filter((x) => x.name.toLowerCase().includes(query)).map((x) => ({ type: 'Flow', name: x.name, meta: x.meta })),
      ...flowSteps.filter((x) => x.title.toLowerCase().includes(query) || x.subtitle.toLowerCase().includes(query)).map((x) => ({ type: 'Behavior', name: x.title, meta: 'Purchase credits' })),
    ];
  }, [search]);

  const openFlow = (flow) => { setActiveFlow(flow); setNodeFocus(null); setSelected(null); };
  const selectSearchResult = (result) => {
    setPalette(false); setSearch('');
    if (result.type === 'Flow') { openFlow(flows.find((flow) => flow.name === result.name)); toast(`Opened ${result.name}`); }
    if (result.type === 'Behavior') { const target = flowSteps.find((step) => step.title === result.name); setSelected(target); setNodeFocus(target); toast(`Opened ${result.name}`); }
  };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">◎</div><div><div className="brand-name">understand</div><div className="brand-sub">anything / exploration</div></div></div>
      <div className="workspace-switcher"><span className="repo-dot" /><span>acme / billing-app</span><Icon>⌄</Icon></div>
      <nav className="nav"><div className="nav-label">Workbench</div><button className="nav-item active"><Icon>↯</Icon>Flows<span className="nav-count">18</span></button><button className="nav-item" onClick={() => setPalette(true)}><Icon>⌕</Icon>Search anything<span className="key-hint">⌘ K</span></button></nav>
      <div className="story-nav"><div className="story-breadcrumbs"><span>Flows</span><span>/</span><b>{nodeFocus ? nodeFocus.title : activeFlow.name}</b></div><div className="list-heading"><span>Stories</span><button onClick={() => toast('New story creation is out of scope for this exploration')}>＋</button></div>{['Commerce','Authentication','Documents'].map((group) => <div className="story-group" key={group}><div className="group-label">{group}<span>{group === 'Commerce' ? '6' : group === 'Authentication' ? '4' : '8'}</span></div>{flows.filter((flow) => flow.group === group).map((flow) => <button key={flow.name} className={`story ${activeFlow.name === flow.name ? 'active' : ''}`} onClick={() => openFlow(flow)}><span className={`story-icon ${flow.accent}`}>{flow.icon}</span><span><b>{flow.name}</b><small>{flow.meta}</small></span></button>)}</div>)}</div>
      <div className="sidebar-foot"><div className="sync-label"><span className="sync-dot" /> Synced to <b>main</b></div><div className="commit">Last analyzed 8 min ago<br /><span>9f3b12c · 184 files</span></div><button className="settings" onClick={() => toast('Settings are intentionally out of scope for this prototype')}><Icon>⚙</Icon>Workspace settings</button></div>
    </aside>
    <main className="main-content"><FlowWorkspace {...{activeFlow, selected, setSelected, nodeFocus, setNodeFocus, expanded, setExpanded, showSystems, setShowSystems, toast}} /></main>
    {palette && <CommandPalette {...{search, setSearch, searchResults, selectSearchResult, close: () => { setPalette(false); setSearch(''); }}} />}
    {notice && <div className="toast">{notice}</div>}
  </div>;
}

function CommandPalette({ search, setSearch, searchResults, selectSearchResult, close }) {
  return <div className="palette-backdrop" onMouseDown={close}><div className="palette" onMouseDown={(event) => event.stopPropagation()}><div className="palette-input"><Icon>⌕</Icon><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ask where something happens..." /><kbd>ESC</kbd></div>{search ? <div className="results">{searchResults.length ? searchResults.map((result, index) => <button className="result" key={`${result.name}-${index}`} onClick={() => selectSearchResult(result)}><span className="result-type">{result.type}</span><span><b>{result.name}</b><small>{result.meta}</small></span><Icon>↵</Icon></button>) : <div className="no-results">No semantic matches yet. Try “payment” or “user”.</div>}</div> : <div className="palette-suggestions"><div className="palette-section">Try asking</div><button onClick={() => setSearch('payment')}><span>⌁</span>What happens after payment succeeds?</button><button onClick={() => setSearch('user')}><span>⌁</span>Where is the user matched?</button></div>}</div></div>;
}

function FlowWorkspace({ activeFlow, selected, setSelected, nodeFocus, setNodeFocus, expanded, setExpanded, showSystems, setShowSystems, toast }) {
  const toggleExpanded = (id) => setExpanded((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const enterNode = (step) => { setSelected(step); setNodeFocus(step); };
  return <div className="flow-screen">{nodeFocus ? <BehaviorFocus {...{activeFlow, nodeFocus, setNodeFocus, expanded, toggleExpanded, showSystems, setShowSystems, toast}} /> : <><div className="flow-screen-bar"><div><div className="flow-screen-kicker">Main path</div><strong>{activeFlow.name}</strong><span>5 behaviors · 1 successful path</span></div><div className="flow-screen-actions"><button className={`toggle ${showSystems ? 'on' : ''}`} onClick={() => setShowSystems(!showSystems)}><span className="toggle-track"><span /></span> Show systems</button><button className="share-link" onClick={() => toast('Share link copied to clipboard')}>↗ Share</button></div></div><section className="story-flow-canvas"><div className="canvas-inner"><RiverView {...{selected, setSelected: enterNode, expanded, toggleExpanded, showSystems}} /></div><div className="canvas-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span>Click a node to enter it</span><span className="zoom">− &nbsp; 100% &nbsp; +</span></div></section></>}</div>;
}

function RiverView({ selected, setSelected, expanded, toggleExpanded, showSystems }) {
  return <div className="river-view">{flowSteps.map((step, index) => <React.Fragment key={step.id}><div className={`river-node-row ${step.kind}`}><button className={`river-node ${step.color} ${selected?.id === step.id ? 'selected' : ''}`} onClick={() => setSelected(step)}><div className="node-top"><span className="node-kind">{step.kind === 'event' ? 'EVENT' : step.kind === 'outcome' ? 'OUTCOME' : 'BEHAVIOR'}</span>{showSystems && <span className="system-tag">{step.system}</span>}</div><strong>{step.title}</strong><span>{step.subtitle}</span><div className="node-actions"><span>{step.kind === 'behavior' ? 'Open behavior' : 'Open context'}</span><Icon>→</Icon></div></button>{step.children && <button className={`inline-expansion ${expanded.has(step.id) ? '' : 'collapsed'}`} onClick={(event) => { event.stopPropagation(); toggleExpanded(step.id); }}><div className="expansion-label">Inside this behavior <span>{expanded.has(step.id) ? '3 operations' : 'Show 3 operations'}</span></div>{expanded.has(step.id) && step.children.map((child, childIndex) => <div className="child-row" key={child}><span className="child-index">0{childIndex + 1}</span><b>{child}</b><span className="child-arrow">↗</span></div>)}</button>}</div>{index < flowSteps.length - 1 && <div className="river-connector"><span /></div>}</React.Fragment>)}</div>;
}

function BehaviorFocus({ activeFlow, nodeFocus, setNodeFocus, expanded, toggleExpanded, showSystems, setShowSystems, toast }) {
  const needs = nodeFocus.kind === 'behavior' ? ['Payment', 'Customer reference', 'Current balance'] : ['Stripe confirmation'];
  return <div className="behavior-focus"><div className="focus-header"><button className="back-link" onClick={() => setNodeFocus(null)}>← Back to {activeFlow.name}</button><div className="focus-breadcrumb"><span>Flows</span><span>/</span><span>{activeFlow.name}</span><span>/</span><b>{nodeFocus.title}</b></div><button className={`toggle ${showSystems ? 'on' : ''}`} onClick={() => setShowSystems(!showSystems)}><span className="toggle-track"><span /></span> Show systems</button></div><div className="focus-content"><div className="focus-main"><div className={`focus-kicker ${nodeFocus.color}`}>{nodeFocus.kind} · within {activeFlow.name}</div><h1>{nodeFocus.title}</h1><p className="focus-description">{nodeFocus.subtitle}. This is the part of the flow you are investigating right now.</p>{nodeFocus.children ? <button className="focus-operations" onClick={() => toggleExpanded(nodeFocus.id)}><div className="focus-operations-heading"><span>Inside this behavior</span><b>{expanded.has(nodeFocus.id) ? 'Expanded' : 'Collapsed'}</b></div>{expanded.has(nodeFocus.id) && nodeFocus.children.map((child, index) => <div className="focus-operation" key={child}><span>0{index + 1}</span><strong>{child}</strong><Icon>↗</Icon></div>)}</button> : <div className="focus-state"><span className="callout-mark">◎</span><div><b>This is a {nodeFocus.kind} in the story</b><p>It gives the surrounding behavior its context and outcome.</p></div></div>}</div><aside className="focus-details"><div className={`focus-kicker ${nodeFocus.color}`}>Selected node</div><h2>What it needs</h2><div className="pill-list">{needs.map((item) => <span key={item}>{item}</span>)}</div><h2>What it produces</h2><div className="pill-list"><span>{nodeFocus.kind === 'outcome' ? 'Customer-visible result' : nodeFocus.kind === 'event' ? 'Payment event' : 'Updated business state'}</span></div><div className="source-block"><div className="info-label">Evidence</div><button onClick={() => toast('Source location copied')}><span className="file-icon">⌘</span><span><b>billing/paymentService.ts</b><small>lines 42–91 · confirmed</small></span><Icon>↗</Icon></button></div></aside></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
