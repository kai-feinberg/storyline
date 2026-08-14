# Ubiquitous Language

Storyline uses one stable three-level model:

**Story → Step → Implementation**

These terms name the levels. Questions such as “why,” “what,” and “how” can help explain content, but they are not level names because they can apply at every level.

## Core model

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Story** | A product flow from a meaningful start to an intended outcome. It gives the reader purpose and context. | Product Story, Flow Context, journey, use case |
| **Story Path** | The ordered route currently followed through a Story. | Main flow, happy path, route |
| **Step** | One meaningful event, action, decision, or outcome within a Story Path. | Story Step, behavior, semantic operation, node, card |
| **Event** | A Step that provides a trigger or new fact. | Trigger node, start node |
| **Action** | A Step that changes or produces something meaningful in the product domain. | Behavior, process, operation |
| **Decision** | A Step that selects the next Story Path under a stated condition. | Branch node, fork |
| **Outcome** | A Step that establishes a product- or user-visible result. | End node, result step |
| **Branch** | An alternate Story Path that leaves a Step under a stated condition. | Fork, alternative flow |

## Step context

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Step Input** | Information or state required before a Step can begin. | Parameter, argument |
| **Step Output** | Information or state established when a Step completes. | Return value |
| **Execution Context** | The service, job, external system, or runtime boundary responsible for a Step. | System, owner, component |
| **Dependency** | Supporting information or capability required by a Step but not part of Story progression. | Edge, arrow, relationship |
| **External Boundary** | A service, API, queue, storage system, or model provider crossed by a Step or Implementation Call. | Integration, external service |

## Implementation evidence

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Implementation** | The code and systems that perform or support one Step. | Behavior Layer, technical details, internals |
| **Implementation Trace** | An evidence-grounded sequence of source-level calls for one Step. | Call graph, code path |
| **Implementation Call** | One function, method, query, API call, or message send in an Implementation Trace, with a plain-language description of its role. | Function node, code step |
| **Source Trace** | A direct pointer from a Story or Step to the source location that supports it. | Link, citation, file chip |
| **Source Evidence** | Code, queries, configuration, or external boundaries that justify a Storyline representation. | Proof, source detail |

## Interface concepts

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Story View** | The central workspace that keeps the Story and its ordered Steps visible. | Story Layer, overview page |
| **Step Expansion** | Inline disclosure of one Step’s context and Implementation. | Behavior Layer, child layer |
| **Implementation View** | The detailed Implementation for one Step, shown inline or in full-screen focus. | Implementation Layer, code page |
| **Context Panel** | A supporting surface that describes the selected Story, Step, or Implementation item. | Details page |
| **Navigation Rail** | The narrow global control surface for major Storyline destinations. | Sidebar, left nav |
| **Story Tab** | A persistent tab for one open Story. | Page tab, flow tab |
| **Story Picker** | The searchable selector used to find and open Stories. | Dropdown, story search bar |
| **Selection** | The item currently targeted by keyboard or pointer navigation. | Active node |
| **Expansion** | Disclosure of more information without leaving the Story View. | Dropdown, open state |
| **Focus Mode** | A full-screen view of one expanded Step and its Implementation. | Separate layer, detail page |

## Relationships

- A **Story** contains one or more **Story Paths**.
- A **Story Path** contains three or more ordered **Steps** when the evidence supports that detail.
- A **Step** is an **Event**, **Action**, **Decision**, or **Outcome**.
- A **Step** can consume **Step Inputs** and produce **Step Outputs**.
- A **Step** can have one **Implementation**.
- An **Implementation Trace** contains ordered **Implementation Calls** and **Source Evidence**.
- A **Step** or **Implementation Call** can cross an **External Boundary**.
- A **Source Trace** connects a Story, Step, or Implementation Call to its supporting Source Evidence.
- A **Step Expansion** keeps the parent Story visible.
- **Focus Mode** can enlarge a Step without changing its place in the Story.

## Navigation language

- **Move** changes the Selection within the current Story (`↑` and `↓`).
- **Expand** reveals the selected Step’s Implementation (`Enter` or `→`).
- **Contract** hides the selected Step’s Implementation (`Enter` or `←`).
- **Focus** enlarges an expanded Step to full screen.
- **Exit focus** returns to the same Step and scroll position in the Story.

## Example dialogue

> **Developer:** “In the **Extract PDF batch Story**, which **Step** waits for the document work?”

> **Domain expert:** “The **Merge extraction results Step** does. Expand it to inspect its **Implementation**.”

> **Developer:** “Which calls coordinate the wait and failure handling?”

> **Domain expert:** “The **Implementation Trace** shows the async barrier, failure classification, and normalized results, with a **Source Trace** to the supporting code.”

## Naming rules

- Use **Story**, **Step**, and **Implementation** as the only level names.
- Use **Event**, **Action**, **Decision**, and **Outcome** only as Step types.
- Use **Step** for product or domain meaning. Use **Implementation Call** for source-level work.
- Avoid **behavior**, **semantic operation**, and numbered depth labels in product text.
- Qualify inputs and outputs as **Step Input** and **Step Output** when the level is unclear.
- Use **Execution Context** for the boundary responsible for a Step.
