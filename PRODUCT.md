# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing Vite + React project.

## Users

Developers who need to understand an unfamiliar codebase from a human and business perspective. Technical collaborators and product or business stakeholders are secondary audiences.

## Product Purpose

Storyline helps people see the story behind code. It uses an LLM to turn source code into understandable user stories and flows that show how a product behaves. Success means a developer can understand a meaningful product flow first, build a comprehensive mental model of how a codebase works, and progressively inspect deeper implementation details when needed.

## Positioning

Storyline represents code according to what it accomplishes for people, then reveals how it works only when more detail is useful. Its primary experience is the user story—not a data model, system architecture diagram, or complete call graph.

## Operating Context

Readers begin with a user-facing story, such as signing in, completing a payment, extracting information from a document, or searching for a result. They follow approximately 3–7 meaningful story steps, expand a behavior to inspect its semantic operations, and select nodes to inspect needs, outputs, alternatives, and implementation evidence without losing the original mental model.

## Capabilities and Constraints

- The primary visualization is a user story: a meaningful flow through a product.
- Storyline uses progressive disclosure across three levels: user story, semantic operations, and implementation/source.
- Data structures, services, dependencies, and implementation details support the story rather than becoming the main experience.
- Readers should be able to inspect meaningful inputs, outputs, branches, and external boundaries.
- Semantic behaviors should trace back to functions, files, services, APIs, and queries when needed.
- Dependencies are generally metadata rather than arrows, because story progression must not imply false causality.
- Groups are created only when several operations collectively produce a recognizable outcome.
- The product should remain human-centered, semantically useful, traceable, and honest about uncertainty.
- The product intends to support all repositories and programming languages, and eventually non-code material as well.
- An LLM generates the graph data.
- The current implementation is an early Vite + React prototype; runtime architecture remains undecided.

## Brand Commitments

The experience should feel calming, friendly, and intuitive. The interface should help readers build understanding without unnecessary cognitive pressure or intimidation.

## Evidence on Hand

- Product framing and semantic representation guidance: [README.md](README.md)
- Detailed semantic representation and naming rules: [semantic_behavior_graph_guide.md](semantic_behavior_graph_guide.md)
- Current repository is primarily a design guide and project framing, with implementation details still being established.
- No testimonials, customer evidence, benchmark claims, or other external proof are established; future work must not fabricate them.

## Product Principles

- Lead with the human story.
- Reveal complexity progressively.
- Preserve the reader’s mental model while exploring details.
- Make semantic claims traceable to implementation evidence.
- Be precise and honest about uncertainty.
- Reduce intimidation through a calm, friendly, intuitive experience.

## Accessibility & Inclusion

No product-specific accessibility standard or user need is established yet. Future work should treat accessibility as a requirement and confirm the target standard before detailed interface work.

## Open Decisions

- Which accessibility target should the product commit to?
- What is the intended deployment/runtime architecture beyond the current prototype?
