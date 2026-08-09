import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const stories = [
  { group: 'Commerce', title: 'Purchase credits', detail: '5 steps', active: true },
  { group: 'Commerce', title: 'Renew subscription', detail: '6 steps' },
  { group: 'Commerce', title: 'Refund payment', detail: '5 steps' },
  { group: 'Identity', title: 'Sign in', detail: '5 steps' },
  { group: 'Identity', title: 'Reset password', detail: '4 steps' },
];

const steps = [
  { id: 'payment-completed', type: 'Event', title: 'Payment completed', summary: 'Stripe confirms the charge and starts the story.', system: 'Stripe', needs: 'A verified Stripe webhook', produces: 'Completed payment event', source: 'webhooks/stripe.ts', lines: '18–46' },
  { id: 'match-user', type: 'Behavior', title: 'Match payment to user', summary: 'Find the account that owns this payment.', system: 'Billing API', needs: 'Payment, customer reference', produces: 'Matched account', source: 'billing/paymentService.ts', lines: '42–91', operations: ['Read the customer reference', 'Find candidate accounts', 'Confirm the active account'] },
  { id: 'add-credits', type: 'Behavior', title: 'Add purchased credits', summary: 'Increase the balance by the amount the customer bought.', system: 'Credits service', needs: 'Matched account, payment amount', produces: 'Updated credit balance', source: 'credits/applyPurchase.ts', lines: '31–78', operations: ['Read the current balance', 'Calculate purchased credits', 'Write the new balance'] },
  { id: 'prepare-confirmation', type: 'Behavior', title: 'Prepare confirmation', summary: 'Turn the purchase into a clear customer receipt.', system: 'Billing API', needs: 'Payment and updated balance', produces: 'Confirmation message', source: 'billing/confirmation.ts', lines: '12–63', operations: ['Collect purchase details', 'Format the confirmation', 'Queue the message'] },
  { id: 'confirmation-sent', type: 'Outcome', title: 'Confirmation sent', summary: 'The customer can see what happened and their new balance.', system: 'Email service', needs: 'Confirmation message', produces: 'Customer-visible receipt', source: 'email/sendConfirmation.ts', lines: '22–40' },
];

const operationDetails = {
  'Read the customer reference': { summary: 'Extract the durable customer identifier from the completed payment.', needs: 'Stripe payment event', produces: 'Customer reference', source: 'billing/paymentService.ts', lines: '48–56', calls: [{ name: 'payment.customerId()', description: 'Reads the external customer identifier attached to the successful payment.' }, { name: 'normalizeCustomerRef()', description: 'Converts provider-specific formatting into the identifier shape used by the account domain.' }, { name: 'assertCustomerRef()', description: 'Stops the behavior when the payment cannot be tied to a durable customer reference.' }] },
  'Find candidate accounts': { summary: 'Search accounts that are linked to the external customer reference.', needs: 'Customer reference', produces: 'Candidate accounts', source: 'accounts/findByCustomer.ts', lines: '14–39', calls: [{ name: 'accountRepo.findByCustomerRef()', description: 'Queries every account currently linked to the normalized customer reference.' }, { name: 'filterActiveAccounts()', description: 'Removes archived and suspended accounts that cannot receive purchased credits.' }, { name: 'rankAccountMatches()', description: 'Orders remaining matches using ownership and recency signals before resolution.' }] },
  'Confirm the active account': { summary: 'Resolve ambiguity and select the account that can receive the purchase.', needs: 'Candidate accounts', produces: 'Matched active account', source: 'accounts/resolveOwner.ts', lines: '21–64', calls: [{ name: 'resolveAccountOwner()', description: 'Chooses the account whose ownership signals best match the payment customer.' }, { name: 'assertSingleMatch()', description: 'Prevents crediting when more than one account remains equally plausible.' }, { name: 'account.isActive()', description: 'Confirms the selected account can receive a balance mutation now.' }] },
  'Read the current balance': { summary: 'Load the latest balance before applying the purchase.', needs: 'Matched account', produces: 'Current balance', source: 'credits/balance.ts', lines: '11–28', calls: [{ name: 'balanceRepo.get()', description: 'Loads the account’s latest persisted credit balance and version.' }, { name: 'lockBalanceRow()', description: 'Prevents a concurrent purchase from changing the same balance mid-update.' }, { name: 'assertBalanceVersion()', description: 'Rejects stale state before the new credit amount is calculated.' }] },
  'Calculate purchased credits': { summary: 'Translate the paid amount into the number of credits to add.', needs: 'Payment amount', produces: 'Credit quantity', source: 'credits/pricing.ts', lines: '37–59', calls: [{ name: 'pricing.creditRate()', description: 'Finds the conversion rate that applied when the payment was completed.' }, { name: 'money.toMinorUnits()', description: 'Normalizes the paid amount into integer units to avoid decimal drift.' }, { name: 'calculateCreditQuantity()', description: 'Applies the rate and purchase rules to produce the exact credit quantity.' }] },
  'Write the new balance': { summary: 'Persist the updated balance as one atomic change.', needs: 'Current balance, credit quantity', produces: 'Updated balance', source: 'credits/applyPurchase.ts', lines: '61–78', calls: [{ name: 'balance.add()', description: 'Builds the next balance value without mutating the loaded balance object.' }, { name: 'balanceRepo.compareAndSet()', description: 'Writes only when the stored version still matches the version that was read.' }, { name: 'creditEvents.recordPurchase()', description: 'Records why the balance changed so the purchase can be traced later.' }] },
};

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
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function LogoMark() {
  return <svg className="logo-mark" viewBox="0 0 38 46" aria-hidden="true"><path className="logo-frame" d="M30 10V7.5A5.5 5.5 0 0 0 24.5 2h-14A5.5 5.5 0 0 0 5 7.5v31"/><path className="logo-frame" d="M8 44h16.5a5.5 5.5 0 0 0 5.5-5.5V25"/><path className="logo-path" d="M26.8 12.3c-7.1 1-13.1 2.7-13.2 6.1-.1 2.6 4.3 4.2 7.5 6.1 3.4 2 5.6 4.2 3.9 7.1-2.2 3.8-9.1 5.2-16 6.1 5.1-2.8 9.4-5.5 9.5-8.5.1-2.3-3-3.8-6.1-5.7-3.5-2.2-6.2-4.7-4-7.7 2.5-3.2 10.2-3.9 18.4-3.5Z"/></svg>;
}

function NavigationRail({ onOpenStories, onOpenShortcuts }) {
  return <aside className="nav-rail" aria-label="Workspace navigation">
    <button className="rail-logo" aria-label="Storyline home"><LogoMark /></button>
    <nav>
      <button className="rail-button active" aria-label="Current story"><Icon name="story"/><span>Story</span></button>
      <button className="rail-button" onClick={onOpenStories} aria-label="All stories"><Icon name="grid"/><span>All</span></button>
      <button className="rail-button" aria-label="Search"><Icon name="search"/><span>Search</span></button>
      <button className="rail-button" onClick={onOpenShortcuts} aria-label="Keyboard shortcuts"><Icon name="help"/><span>Help</span></button>
    </nav>
    <div className="rail-bottom"><span className="status-dot"/><button className="avatar" aria-label="User profile">KM</button></div>
  </aside>;
}

function StoryTabs({ onOpenStories }) {
  return <div className="story-tabs">
    <button className="story-picker" onClick={onOpenStories}><span className="repo-mark">A</span><span><strong>acme / billing-app</strong><small>18 stories</small></span><Icon name="chevron" size={14}/></button>
    <div className="tab-strip" role="tablist" aria-label="Open stories">
      <button className="story-tab active" role="tab" aria-selected="true"><span>Purchase credits</span><Icon name="close" size={13}/></button>
      <button className="story-tab" role="tab" aria-selected="false"><span>Renew subscription</span><Icon name="close" size={13}/></button>
      <button className="new-tab" aria-label="Open another story"><Icon name="plus" size={15}/></button>
    </div>
  </div>;
}

function StoriesPopover({ open, onClose }) {
  if (!open) return null;
  return <div className="stories-popover" role="dialog" aria-label="Choose a story">
    <div className="popover-head"><div><strong>All product stories</strong><span>acme / billing-app</span></div><button onClick={onClose} aria-label="Close story picker"><Icon name="close"/></button></div>
    <label className="story-search"><Icon name="search"/><input autoFocus placeholder="Search stories…"/></label>
    <div className="popover-list">{stories.map((story) => <button key={story.title} className={story.active ? 'active' : ''}><span className="story-pin"/><span><strong>{story.title}</strong><small>{story.group} · {story.detail}</small></span><Icon name="chevron" size={14}/></button>)}</div>
  </div>;
}

function CompactStoryHeader({ focusStep, onBack }) {
  return <header className={`content-header ${focusStep ? 'focus-header' : ''}`}>
    <div className="content-breadcrumbs">
      <button>Stories</button><Icon name="chevron" size={11}/>
      {focusStep ? <><button onClick={onBack}>Purchase credits</button><Icon name="chevron" size={11}/><strong>{focusStep.title}</strong></> : <strong>Purchase credits</strong>}
    </div>
    {!focusStep && <div className="compact-title"><div><h1>Purchase credits</h1><p>A customer buys credits and receives confirmation.</p></div></div>}
  </header>;
}

function StoryStep({ step, index, selected, expanded, onSelect, onOpen, onToggle }) {
  return <li className={`route-stop ${selected ? 'selected' : ''}`} data-nav-id={step.id}>
    <div className="route-index" aria-hidden="true"><span>{index + 1}</span></div>
    <article className="step-card">
      <button className="step-main" onClick={() => onSelect(step)} aria-label={`Select ${step.title}`}>
        <span className="step-type">{step.type}</span><span className="step-system">{step.system}</span><span className="step-indicator"><Icon name="chevron" size={15}/></span>
        <strong>{step.title}</strong><span className="step-summary">{step.summary}</span>
      </button>
      <div className="step-actions"><button onClick={() => onOpen(step)}>Open {step.type.toLowerCase()} <Icon name="chevron" size={14}/></button>{step.operations && <button onClick={() => onToggle(step.id)} aria-expanded={expanded}>{expanded ? 'Contract' : 'Expand here'} <Icon name="chevron" size={14}/></button>}</div>
      {step.operations && expanded && <div className="local-expansion"><div className="expansion-heading"><span>Inside this behavior</span><span>{step.operations.length} semantic operations</span></div><ol>{step.operations.map((operation, operationIndex) => { const detail = operationDetails[operation]; return <li key={operation}><span>{operationIndex + 1}</span><div><strong>{operation}</strong><small>{detail?.summary}</small><em>{detail?.needs} <Icon name="chevron" size={11}/> {detail?.produces}</em></div></li>; })}</ol></div>}
    </article>
  </li>;
}

function FlowView({ selectedId, expanded, onSelect, onOpen, onToggle }) {
  return <section className="story-canvas" aria-label="Purchase credits flow"><ol className="story-route">{steps.map((step, index) => <StoryStep key={step.id} step={step} index={index} selected={selectedId === step.id} expanded={expanded.has(step.id)} onSelect={onSelect} onOpen={onOpen} onToggle={onToggle}/>)}</ol><div className="route-end"><span>The customer sees their new balance.</span></div></section>;
}

function BehaviorFocus({ step, selectedOperation, expandedOperation, onSelectOperation, onToggleOperation }) {
  const operations = step.operations || ['Receive the event', 'Record the outcome'];
  return <section className="behavior-focus" aria-labelledby="behavior-title">
    <div className="focus-intro"><span>{step.type} within Purchase credits</span><h1 id="behavior-title">{step.title}</h1><p>{step.summary}</p></div>
    <div className="behavior-map">
      <div className="behavior-input"><span>Enters with</span><strong>{step.needs}</strong></div>
      <ol>{operations.map((operation, index) => {
        const detail = operationDetails[operation] || { summary: `Complete the ${step.title.toLowerCase()} behavior.`, needs: step.needs, produces: step.produces, source: step.source, lines: step.lines, calls: [{ name: 'resolveInput()', description: 'Validates and converts the incoming data into the shape this operation expects.' }, { name: 'performOperation()', description: 'Applies the domain rule represented by this semantic operation.' }, { name: 'recordResult()', description: 'Persists the result and makes it available to the next step in the story.' }] };
        const isExpanded = expandedOperation === operation;
        return <li key={operation} className={`${selectedOperation === operation ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`} data-nav-id={operation}>
          <span className="operation-index">{index + 1}</span>
          <article className="operation-card">
            <button className="operation-main" onClick={() => { onSelectOperation(operation); onToggleOperation(operation); }} aria-expanded={isExpanded}>
              <small>Semantic operation</small><strong>{operation}</strong><span>{detail.summary}</span><em>{isExpanded ? 'Hide implementation' : 'Show implementation'} <Icon name="chevron" size={13}/></em>
            </button>
            {isExpanded && <div className="implementation-trace">
              <div className="trace-io"><span><small>Required input</small><strong>{detail.needs}</strong></span><Icon name="chevron" size={14}/><span><small>Produced output</small><strong>{detail.produces}</strong></span></div>
              <div className="call-sequence"><div className="trace-heading"><span>Implementation trace</span><em>{detail.source} · {detail.lines}</em></div><ol>{detail.calls.map((call, callIndex) => <li key={call.name}><span>{callIndex + 1}</span><div><code>{call.name}</code><p>{call.description}</p></div></li>)}</ol></div>
            </div>}
          </article>
        </li>;
      })}</ol>
      <div className="behavior-output"><span>Leaves with</span><strong>{step.produces}</strong></div>
    </div>
  </section>;
}

function DetailPanel({ step, operation }) {
  const detail = operation ? operationDetails[operation] : step;
  if (!step) return null;
  return <aside className="details">
    <div className="detail-head"><span>{operation ? 'Operation' : step.type}</span><span className="detail-level">{operation ? 'Level 3' : 'Level 2'}</span></div>
    <h2>{operation || step.title}</h2><p className="detail-summary">{detail?.summary || step.summary}</p>
    <section className="detail-section"><h3>What it needs</h3><p>{detail?.needs || step.needs}</p></section>
    <section className="detail-section"><h3>What it produces</h3><p>{detail?.produces || step.produces}</p></section>
    <section className="source-section"><div><Icon name="source"/><span><small>Source trace</small><strong>{detail?.source || step.source}</strong><em>Lines {detail?.lines || step.lines}</em></span></div><Icon name="chevron" size={15}/></section>
    <button className="related-action"><Icon name="branch"/>See related behavior</button>
  </aside>;
}

function ShortcutModal({ open, onClose }) {
  if (!open) return null;
  const shortcuts = [['↑ / ↓', 'Move the Selection within the current layer'], ['→', 'Go deeper into the selected concept'], ['←', 'Contract the Expansion or return to the parent layer'], ['Enter', 'Expand or contract inline details'], ['Esc', 'Return to the Story Layer']];
  return <div className="shortcut-modal" role="dialog" aria-modal="true" aria-labelledby="shortcut-title"><div className="shortcut-modal-head"><div><h2 id="shortcut-title">Navigate without losing the story</h2><p>The same keys work at every layer.</p></div><button onClick={onClose} aria-label="Close keyboard shortcuts"><Icon name="close"/></button></div><ul>{shortcuts.map(([keys, label]) => <li key={keys}><kbd>{keys}</kbd><span>{label}</span></li>)}</ul></div>;
}

function App() {
  const [selectedId, setSelectedId] = useState('add-credits');
  const [focusId, setFocusId] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [expandedOperation, setExpandedOperation] = useState(null);
  const [expanded, setExpanded] = useState(new Set(['add-credits']));
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const selected = useMemo(() => steps.find((step) => step.id === selectedId), [selectedId]);
  const focused = useMemo(() => steps.find((step) => step.id === focusId), [focusId]);
  const toggle = (id) => setExpanded((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const openFocus = (step) => { setSelectedId(step.id); setFocusId(step.id); setSelectedOperation(step.operations?.[0] || null); setExpandedOperation(null); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const closeFocus = () => { setFocusId(null); setSelectedOperation(null); setExpandedOperation(null); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const scrollToSelection = (id) => requestAnimationFrame(() => document.querySelector(`[data-nav-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && shortcutsOpen) { event.preventDefault(); setShortcutsOpen(false); return; }
      if (storiesOpen || shortcutsOpen || event.metaKey || event.ctrlKey || event.altKey || ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(event.key)) return;
      event.preventDefault();
      if (!focused) {
        const currentIndex = Math.max(0, steps.findIndex((step) => step.id === selectedId));
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          const offset = event.key === 'ArrowUp' ? -1 : 1;
          const next = steps[Math.max(0, Math.min(steps.length - 1, currentIndex + offset))];
          setSelectedId(next.id); scrollToSelection(next.id);
        } else if (event.key === 'ArrowRight') openFocus(steps[currentIndex]);
        else if (event.key === 'Enter') toggle(steps[currentIndex].id);
        else if (event.key === 'ArrowLeft' && expanded.has(steps[currentIndex].id)) toggle(steps[currentIndex].id);
      } else {
        const operations = focused.operations || ['Receive the event', 'Record the outcome'];
        const currentIndex = Math.max(0, operations.indexOf(selectedOperation));
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          const offset = event.key === 'ArrowUp' ? -1 : 1;
          const next = operations[Math.max(0, Math.min(operations.length - 1, currentIndex + offset))];
          setSelectedOperation(next); scrollToSelection(next);
        } else if (event.key === 'ArrowRight') setExpandedOperation(selectedOperation);
        else if (event.key === 'Enter') setExpandedOperation((current) => current === selectedOperation ? null : selectedOperation);
        else if (event.key === 'ArrowLeft') expandedOperation ? setExpandedOperation(null) : closeFocus();
        else if (event.key === 'Escape') closeFocus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded, expandedOperation, focused, selectedId, selectedOperation, shortcutsOpen, storiesOpen]);

  return <div className="app-shell">
    <NavigationRail onOpenStories={() => setStoriesOpen(true)} onOpenShortcuts={() => setShortcutsOpen(true)}/>
    <main className="workspace" id="flow">
      <header className="topbar"><StoryTabs onOpenStories={() => setStoriesOpen(true)}/><button className="search-button"><Icon name="search"/><span>Ask about this codebase</span><kbd>⌘K</kbd></button></header>
      <CompactStoryHeader focusStep={focused} onBack={closeFocus}/>
      <div className={`workspace-grid ${focused ? 'focus-mode' : ''}`}>
        {focused ? <BehaviorFocus step={focused} selectedOperation={selectedOperation} expandedOperation={expandedOperation} onSelectOperation={setSelectedOperation} onToggleOperation={(operation) => setExpandedOperation((current) => current === operation ? null : operation)}/> : <FlowView selectedId={selectedId} expanded={expanded} onSelect={(step) => setSelectedId(step.id)} onOpen={openFocus} onToggle={toggle}/>}
        <DetailPanel step={focused || selected} operation={focused ? selectedOperation : null}/>
      </div>
    </main>
    <StoriesPopover open={storiesOpen} onClose={() => setStoriesOpen(false)}/>
    {storiesOpen && <button className="popover-backdrop" aria-label="Close stories" onClick={() => setStoriesOpen(false)}/>}
    <ShortcutModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)}/>
    {shortcutsOpen && <button className="popover-backdrop" aria-label="Close keyboard shortcuts" onClick={() => setShortcutsOpen(false)}/>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
