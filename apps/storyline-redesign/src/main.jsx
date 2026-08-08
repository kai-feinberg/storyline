import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const stories = [
  { group: 'Commerce', title: 'Purchase credits', detail: '5 steps', active: true },
  { group: 'Commerce', title: 'Renew subscription', detail: '6 steps' },
  { group: 'Commerce', title: 'Refund payment', detail: '5 steps' },
  { group: 'Identity', title: 'Sign in', detail: '5 steps' },
  { group: 'Identity', title: 'Reset password', detail: '4 steps' },
  { group: 'Documents', title: 'Extract document', detail: '8 steps' },
];

const steps = [
  {
    id: 'payment-completed',
    type: 'Event',
    title: 'Payment completed',
    summary: 'Stripe confirms the charge and starts the story.',
    system: 'Stripe',
    produces: 'Completed payment event',
    source: 'webhooks/stripe.ts',
    lines: '18–46',
  },
  {
    id: 'match-user',
    type: 'Behavior',
    title: 'Match payment to user',
    summary: 'Find the account that owns this payment.',
    system: 'Billing API',
    needs: 'Payment, customer reference',
    produces: 'Matched account',
    source: 'billing/paymentService.ts',
    lines: '42–91',
    operations: ['Read the customer reference', 'Find the matching account', 'Confirm the account is active'],
  },
  {
    id: 'add-credits',
    type: 'Behavior',
    title: 'Add purchased credits',
    summary: 'Increase the balance by the amount the customer bought.',
    system: 'Credits service',
    needs: 'Matched account, payment amount',
    produces: 'Updated credit balance',
    source: 'credits/applyPurchase.ts',
    lines: '31–78',
    operations: ['Read the current balance', 'Calculate purchased credits', 'Write the new balance'],
  },
  {
    id: 'prepare-confirmation',
    type: 'Behavior',
    title: 'Prepare confirmation',
    summary: 'Turn the purchase into a clear customer receipt.',
    system: 'Billing API',
    needs: 'Payment and updated balance',
    produces: 'Confirmation message',
    source: 'billing/confirmation.ts',
    lines: '12–63',
    operations: ['Collect purchase details', 'Format the confirmation', 'Queue the message'],
  },
  {
    id: 'confirmation-sent',
    type: 'Outcome',
    title: 'Confirmation sent',
    summary: 'The customer can see what happened and their new balance.',
    system: 'Email service',
    needs: 'Confirmation message',
    produces: 'Customer-visible receipt',
    source: 'email/sendConfirmation.ts',
    lines: '22–40',
  },
];

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
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ compact = false }) {
  return <div className={`logo ${compact ? 'compact' : ''}`} aria-label="Storyline">
    <svg className="logo-mark" viewBox="0 0 38 46" aria-hidden="true">
      <path className="logo-frame" d="M30 10V7.5A5.5 5.5 0 0 0 24.5 2h-14A5.5 5.5 0 0 0 5 7.5v31" />
      <path className="logo-frame" d="M8 44h16.5a5.5 5.5 0 0 0 5.5-5.5V25" />
      <path className="logo-path" d="M26.8 12.3c-7.1 1-13.1 2.7-13.2 6.1-.1 2.6 4.3 4.2 7.5 6.1 3.4 2 5.6 4.2 3.9 7.1-2.2 3.8-9.1 5.2-16 6.1 5.1-2.8 9.4-5.5 9.5-8.5.1-2.3-3-3.8-6.1-5.7-3.5-2.2-6.2-4.7-4-7.7 2.5-3.2 10.2-3.9 18.4-3.5Z" />
    </svg>
    {!compact && <span>Storyline</span>}
  </div>;
}

function Sidebar({ open, onClose }) {
  const groups = [...new Set(stories.map((story) => story.group))];
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="sidebar-head"><Logo /><button className="mobile-close" onClick={onClose} aria-label="Close navigation"><Icon name="close" /></button></div>
    <button className="repository">
      <span className="repo-mark">A</span>
      <span><strong>acme / billing-app</strong><small>main · analyzed 8m ago</small></span>
      <Icon name="chevron" size={15} />
    </button>
    <nav className="primary-nav" aria-label="Primary navigation">
      <a className="nav-link active" href="#flow"><Icon name="story" /><span>Stories</span><small>18</small></a>
      <button className="nav-link"><Icon name="search" /><span>Search</span><kbd>⌘K</kbd></button>
    </nav>
    <div className="story-index">
      <div className="index-title"><span>Product stories</span><button aria-label="Add story">+</button></div>
      {groups.map((group) => <section className="story-group" key={group}>
        <h2>{group}</h2>
        {stories.filter((story) => story.group === group).map((story) => <button className={`story-link ${story.active ? 'active' : ''}`} key={story.title}>
          <span className="story-pin" />
          <span><strong>{story.title}</strong><small>{story.detail}</small></span>
        </button>)}
      </section>)}
    </div>
    <div className="sidebar-foot"><span className="status-dot" /><span>Analysis ready</span><button aria-label="Repository settings"><Icon name="compass" /></button></div>
  </aside>;
}

function StoryStep({ step, index, selected, expanded, onSelect, onToggle }) {
  return <li className={`route-stop ${selected ? 'selected' : ''}`}>
    <div className="route-index" aria-hidden="true"><span>{index + 1}</span></div>
    <article className="step-card">
      <button className="step-main" onClick={() => onSelect(step)} aria-expanded={selected}>
        <span className="step-type">{step.type}</span>
        <span className="step-system">{step.system}</span>
        <span className="step-indicator"><Icon name="chevron" size={15} /></span>
        <strong>{step.title}</strong>
        <span className="step-summary">{step.summary}</span>
        <span className="step-action">See this step <Icon name="chevron" size={14} /></span>
      </button>
      {step.operations && <div className={`local-expansion ${expanded ? 'shown' : ''}`}>
        <button className="expansion-toggle" onClick={() => onToggle(step.id)}>
          <span>Inside this behavior</span><span>{expanded ? 'Hide' : `${step.operations.length} operations`}</span>
        </button>
        {expanded && <ol>{step.operations.map((operation, operationIndex) => <li key={operation}><span>{operationIndex + 1}</span>{operation}</li>)}</ol>}
      </div>}
      {selected && <section className="mobile-context" aria-label={`${step.title} context`}>
        <div><span>Needs</span><strong>{step.needs || 'The completed payment event'}</strong></div>
        <div><span>Produces</span><strong>{step.produces}</strong></div>
        <div className="mobile-source"><Icon name="source" /><span><small>Source trace</small><strong>{step.source}</strong><em>Lines {step.lines}</em></span></div>
      </section>}
    </article>
  </li>;
}

function DetailPanel({ step, onClose }) {
  if (!step) return <aside className="details empty">
    <div className="empty-mark"><Icon name="compass" size={24} /></div>
    <h2>Follow the story</h2>
    <p>Choose a step to see what it needs, what it changes, and where the behavior lives in the code.</p>
    <div className="legend"><span><i className="coral" />Story path</span><span><i className="mint" />Supporting detail</span></div>
  </aside>;

  return <aside className="details">
    <div className="detail-head"><span>{step.type}</span><button onClick={onClose} aria-label="Close details"><Icon name="close" /></button></div>
    <h2>{step.title}</h2>
    <p className="detail-summary">{step.summary}</p>
    <section className="detail-section"><h3>What it needs</h3><p>{step.needs || 'The completed payment event'}</p></section>
    <section className="detail-section"><h3>What it produces</h3><p>{step.produces}</p></section>
    <section className="source-section">
      <div><Icon name="source" /><span><small>Source trace</small><strong>{step.source}</strong><em>Lines {step.lines}</em></span></div>
      <Icon name="chevron" size={15} />
    </section>
    <button className="related-action"><Icon name="branch" />See related behavior</button>
  </aside>;
}

function App() {
  const [selectedId, setSelectedId] = useState('add-credits');
  const [expanded, setExpanded] = useState(new Set(['add-credits']));
  const [navOpen, setNavOpen] = useState(false);
  const selected = useMemo(() => steps.find((step) => step.id === selectedId), [selectedId]);
  const toggle = (id) => setExpanded((current) => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const selectStep = (step) => {
    setSelectedId(step.id);
    if (step.operations) setExpanded((current) => new Set([...current, step.id]));
  };

  return <div className="app-shell">
    <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
    {navOpen && <button className="nav-backdrop" aria-label="Close navigation" onClick={() => setNavOpen(false)} />}
    <main className="workspace" id="flow">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setNavOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
        <Logo compact />
        <div className="breadcrumb"><span>Stories</span><Icon name="chevron" size={12} /><strong>Purchase credits</strong></div>
        <button className="search-button"><Icon name="search" /><span>Ask about this codebase</span><kbd>⌘K</kbd></button>
        <div className="avatar" aria-label="User profile">KM</div>
      </header>
      <div className="workspace-grid">
        <section className="story-canvas" aria-labelledby="story-title">
          <div className="story-heading">
            <div><h1 id="story-title">Purchase credits</h1><p>A customer buys credits and receives confirmation.</p></div>
            <div className="story-meta"><span><i />Main path</span><span>5 steps</span></div>
          </div>
          <ol className="story-route">
            {steps.map((step, index) => <StoryStep key={step.id} step={step} index={index} selected={selectedId === step.id} expanded={expanded.has(step.id)} onSelect={selectStep} onToggle={toggle} />)}
          </ol>
          <div className="route-end"><span>The customer sees their new balance.</span></div>
        </section>
        <DetailPanel step={selected} onClose={() => setSelectedId(null)} />
      </div>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
