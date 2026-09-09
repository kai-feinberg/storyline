# Storyline Ubiquitous Language

Storyline uses one stable hierarchy:

**Story → Step → Implementation → Implementation Call**

Use these terms in product text, agent instructions, artifacts, and code. Do not use technical graph terms when a Storyline term exists.

## Core terms

| Term | Meaning | Do not use as a synonym |
| --- | --- | --- |
| **Story** | An evidence-backed product behavior with a meaningful trigger, progression, and outcome. A Story normally describes something a user or external actor tries to complete. | journey, use case, workflow, feature, behavior graph |
| **Story Path** | One ordered route through a Story. The default path shows the main successful progression. | happy path, route, flow |
| **Step** | One meaningful event, action, decision, or outcome in a Story Path. | node, card, stage, operation, behavior |
| **Event** | A Step that starts or resumes progression because a meaningful fact became true. | trigger node, start node |
| **Action** | A Step that changes, derives, retrieves, or communicates something meaningful. | process, operation, task |
| **Decision** | A Step that selects a Story Path from a meaningful condition. | branch node, fork |
| **Outcome** | A Step that establishes the result of a Story Path. | result node, end node |
| **Branch** | An alternate Story Path that leaves a Decision or another Step under a stated condition. | fork, alternate flow |

## Step context

| Term | Meaning | Do not use as a synonym |
| --- | --- | --- |
| **Step Input** | Domain information or state needed before a Step can start. | parameter, argument |
| **Step Output** | Domain information, state, or event established by a Step. | return value |
| **Execution Context** | The application, service, worker, job, or external system responsible for a Step. | owner, component, system box |
| **Dependency** | Supporting information or capability that a Step needs but that is not Story progression. | edge, arrow, relationship |
| **External Boundary** | A service, API, queue, data store, or model provider crossed during a Step. | integration node |

## Implementation terms

| Term | Meaning | Do not use as a synonym |
| --- | --- | --- |
| **Implementation** | The evidence-backed technical work that performs one Step. | layer, internals, technical details |
| **Implementation Trace** | The ordered source-level path that supports one Step. | call graph, code path |
| **Implementation Call** | One meaningful function, method, query, API call, or message send in an Implementation Trace. | function node, code Step |
| **Source Evidence** | The smallest useful source range that supports a claim. | proof, citation text |
| **Source Trace** | A reference from a Storyline item to its Source Evidence. | file chip, source link |

## Artifact terms

| Term | Meaning |
| --- | --- |
| **Repository Understanding** | The intermediate, evidence-backed account of the product, architecture, concepts, entry points, and candidate behaviors. |
| **Visualization Artifact** | The validated JSON document that the Storyline viewer loads. |
| **Diagnostic** | A recorded gap, conflict, or uncertainty that can affect the artifact. |

## Relationships

- A Story belongs to one Domain and contains one or more Story Paths.
- A Story Path contains ordered Steps.
- A Step is an Event, Action, Decision, or Outcome.
- A Step can consume Step Inputs, produce Step Outputs, and cross External Boundaries.
- A Step can have one Implementation.
- An Implementation contains an ordered Implementation Trace made of Implementation Calls.
- A Source Trace connects a Storyline claim to Source Evidence.
- Dependencies do not define Story progression.

## Naming rules

- Name a Story for the outcome-oriented behavior: **Create a project**, **Process an uploaded document**, **Complete checkout**.
- Name an Action as **verb + primary object + optional qualifier**: **Fetch order details**, **Match payment to order**.
- Name an Event or Outcome as **noun + meaningful state**: **Document uploaded**, **Order submitted**, **Receipt sent**.
- Name a Decision as a concise question or condition: **Payment approved?**, **Review required?**.
- Use domain words from the code and product documentation when they have stable meaning.
- Translate framework and storage mechanics into product meaning until the Implementation level.
- Use **Story**, **Step**, **Implementation**, and **Implementation Call** as the hierarchy names.
- Use **behavior** only as a general description of what the product does. Do not use it as a hierarchy level.

## Canonical verb families

| Intent | Prefer | Distinction |
| --- | --- | --- |
| Retrieve | **Fetch** | Get existing information from a source. |
| Associate | **Match** | Connect or reconcile existing objects. |
| Structure | **Parse**, **Extract** | Parse changes representation into structure. Extract selects information already present. |
| Derive | **Generate**, **Calculate**, **Filter**, **Rank** | Produce a value or artifact without creating a domain identity. |
| Mutate | **Create**, **Add**, **Update**, **Save** | Create gives identity. Add enriches. Update changes state. Save emphasizes persistence. |
| Control | **Check**, **Validate**, **Trigger**, **Route** | Check a condition. Validate correctness. Trigger starts work. Route directs work. |
| Communicate | **Send**, **Show** | Cross a system boundary or present information. |
| Domain action | **Charge**, **Refund**, **Approve**, **Authenticate**, and similar terms | Prefer a precise domain verb when it explains the effect better. |

## Vocabulary test

Before accepting a label, ask:

1. Would a product designer or domain expert understand it without reading the code?
2. Does it state an observable or meaningful effect instead of a mechanism?
3. Does it use the same noun for the same concept across all Stories?
4. Does its grammar match sibling labels?
5. Can its meaning be traced to source evidence?

If two source terms appear to mean the same thing, select one canonical term and record the ambiguity. Do not silently merge concepts with different rules or lifecycles.
