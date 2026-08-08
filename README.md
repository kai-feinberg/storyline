# Storyline

Storyline helps people see the story behind the code. It turns source code into understandable user stories and flows that show how a product behaves from a human and business perspective.

The primary visualization is the **user story**: a meaningful flow through the product, such as signing in, completing a payment, extracting information from a document, or searching for a result. Data structures, services, dependencies, and implementation details support that story rather than becoming the main experience.

## What we want to accomplish

We want to make unfamiliar codebases easier to understand by helping a reader:

- See the user story and the product behavior it represents first.
- Follow the smallest useful explanation of a flow without starting at the system or data level.
- Expand a behavior locally without losing the original mental model.
- Distinguish the story’s progression from data dependencies and implementation calls.
- Inspect meaningful inputs, outputs, branches, and external boundaries.
- Trace semantic behaviors back to functions, files, services, APIs, and queries when needed.

The guiding principle is: **represent code according to what it accomplishes, then reveal how it works only when more detail is useful.**

## Core approach

Storyline uses progressive disclosure around the user story:

1. **User story:** What is the person trying to accomplish, and what happens from the product perspective?
2. **Semantic operations:** What work is required inside a behavior?
3. **Implementation/source:** How and where is the behavior implemented?

The default view should normally contain about 3–7 meaningful story steps. Groups are created only when several operations collectively produce a recognizable outcome. Dependencies are usually shown as metadata rather than arrows so that story progression does not imply a false causal relationship.

## Example

```text
User story: Confirm a completed payment

Payment Completed
→ Prepare Payment Confirmation
→ Send Payment Confirmation
→ Confirmation Sent
```

Expanding one behavior reveals its semantic operations:

```text
Prepare Payment Confirmation
├ Match Payment to User
├ Match Payment to Order
├ Fetch Order Details
└ Generate Payment Confirmation
```

Selecting a node can reveal its needs, outputs, alternatives, and source location without replacing the original node.

## Project guide

The complete semantic representation and naming rules are documented in [semantic_behavior_graph_guide.md](semantic_behavior_graph_guide.md). The guide describes the model underneath Storyline; the product experience should lead with user stories rather than data or system diagrams.

## Visualization priorities

1. **User stories and product flows** are the primary view.
2. **Semantic behavior expansions** explain what happens inside a story step.
3. **Data, system, and dependency views** provide supporting context when someone needs to investigate how the story is implemented.

## Current priorities

- Define a reliable model for user stories, flows, behaviors, semantic operations, metadata, and implementation evidence.
- Build an analyzer that reconstructs behavior before choosing graph labels or grouping.
- Identify user-facing stories and connect them to the code paths that implement them.
- Generate consistent labels using canonical semantic vocabulary.
- Support independent disclosure of child operations, dependencies, branches, and source code.
- Add quality checks for comprehension, grouping, semantic altitude, arrow meaning, uncertainty, and evidence grounding.
- Test the approach against representative flows such as payments, document extraction, search, renewals, and authentication.

## Non-goals

This project is not intended to make a data model, system architecture diagram, or complete call graph the primary experience. It is also not intended to expose every local variable or replace source code with a simplified diagram. Storyline should remain human-centered, semantically useful, traceable, and honest about uncertainty.

## Status

This repository currently contains the Storyline design guide and project framing. Implementation details, supported languages, and runtime architecture will be established as the project moves from specification into prototyping.
