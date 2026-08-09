# Ubiquitous Language

Storyline uses a three-layer model for moving from product meaning to source evidence:

**Product Story → Behavior → Implementation Trace**

## Product-story model

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Product Story** | A user-meaningful flow that describes what the product accomplishes from trigger to outcome. | Flow, journey, use case |
| **Story Path** | The ordered sequence of Story Steps currently being followed through a Product Story. | Main flow, happy path, route |
| **Story Step** | One meaningful unit in a Story Path, classified as an Event, Behavior, or Outcome. | Node, card, block, item |
| **Event** | A fact that provides the trigger or context for subsequent work in a Product Story. | Trigger step, start node |
| **Behavior** | A meaningful product capability that transforms inputs into an outcome and may contain Semantic Operations. | Process, action, service step |
| **Outcome** | A product- or user-visible state established by completing a Story Path. | End node, result step |
| **Branch** | An alternate Story Path that diverges from a specific Story Step under a stated condition. | Fork, alternative flow |

## Behavior model

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Semantic Operation** | One meaningful unit of internal work within a Behavior, named by the result it contributes. | Sub-step, child node, task |
| **Behavior Input** | Information or state required before a Behavior can begin. | Dependency, parameter |
| **Behavior Output** | Information or state established when a Behavior completes. | Result, return value |
| **Operation Input** | Information or state consumed by one Semantic Operation. | Argument, requirement |
| **Operation Output** | Information or state produced by one Semantic Operation. | Return, result |
| **Execution Context** | The service, external system, job, or runtime boundary responsible for a Story Step. | System, owner, component |

## Implementation evidence

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Implementation Trace** | An evidence-grounded sequence of source-level calls that supports one Semantic Operation. | Call graph, technical details, internals |
| **Implementation Call** | One function, method, query, API call, or message send within an Implementation Trace, paired with a plain-language description of what it does in this flow. | Function node, code step |
| **Source Trace** | A direct pointer from a semantic concept to the source location that supports it. | Link, citation, file chip |
| **Source Evidence** | The code, query, configuration, or external boundary used to justify a Storyline representation. | Proof, source detail |
| **Dependency** | Supporting information or capability required by a concept but not part of the Story Path’s progression. | Edge, arrow, relationship |

## Interface concepts

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Story Layer** | The interface layer that presents a Product Story as a Story Path. | Top level, overview page |
| **Behavior Layer** | The interface layer that decomposes one Behavior into Semantic Operations. | Deep view, second level, detail page |
| **Implementation Layer** | The expandable interface layer that presents an Implementation Trace for one Semantic Operation. | Dropdown, code details, third level |
| **Context Panel** | The right-edge surface that describes the currently selected concept’s inputs, outputs, and Source Trace. | Sidebar, inspector, details panel |
| **Navigation Rail** | The narrow global control surface for moving among major Storyline destinations. | Sidebar, left nav |
| **Story Tab** | A persistent tab representing one open Product Story. | Page tab, flow tab |
| **Story Picker** | The searchable selector used to find and open Product Stories. | Dropdown, story searchbar |
| **Selection** | The concept currently targeted by keyboard or pointer navigation. | Focus, active node |
| **Expansion** | The disclosure of a selected concept’s immediate child layer without changing its meaning. | Dropdown, open state |

## Relationships

- A **Product Story** contains one or more **Story Paths**.
- A **Story Path** contains three or more ordered **Story Steps**.
- A **Story Step** is exactly one **Event**, **Behavior**, or **Outcome**.
- A **Behavior** consumes **Behavior Inputs**, produces **Behavior Outputs**, and contains zero or more **Semantic Operations**.
- A **Semantic Operation** may have one **Implementation Trace**.
- An **Implementation Trace** contains one or more ordered **Implementation Calls** and one or more pieces of **Source Evidence**.
- A **Source Trace** connects a **Story Step**, **Behavior**, or **Semantic Operation** to its supporting **Source Evidence**.
- The **Context Panel** describes the current **Selection**; **Expansion** reveals its immediate child layer.

## Navigation language

- **Move** changes the Selection within the current layer (`↑` and `↓`).
- **Go deeper** enters the selected concept’s child layer (`→`).
- **Go back** returns to the parent layer or contracts the current Expansion (`←`).
- **Expand** or **contract** toggles inline disclosure without changing layers (`Enter`).

## Example dialogue

> **Developer:** “In the **Purchase credits Product Story**, which **Story Step** determines the account owner?”

> **Domain expert:** “The **Match payment to user Behavior** does. Enter its **Behavior Layer** to see the three **Semantic Operations**.”

> **Developer:** “The **Find candidate accounts Semantic Operation** looks important. What actually runs?”

> **Domain expert:** “Expand its **Implementation Layer**. The **Implementation Trace** shows the repository lookup, account filtering, and match ranking, with a **Source Trace** back to the supporting code.”

## Flagged ambiguities

- **Flow** has been used for both an entire user-meaningful scenario and one route through it. Use **Product Story** for the scenario and **Story Path** for its ordered route.
- **Step** can refer to both product behavior and internal work. Use **Story Step** at the Story Layer and **Semantic Operation** at the Behavior Layer.
- **Node** hides semantic altitude. Use **Story Step**, **Semantic Operation**, or **Implementation Call** according to the layer.
- **Details** can mean context, decomposition, or source code. Use **Context Panel**, **Behavior Layer**, or **Implementation Trace** specifically.
- **System** can mean an execution boundary, a product area, or the entire codebase. Use **Execution Context** for the boundary responsible for a Story Step.
- **Input** and **output** must be qualified when the layer matters: **Behavior Input/Output** or **Operation Input/Output**.
