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

const entities = [
  { name: 'Payment', type: 'money movement', count: '4 flows', color: 'coral', line: 'Payment completed → matched → applied → confirmed' },
  { name: 'User', type: 'person / account', count: '8 flows', color: 'mint', line: 'Created → identified → changed → notified' },
  { name: 'Subscription', type: 'recurring agreement', count: '3 flows', color: 'gold', line: 'Trialing → active → renewed → cancelled' },
  { name: 'Document', type: 'uploaded artifact', count: '5 flows', color: 'lavender', line: 'Uploaded → extracted → validated → shown' },
];

const systems = [
  { name: 'Billing service', type: 'Internal module', touches: '12 behaviors', color: 'coral' },
  { name: 'Stripe', type: 'External provider', touches: '8 behaviors', color: 'gold' },
  { name: 'Postgres', type: 'Data store', touches: '18 behaviors', color: 'mint' },
  { name: 'Email service', type: 'External provider', touches: '6 behaviors', color: 'sky' },
  { name: 'AI model', type: 'External provider', touches: '4 behaviors', color: 'lavender' },
];

function Icon({ children, className = '' }) { return <span className={`icon ${className}`}>{children}</span>; }

function App() {
  const [activeNav, setActiveNav] = useState('Flows');
  const [activeFlow, setActiveFlow] = useState(flows[0]);
  const [selected, setSelected] = useState(flowSteps[2]);
  const [expanded, setExpanded] = useState(null);
  const [view, setView] = useState('river');
  const [showSystems, setShowSystems] = useState(false);
  const [search, setSearch] = useState('');
  const [palette, setPalette] = useState(false);
  const [focus, setFocus] = useState(false);
  const [notice, setNotice] = useState('');

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return [
      ...flows.filter((x) => x.name.includes(query)).map((x) => ({ type: 'Flow', name: x.name, meta: x.meta })),
      ...flowSteps.filter((x) => x.title.includes(query) || x.subtitle.includes(query)).map((x) => ({ type: 'Behavior', name: x.title, meta: 'Purchase credits' })),
      ...entities.filter((x) => x.name.toLowerCase().includes(query)).map((x) => ({ type: 'Entity', name: x.name, meta: x.type })),
      ...systems.filter((x) => x.name.toLowerCase().includes(query)).map((x) => ({ type: 'System', name: x.name, meta: x.touches })),
    ];
  }, [search]);

  const toast = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200); };

  function selectSearchResult(result) {
    setPalette(false); setSearch('');
    if (result.type === 'Flow') {
      const target = flows.find((x) => x.name === result.name);
      setActiveFlow(target); setActiveNav('Flows'); toast(`Opened ${result.name}`);
    } else if (result.type === 'Behavior') {
      const target = flowSteps.find((x) => x.title === result.name);
      setSelected(target); setActiveNav('Flows'); toast(`Jumped to ${result.name}`);
    }
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">◎</div><div><div className="brand-name">understand</div><div className="brand-sub">anything / exploration</div></div></div>
      <div className="workspace-switcher"><span className="repo-dot" /> <span>acme / billing-app</span><Icon>⌄</Icon></div>
      <nav className="nav">
        <div className="nav-label">Navigate</div>
        {['Flows', 'Entities', 'Systems'].map((item) => <button key={item} className={`nav-item ${activeNav === item ? 'active' : ''}`} onClick={() => setActiveNav(item)}><Icon>{item === 'Flows' ? '↯' : item === 'Entities' ? '◉' : '⌬'}</Icon>{item}<span className="nav-count">{item === 'Flows' ? '18' : item === 'Entities' ? '26' : '9'}</span></button>)}
        <div className="nav-label spaced">Workbench</div>
        <button className="nav-item" onClick={() => setPalette(true)}><Icon>⌕</Icon>Search anything<span className="key-hint">⌘ K</span></button>
        <button className="nav-item" onClick={() => toast('Ask mode is ready for the next exploration pass')}><Icon>✳</Icon>Ask the system</button>
      </nav>
      <div className="sidebar-foot"><div className="sync-label"><span className="sync-dot" /> Synced to <b>main</b></div><div className="commit">Last analyzed 8 min ago<br /><span>9f3b12c · 184 files</span></div><button className="settings" onClick={() => toast('Settings are intentionally out of scope for this prototype')}><Icon>⚙</Icon>Workspace settings</button></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="breadcrumbs"><span>acme / billing-app</span><span className="slash">/</span><b>{activeNav}</b>{activeNav === 'Flows' && <><span className="slash">/</span><b className="current">{activeFlow.name}</b></>}</div><button className="search-trigger" onClick={() => setPalette(true)}><Icon>⌕</Icon><span>Search flows, behaviors, entities...</span><kbd>⌘ K</kbd></button><div className="avatar">KC</div></header>
      {activeNav === 'Flows' && <FlowWorkspace {...{activeFlow, setActiveFlow, selected, setSelected, expanded, setExpanded, view, setView, showSystems, setShowSystems, focus, setFocus, toast}} />}
      {activeNav === 'Entities' && <ExplorePage title="Entities" eyebrow="Explore by object" intro="Trace the things your system creates, changes, and carries through different behaviors." items={entities} kind="entities" onSelect={(x) => toast(`${x.name} appears in ${x.count}`)} />}
      {activeNav === 'Systems' && <ExplorePage title="Systems" eyebrow="Explore by boundary" intro="See which internal modules and external providers participate in the behavior model." items={systems} kind="systems" onSelect={(x) => toast(`${x.name} touches ${x.touches}`)} />}
    </main>
    {palette && <div className="palette-backdrop" onMouseDown={() => setPalette(false)}><div className="palette" onMouseDown={(e) => e.stopPropagation()}><div className="palette-input"><Icon>⌕</Icon><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ask where something happens..." /><kbd>ESC</kbd></div>{search ? <div className="results">{searchResults.length ? searchResults.map((result, i) => <button className="result" key={`${result.name}-${i}`} onClick={() => selectSearchResult(result)}><span className="result-type">{result.type}</span><span><b>{result.name}</b><small>{result.meta}</small></span><Icon>↵</Icon></button>) : <div className="no-results">No semantic matches yet. Try “payment”, “user”, or “Stripe”.</div>}</div> : <div className="palette-suggestions"><div className="palette-section">Try asking</div><button onClick={() => setSearch('what happens after payment')}><span>⌁</span>What happens after payment succeeds?</button><button onClick={() => setSearch('user')}><span>⌁</span>Where is the user matched?</button><button onClick={() => setSearch('stripe')}><span>⌁</span>Which flows touch Stripe?</button></div>}</div></div>}
    {notice && <div className="toast">{notice}</div>}
  </div>;
}

function FlowWorkspace({ activeFlow, setActiveFlow, selected, setSelected, expanded, setExpanded, view, setView, showSystems, setShowSystems, focus, setFocus, toast }) {
  return <div className="workspace"><section className="content-heading"><div><div className="eyebrow">Flow / Commerce</div><h1>{activeFlow.name}</h1><p>What happens when a customer turns a successful payment into usable credits.</p></div><div className="heading-actions"><button className="button secondary" onClick={() => toast('Share link copied to clipboard')}><Icon>↗</Icon> Share</button><button className="button primary" onClick={() => setFocus(!focus)}><Icon>◌</Icon> {focus ? 'Exit focus' : 'Focus flow'}</button></div></section>
    <div className="flow-tabs"><button className="tab active">Behavior</button><button className="tab" onClick={() => toast('Dependency view is available as an overlay')}>Dependencies <span className="soon">soon</span></button><button className="tab" onClick={() => toast('Source view opens implementation evidence')}>Source <span className="soon">soon</span></button><div className="tab-spacer" /><button className={`toggle ${showSystems ? 'on' : ''}`} onClick={() => setShowSystems(!showSystems)}><span className="toggle-track"><span /></span> Show systems</button></div>
    <div className="canvas-layout"><FlowList {...{activeFlow, setActiveFlow, focus}} /><section className={`canvas ${view} ${focus ? 'focus-mode' : ''}`}><div className="canvas-toolbar"><div className="canvas-note"><span className="live-dot" /> Main path · 5 behaviors</div><div className="view-switcher">{[['river','River'],['cards','Cards'],['trace','Trace']].map(([id,label]) => <button key={id} className={view === id ? 'selected' : ''} onClick={() => setView(id)}>{label}</button>)}</div></div><div className="canvas-inner">{view === 'river' && <RiverView {...{selected, setSelected, expanded, setExpanded, showSystems}} />}{view === 'cards' && <CardsView {...{selected, setSelected, expanded, setExpanded, showSystems}} />}{view === 'trace' && <TraceView {...{selected, setSelected, showSystems}} />}</div><div className="canvas-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> expand <kbd>⌘</kbd><kbd>K</kbd> search</span><span className="zoom">− &nbsp; 100% &nbsp; +</span></div></section><Inspector {...{selected, expanded, setExpanded, setSelected, focus, setFocus, toast}} /></div>
  </div>;
}

function FlowList({ activeFlow, setActiveFlow, focus }) { return <aside className={`flow-list ${focus ? 'compact' : ''}`}><div className="list-heading"><span>Stories</span><button>＋</button></div>{['Commerce','Authentication','Documents'].map((group) => <div className="story-group" key={group}><div className="group-label">{group}<span>{group === 'Commerce' ? '6' : group === 'Authentication' ? '4' : '8'}</span></div>{flows.filter((f) => f.group === group).map((flow) => <button key={flow.name} className={`story ${activeFlow.name === flow.name ? 'active' : ''}`} onClick={() => setActiveFlow(flow)}><span className={`story-icon ${flow.accent}`}>{flow.icon}</span><span><b>{flow.name}</b><small>{flow.meta}</small></span></button>)}</div>)}</aside> }

function RiverView({ selected, setSelected, expanded, setExpanded, showSystems }) { return <div className="river-view">{flowSteps.map((step, i) => <React.Fragment key={step.id}><div className={`river-node-row ${step.kind}`}><button className={`river-node ${step.color} ${selected?.id === step.id ? 'selected' : ''}`} onClick={() => setSelected(step)} onDoubleClick={() => setExpanded(expanded === step.id ? null : step.id)}><div className="node-top"><span className="node-kind">{step.kind === 'event' ? 'EVENT' : step.kind === 'outcome' ? 'OUTCOME' : 'BEHAVIOR'}</span>{showSystems && <span className="system-tag">{step.system}</span>}</div><strong>{step.title}</strong><span>{step.subtitle}</span><div className="node-actions"><span>{step.kind === 'behavior' ? (expanded === step.id ? 'Collapse' : 'Expand') : 'Inspect'}</span><Icon>→</Icon></div></button>{expanded === step.id && step.children && <div className="inline-expansion"><div className="expansion-label">Inside this behavior <span>3 operations</span></div>{step.children.map((child, j) => <div className="child-row" key={child}><span className="child-index">0{j + 1}</span><b>{child}</b><span className="child-arrow">↗</span></div>)}</div>}</div>{i < flowSteps.length - 1 && <div className="river-connector"><span /></div>}</React.Fragment>)}</div> }

function CardsView({ selected, setSelected, expanded, setExpanded, showSystems }) { return <div className="cards-view">{flowSteps.map((step, i) => <button className={`behavior-card ${step.color} ${selected?.id === step.id ? 'selected' : ''}`} key={step.id} onClick={() => setSelected(step)}><div className="card-number">0{i + 1}</div><div className="node-kind">{step.kind}</div><strong>{step.title}</strong><p>{step.subtitle}</p><div className="card-meta"><span>{showSystems ? step.system : step.kind === 'behavior' ? `${step.children.length} inside` : 'state'}</span><span onClick={(e) => { e.stopPropagation(); setExpanded(expanded === step.id ? null : step.id); }}>{step.kind === 'behavior' ? '↘' : '·'}</span></div></button>)}</div> }

function TraceView({ selected, setSelected, showSystems }) { return <div className="trace-view"><div className="trace-header"><span>Trace a payment through the flow</span><button onClick={() => setSelected(flowSteps[0])}>Reset trace ↺</button></div><div className="trace-lane"><div className="trace-label">Payment</div><div className="trace-line">{flowSteps.map((step, i) => <React.Fragment key={step.id}><button className={`trace-point ${step.color} ${selected?.id === step.id ? 'selected' : ''}`} onClick={() => setSelected(step)}><span>{i + 1}</span><b>{step.title}</b>{showSystems && <small>{step.system}</small>}</button>{i < flowSteps.length - 1 && <div className="trace-rail" />}</React.Fragment>)}</div></div><div className="trace-callout"><span className="callout-mark">!</span><div><b>One important branch is hidden</b><p>If payment matching fails, the flow routes to “Mark payment for review” instead of adding credits.</p></div></div></div> }

function Inspector({ selected, expanded, setExpanded, setSelected, focus, setFocus, toast }) { return <aside className="inspector"><div className="inspector-head"><span>Inspector</span><button onClick={() => setSelected(null)}>×</button></div>{selected ? <><div className={`inspector-kicker ${selected.color}`}>{selected.kind} · selected</div><h2>{selected.title}</h2><p className="inspector-copy">{selected.subtitle}. This description is written for a human trying to build a reliable mental model.</p><div className="inspector-actions"><button className="button primary small" onClick={() => setExpanded(expanded === selected.id ? null : selected.id)}>{expanded === selected.id ? 'Collapse' : 'Expand behavior'}</button><button className="icon-button" onClick={() => setFocus(!focus)}>⛶</button></div>{selected.kind === 'behavior' && <><InfoBlock label="Needs" items={selected.id === 'credits' ? ['Matched user','Payment amount','Current balance'] : selected.id === 'confirm' ? ['User','Order details','Payment'] : ['Payment','Customer reference']} /><InfoBlock label="Produces" items={selected.id === 'credits' ? ['Updated user balance'] : selected.id === 'confirm' ? ['Payment confirmation'] : ['Matched user']} /><InfoBlock label="Used by" items={['Purchase credits','Renew subscription','Refund payment']} /></>}<div className="source-block"><div className="info-label">Evidence</div><button onClick={() => toast('Source location copied')}><span className="file-icon">⌘</span><span><b>billing/paymentService.ts</b><small>lines 42–91 · confirmed</small></span><Icon>↗</Icon></button></div><button className="related" onClick={() => toast('Showing related behaviors')}>See related behaviors <Icon>→</Icon></button></> : <div className="empty-inspector"><span>◎</span><b>Select a behavior</b><p>Inspect what it needs, what it produces, and where it lives in the repository.</p></div>}</aside> }

function InfoBlock({ label, items }) { return <div className="info-block"><div className="info-label">{label}</div><div className="pill-list">{items.map((item) => <span key={item}>{item}</span>)}</div></div> }

function ExplorePage({ title, eyebrow, intro, items, kind, onSelect }) { return <div className="explore-page"><section className="content-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></div><button className="button secondary">Filter ⌄</button></section><div className="explore-grid">{items.map((item, i) => <button className="explore-card" key={item.name} onClick={() => onSelect(item)}><div className={`explore-symbol ${item.color}`}>{kind === 'entities' ? '◉' : '⌬'}</div><div className="explore-card-main"><div className="explore-card-top"><span>{item.type}</span><span>{item.count || item.touches}</span></div><h2>{item.name}</h2><p>{item.line || `Participates in the behavior model as a ${item.type.toLowerCase()}.`}</p><div className="mini-trace"><span className={`mini-dot ${item.color}`} /><i /><span className={`mini-dot ${item.color}`} /><i /><span className={`mini-dot ${item.color}`} /></div></div><Icon className="explore-arrow">↗</Icon></button>)}</div><div className="explore-note"><span className="callout-mark">i</span><p><b>Alternate indexes into the same model.</b> These are starting points for questions like “what happens to a payment?” or “which parts of the system touch Stripe?”</p></div></div> }

createRoot(document.getElementById('root')).render(<App />);
