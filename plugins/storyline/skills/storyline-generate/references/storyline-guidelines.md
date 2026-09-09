# Storyline Guidelines

Use these guidelines to turn a Repository Understanding and source code into a Visualization Artifact. Read this file before the vocabulary, schema, and examples.

## Goal

Explain what a product does as a small set of evidence-backed Stories. Each Story must be understandable in plain language before the reader opens its Implementation.

The default view answers what an actor tries to complete, what meaningful events, actions, decisions, and outcomes occur, and in what order. Implementation detail answers where and how each Step runs. It must not define the Story structure by itself.

## Use the supplied inputs

Use the inputs in this order:

1. Read `.storyline/understanding.json` for the project purpose, concepts, entry points, candidate behaviors, evidence, and unknowns.
2. Read relevant product documents to confirm user goals and domain words.
3. Read source code to resolve gaps and verify important claims.
4. Read `ubiquitous-language.md` to normalize terms and labels.
5. Read `artifact.schema.json` to satisfy the data contract.
6. Read every JSON file in `examples/` to learn the expected selection, grouping, wording, and detail.

The schema defines valid structure. Examples show editorial judgment. Source evidence determines truth. Never copy an unsupported example.

## 1. Form a product model

Before selecting Stories, identify:

- The people or systems that start work.
- The valuable outcomes they can complete.
- The domain objects that move or change.
- The entry points that start each behavior.
- The applications, services, workers, data stores, and external systems involved.
- Stable terms in product documents and source code.

Do not begin with routes, folders, classes, or database tables. These are evidence, not the product model.

## 2. Find candidate Stories

A Story is a meaningful behavior from a supported trigger to an intended outcome. Prefer behavior that an end user, operator, administrator, external client, scheduled process, or receiving system can recognize.

Good candidates include:

- Add an item to a cart and complete checkout.
- Upload a document and process its contents.
- Invite a member and establish access.
- Submit a search and review ranked results.
- Renew a subscription and send a receipt.

Do not make these Stories by default:

- One route with no complete outcome.
- A utility, hook, adapter, repository class, or framework lifecycle.
- Logging, telemetry, serialization, or configuration loading.
- A list of CRUD endpoints when they support one larger behavior.
- A speculative flow inferred only from names or file proximity.

For each candidate, identify its actor, trigger, intended outcome, main domain object, important state changes or boundaries, entry point, and supporting evidence. Reject or merge candidates that do not have a distinct goal and outcome.

## 3. Set Story boundaries

Choose the smallest boundary that still explains a complete behavior.

- Start when a meaningful event enters the system, not when a framework function runs.
- End when the promised result is established or made available.
- Include cross-service and asynchronous work when it is required for the outcome.
- Split a long flow when parts have separate actors, triggers, outcomes, or useful independent lifecycles.
- Merge related endpoints when they are technical parts of one user behavior.

A Story can be system-initiated, but its result must matter to a user, operator, external system, or product rule.

## 4. Build the default Story Path

Trace the dominant successful path from trigger to outcome. Convert source operations into meaningful Steps. Each Step must be exactly one Event, Action, Decision, or Outcome.

Aim for 3–7 Steps when the evidence supports this detail. Use fewer or more when needed. Do not create filler Steps to meet a count. Keep sibling Steps at a similar abstraction level.

Good:

```text
Order submitted
→ Validate order
→ Charge customer
→ Prepare shipment
→ Order confirmed
```

Bad:

```text
Order submitted
→ parseBody()
→ Process payment
→ SQL INSERT
→ Order confirmed
```

## 5. Group source work into Steps

Create one Step when several source operations collectively produce one recognizable result. The Step title must replace those operations in the Story without losing essential meaning.

Group work when it has one clear domain effect, its internal calls do not help the default path, and a precise plain-language title exists.

Do not group work when it hides a path-changing decision, user-visible state change, important external boundary, or separate outcome. Do not use vague groups such as **Process data** or **Handle request**.

Stop creating Steps when the next useful detail is mainly functions, queries, API calls, or framework mechanics. Put that detail in the Implementation.

## 6. Model paths and dependencies

Story progression means “this meaningfully follows from.” It does not mean argument passing, data dependency, import relation, or function call.

- Keep ordinary Step Inputs and Step Outputs as metadata.
- Add an alternate Story Path only when it materially changes progression or outcome.
- Keep rare technical failures in Diagnostics or Implementation detail.
- Show a Decision when a product rule, permission, review, or outcome changes the route.
- Do not linearize mutually exclusive branches into one false sequence.
- Name branch conditions in domain language, not as raw Boolean expressions.

Keep the dominant successful path easy to follow.

## 7. Add Implementation evidence

After the Story and Steps are stable, attach the code that performs each Step. An Implementation can include the Execution Context, Step Inputs and Outputs, ordered Implementation Calls, queries, messages, jobs, external APIs, and Source Evidence.

Describe each Implementation Call in plain language. Keep exact symbols and paths for traceability. Include a call only when it explains control, transformation, persistence, a boundary, or a significant rule.

## 8. Apply language rules

Use `ubiquitous-language.md`.

- Story title: outcome-oriented verb phrase, such as **Complete checkout**.
- Action title: verb + primary object + optional qualifier, such as **Fetch user by email**.
- Event or Outcome title: noun + meaningful state, such as **Document uploaded**.
- Decision title: concise question or condition, such as **Review required?**.
- Summary: one plain sentence that explains meaning, not mechanism.
- Execution Context: responsible runtime boundary, not a source folder.

Use one canonical noun for each concept. Preserve distinct source terms when they have different rules, identities, or lifecycles.

## 9. Preserve evidence and uncertainty

- Support every semantic claim with Source Evidence.
- Use repository-relative POSIX paths and checked line ranges.
- Mark claims `confirmed`, `inferred`, or `uncertain`.
- Do not infer causality from naming, adjacency, imports, or route order alone.
- Do not invent actors, intent, data flow, external systems, or outcomes.
- Use the least specific accurate label when evidence is incomplete.
- Add a Diagnostic when a material gap affects comprehension.
- Exclude secrets, credentials, local environment values, and large source excerpts.

## 10. Review the artifact

| Check | Question |
| --- | --- |
| Product comprehension | Can a reader explain what the product does from the Story list? |
| Story boundary | Does each Story have a meaningful trigger and outcome? |
| Step necessity | Does each default Step add meaningful understanding? |
| Abstraction | Are sibling Steps at a similar level? |
| Grouping | Can adjacent Steps become one recognizable result without hiding meaning? |
| Progression | Do arrows describe progression instead of dependency? |
| Branches | Are material alternatives visible without letting rare failures dominate? |
| Language | Are titles plain, consistent, and compliant with the vocabulary? |
| Implementation leakage | Are source mechanics kept below the Step level? |
| Evidence | Can every claim be traced to checked source? |
| Restraint | Did the artifact omit unsupported or low-value detail? |

Then validate the JSON against `artifact.schema.json` and the Storyline CLI. Fix content problems, not only structural errors.

## Acceptance standard

Accept an artifact only when the project purpose is clear; each Story is a complete behavior; each default Story Path is understandable without opening Implementation; important decisions are visible; Implementation is useful and traceable; references resolve; uncertainty is explicit; and the artifact contains data only.
