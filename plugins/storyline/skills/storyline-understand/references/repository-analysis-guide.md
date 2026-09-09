# Repository Analysis Guide

Build a Repository Understanding that lets a later agent select clear product Stories without repeating discovery.

## Start broad

1. Read repository instructions, product documents, READMEs, manifests, workspace files, and deployment configuration.
2. Identify applications, packages, entry points, runtime boundaries, data stores, external systems, background work, and authentication.
3. Write a short hypothesis about the product, its actors, important domain objects, and valuable outcomes.
4. Treat names as leads. Confirm each important hypothesis through executable source paths.

## Find behavior from the outside in

Start from user or system entry points such as screens, commands, HTTP routes, events, queues, jobs, and webhooks. Trace through handlers, services, rules, persistence, external calls, and observable outputs.

For each candidate behavior, identify:

- Actor or initiator.
- Trigger and entry point.
- Intended product outcome.
- Main domain objects.
- Meaningful actions and state changes in execution order.
- Decisions and material alternate outcomes.
- Data stores and external boundaries.
- Supporting source ranges.

A behavior is not automatically a Story. Keep broad, evidence-backed candidates in the understanding. The generation skill will select and group final Stories.

## Choose useful evidence

- Follow imports and calls far enough to explain the outcome.
- Read implementation bodies, queries, schemas, and configuration when they affect meaning.
- Cite the smallest useful repository-relative source range.
- Distinguish observed facts from interpretation.
- Mark claims `confirmed`, `inferred`, or `uncertain`.
- Record competing explanations and important untraced areas.
- Do not infer behavior from a route, symbol, file, or folder name alone.
- Do not include secrets, environment values, generated code, dependencies, or large excerpts.

## Keep the intermediate model semantic

Use plain product and domain language for behavior names and stages. Keep exact symbols and files in evidence. A stage can be more detailed than a final Storyline Step, but it must describe a meaningful effect rather than a framework mechanism.

Good: **Validate uploaded document**, **Save extraction result**.

Bad: **Run middleware**, **Call helper**, **Execute INSERT**.

## Coverage standard

Prefer broad coverage of important outcomes over shallow coverage of every route. Include shared implementation only when it supports comprehension of one or more behaviors. Record a Diagnostic when an important area cannot be traced.
