# Storyline: Story, Step, and Implementation Guide

> Represent code according to what it accomplishes, then reveal how it works only when the user asks for more detail.

Storyline presents the story behind the code. Its primary visualization is a Story with ordered Steps. Dependencies and Implementation are supporting information revealed as needed.

The goal is to minimize cognitive overhead while helping a reader build a stable mental model of a system. Start with the smallest useful Story, then reveal Step context, dependencies, exceptions, and Implementation without making the reader change pages or reconstruct relationships.

## 1. Design goals

- Optimize for comprehension, not completeness. The default Story should show the fewest Steps needed to explain the flow accurately.
- Preserve a stable mental model. Expansion should add detail to something the user already understands rather than replacing it with a different graph.
- Progressively disclose complexity by question: what happens, what does this Step need, what can go wrong, and where is it implemented.
- Describe the product or domain effect before the mechanism. Prefer “Fetch user by email” over “Execute SELECT query.”
- Use predictable grammar so readers recognize patterns instead of repeatedly decoding wording.
- Keep sibling nodes at roughly the same abstraction level.
- Avoid making the main graph carry every dependency. Sequence and dependency are different concepts and should not be conflated.

## 2. Core representation model

The primary unit is a **Story**. A Story contains ordered **Steps**, and each Step can reveal its **Implementation**.

### The Story supplies context

A product may already organize the system into distinct Stories such as “Payment confirmation,” “Document extraction,” or “User login.” Show the Story name in navigation, a breadcrumb, a page title, or a selector. Do not make it another Step that the reader must expand.

```text
Story: Payment confirmation
Payment Completed
→ Prepare Payment Confirmation
→ Send Payment Confirmation
→ Confirmation Sent
```

The default canvas starts at the first level that is actually explanatory.

### Three stable levels

Use **Story → Step → Implementation** as the stable hierarchy. Event, Action, Decision, and Outcome are Step types. Do not add a separate level for internal actions. If a Step contains several meaningful source operations, show them as part of that Step's Implementation.

### Optional overview context

A very high-level summary can help with orientation in breadcrumbs, minimaps, flow cards, or search results, but should not become a mandatory navigation layer.

```text
Payment Confirmation
payment received → confirmation prepared → confirmation delivered
```

## 3. Progressive disclosure model

Progressive disclosure should reveal different dimensions independently. A user may want dependencies or code without opening every Step.

The original node remains the anchor as detail is revealed:

```text
Generate Payment Confirmation

Selected:
Needs: User, Order, Payment
Produces: Payment Confirmation

Implementation:
→ fetchPurchasedItems()
→ fetchPaymentAmount()
→ fetchReceiptUrl()
→ addPaymentDetails()
generatePaymentConfirmation()
payment-confirmation.ts:42-91
```

## 4. Graph semantics: what arrows mean

In the Story, an arrow means progression: “this meaningfully follows from” or “is the next Step in this Story.” It does not automatically mean data dependency, argument passing, database relation, or implementation call.

Do not imply false dependencies. If multiple Steps independently depend on the same input, expose that relationship as metadata rather than forcing it into the sequence.

### When to show dependency edges

- Do not show data-flow edges by default.
- Show them in an explicit dependency/data-flow view or when a dependency is essential to understanding why the behavior happens.
- Prefer node metadata for ordinary inputs and outputs.
- If dependency edges are shown, distinguish them visually from behavioral progression edges.

## 5. Choosing the default Story view

The default view should be the smallest representation that accurately explains the Story—not the shortest summary and not a list of every source operation.

### Default grouping rule

Group child actions when they collectively accomplish one recognizable outcome. A parent is valid when its label can replace its children in the surrounding flow without making that flow confusing or materially inaccurate.

```text
Fetch User
Fetch Order
Fetch Payment
Generate Confirmation

→ Prepare Payment Confirmation
```

Expanding the Step reveals its Implementation.

### Target complexity

- Aim for roughly 3–7 meaningful nodes in the default view when possible.
- If a Story has 10+ equally visible Steps, look for meaningful groups.
- Do not create groups solely to hit a node count.
- Do not hide a critical decision, boundary, or state transition merely to make the graph smaller.

### Abstraction-level rule

Sibling Steps should describe work at comparable abstraction levels. Prefer:

```text
Payment Completed
→ Prepare Payment Confirmation
→ Send Payment Confirmation
```

Then expand “Prepare payment confirmation” to reveal its Implementation.

## 6. Naming grammar

Standardize grammar more aggressively than vocabulary. The graph should read as concise semantic sentences.

### General form

**Verb + primary object + optional qualifier**

- Fetch User by Email
- Match Payment to Order
- Generate Payment Confirmation
- Check User for Permission
- Send Confirmation to User

### Events and outcomes

Use noun + past-tense state/change for events and outcomes:

- Payment Completed
- Document Uploaded
- Search Submitted
- Issue Assigned
- Confirmation Sent

### Primary object rule

Keep the main object being followed through the behavior prominent and consistent. For association operations, use **Match [context/object] to [target]**:

- Match Payment to User
- Match Payment to Order
- Match Imported Row to Customer
- Match Request to Session

## 7. Canonical vocabulary families

| Family | Canonical verbs | Meaning / guidance |
| --- | --- | --- |
| Retrieve | Fetch | Retrieve existing information from a source. |
| Associate | Match | Associate or reconcile existing objects. |
| Structure | Parse, Extract | Parse converts representation into structure; Extract selects information already contained in a source. |
| Derive | Generate, Calculate, Filter, Rank | Produce or derive information without changing the identity of an existing entity. |
| Mutate | Create, Add, Update, Save | Create identity; Add enriches; Update changes semantic state; Save makes persistence itself meaningful. |
| Control | Check, Validate, Trigger, Route | Evaluate conditions, validate correctness, begin another behavior, or direct work. |
| Communicate | Send, Show | Cross a meaningful system boundary or present information to a user. |
| Domain | Charge, Refund, Cancel, Approve, Authenticate, Merge, Group, etc. | Use when the domain verb conveys the actual business or algorithmic effect more clearly than a generic mechanic. |

Important distinctions:

- **Parse vs. Extract:** Parse CSV converts a CSV representation into rows/fields; Extract Customer ID from Payload selects a value already contained in a parsed payload.
- **Create vs. Generate:** Create implies a new entity or identity; Generate implies a derived value, content, or artifact.
- **Update vs. Save:** Update describes a meaningful state change; Save describes persistence when persistence itself is meaningful.
- **Check vs. Validate:** Use Check for conditions and decisions; use Validate when correctness is the semantic action itself.

## 8. Inputs, outputs, and dependencies

Inputs and outputs should usually be metadata rather than permanent graph edges.

```text
Generate Payment Confirmation
Needs: User, Order, Payment
Produces: Payment Confirmation
```

- List only inputs that are semantically meaningful.
- Use domain objects rather than implementation objects when possible.
- Do not force the main progression graph to encode every relationship.
- Outputs should describe the meaningful value, entity, state, or event produced.
- If an input is unresolved, mark the dependency as uncertain rather than inventing a source.

## 9. Conditions, alternatives, and failure paths

The dominant successful path should remain visually primary. Alternative or failure paths are progressively disclosed unless central to the flow.

```text
Charge Customer [1 alternative]
→ Update Subscription
→ Send Receipt

Success
→ Update Subscription

Failure
→ Mark Renewal Failed
→ Notify Customer
```

- Hide ordinary error handling by default.
- Expose major product decisions, frequent alternate paths, and necessary state transitions.
- Do not linearize mutually exclusive branches into a fake sequence.
- Name branch conditions semantically, not as raw boolean expressions.

## 10. Implementation disclosure

Implementation should answer “where and how does this Step run?” after the Step is understood. It may include function or method names, files and line ranges, services, external APIs, database queries, queues, jobs, events, and relevant source snippets. Preserve the Step as the parent anchor.

## 11. AI generation logic

The AI should build the representation in two passes.

### Pass A — Build the Story model

1. Identify the flow boundary, trigger/start condition, and intended outcome.
2. Identify meaningful domain objects.
3. Extract candidate Steps from the code and translate mechanisms into product or domain effects.
4. Identify inputs and outputs, recording dependencies separately from visual sequence.
5. Identify decisions, branches, external boundaries, state changes, and outcomes.
6. Map Implementation evidence to each Step.

### Pass B — Construct the progressive representation

1. Choose the smallest default Story that accurately explains the flow.
2. Group work into Steps that produce recognizable outcomes.
3. Check the abstraction level among sibling Steps.
4. Keep the dominant progression graph simple.
5. Attach inputs, outputs, branches, external systems, and implementation as progressive metadata.
6. Generate an Implementation expansion for each supported Step.
7. Validate labels against the naming grammar and vocabulary rules.
8. Stop expanding when additional detail primarily exposes implementation.

Create a Step group only when the grouped work achieves one recognizable outcome, its label is meaningful, it fits cleanly in the Story, and grouping reduces cognitive load. Do not group when it hides a major decision or boundary, separates outcomes the user needs, requires a vague label, or forces expansion just to understand the basic flow.

### Uncertainty rules

- Do not invent causality because operations appear near each other in code.
- Do not infer input/output relationships without supporting evidence.
- Preserve uncertainty in metadata or choose the least specific supported label.
- Prefer “Send Email through Email Provider” when the provider is not established.
- Do not claim a business outcome the code does not support.

## 12. Automated quality checks

Before presenting a generated graph, check:

| Check | Question |
| --- | --- |
| Comprehension | Can a reader explain the purpose from the default view? |
| Node necessity | Does every default node add meaningful understanding? |
| Grouping | Could adjacent nodes be replaced by one recognizable parent? |
| Over-grouping | Would a parent hide the basic flow? |
| Abstraction level | Are sibling Steps at comparable abstraction levels? |
| Arrow meaning | Could progression be mistaken for dependency? |
| Grammar | Does each action read as Verb + primary object + qualifier? |
| Specificity | Are vague labels used where a precise domain label is available? |
| Implementation leakage | Are code details appearing before they are needed? |
| Inputs/outputs | Can Steps reveal what they need and produce? |
| Branches | Are important decisions represented without letting rare failures dominate? |
| Evidence | Can each node be traced to implementation evidence? |

## 13. Worked example: payment confirmation

### Default Story view

```text
Payments / Payment Confirmation

Payment Completed
→ Prepare Payment Confirmation
→ Send Payment Confirmation
→ Confirmation Sent
```

### Expand: Prepare Payment Confirmation

```text
Prepare Payment Confirmation
├ Match Payment to User
├ Match Payment to Order
├ Fetch Order Details
└ Generate Payment Confirmation
```

### Select: Generate Payment Confirmation

```text
Generate Payment Confirmation
Needs: User, Order Details, Payment
Produces: Payment Confirmation
```

### Implementation/source

```text
Generate Payment Confirmation
generatePaymentConfirmation()
payment-confirmation.ts:42-91
```

This representation works because the breadcrumb gives context without adding a useless click-through node, the default view is understandable without exposing every operation, expansion is local, inputs clarify dependencies without crossing arrows, and implementation remains traceable.

## 14. Additional pressure tests

### PDF AI extraction

```text
Document Uploaded
→ Extract Document Information
→ Save Extraction Result
→ Show Extraction Result

Extract Document Information
├ Fetch Document
├ Extract Text from PDF
├ Generate AI Request
├ Generate Structured Fields
└ Validate Extracted Fields

Generate Structured Fields
├ Generate Extraction Prompt
├ Send Prompt to AI Model
└ Parse AI Response
```

### Search with ranking and permissions

```text
Search Submitted
→ Find Relevant Documents
→ Apply Access Rules
→ Rank Search Results
→ Show Search Results

Find Relevant Documents
├ Generate Query Embedding
└ Fetch Matching Documents
```

### Subscription renewal

```text
Renewal Due
→ Prepare Renewal
→ Charge Customer
→ Update Subscription
→ Send Receipt
```

The payment-failure path should usually be an alternative attached to “Charge Customer,” not an equally prominent sequence unless failed renewals are the selected flow.

### Authentication and session creation

```text
Login Submitted
→ Authenticate User
→ Create Session
→ Show Application

Authenticate User
├ Fetch User by Email
├ Validate Password
└ Fetch User Permissions
```

## 15. Minimum standard

A generated Story is acceptable only if:

- The flow has clear context, a meaningful start, and an understandable outcome.
- The default view explains what happens without arbitrary expansion.
- Story progression is not confused with data dependency.
- Inputs, outputs, branches, and implementation can be revealed independently.
- Sibling Steps remain at comparable abstraction levels.
- Parents represent recognizable outcomes rather than generic containers.
- Step labels follow predictable grammar.
- Canonical vocabulary is used for common mechanics while clearer domain verbs remain allowed.
- Implementation detail is traceable but progressively disclosed.
- Every product or domain claim is grounded in the underlying code or other source material.

## Final design principle

Standardize grammar, representation rules, and disclosure more strongly than exact vocabulary. A user should understand a Story in the default view, expand only the Step they care about, inspect dependencies without visual clutter, and reach source code without losing the mental model they started with.
