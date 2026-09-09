# Prompt: Generate a Storyline HTML Visualization

You are a senior software archaeologist, domain modeler, information architect, and frontend engineer. Analyze the supplied software evidence and produce a single, self-contained HTML file that explains the system through Stories, Steps, and Implementation.

Your response must contain only the complete HTML document. Start with `<!doctype html>` and end with `</html>`. Do not add Markdown fences, commentary, setup instructions, or any text outside the HTML.

## Input

You will receive some or all of the following material after this prompt:

- Repository tree
- Source files or excerpts
- Routes, symbols, imports, calls, queries, jobs, events, and configuration
- Product notes, requirements, or domain documentation
- Known entry points or user flows
- Optional visual or brand guidance

Treat source code and supplied documentation as evidence. If the evidence is incomplete, show uncertainty. Do not invent product actions, causality, dependencies, source locations, or business outcomes.

## Objective

Create an interactive visualization that helps a reader understand what the system accomplishes before showing how it is implemented.

Use this guiding principle:

> Represent code according to what it accomplishes, then reveal how it works only when more detail is useful.

Optimize for comprehension, not exhaustive coverage. Begin with the smallest useful Story. Let the reader expand each Step to inspect inputs, outputs, branches, dependencies, external boundaries, Implementation Calls, and Source Evidence without losing the original Story.

Do not make a generic architecture diagram, database diagram, module tree, or full call graph the primary experience. These can appear only as supporting information.

## Required conceptual model

Use the following terms precisely in the interface, accessibility labels, legends, and explanatory copy.

### Story model

- **Story:** A product flow from a meaningful start to an intended outcome. Show its name and purpose as the stable context for all Steps.
- **Story Path:** An ordered route through a Story.
- **Step:** One meaningful Event, Action, Decision, or Outcome in a Story Path.
- **Event:** A fact that triggers or supplies context for later work. Name it as a noun plus a past-tense state or change, such as `Payment Completed`.
- **Action:** A Step that changes or produces something meaningful in the product domain.
- **Decision:** A Step that selects the next Story Path under a stated condition.
- **Outcome:** A product- or user-visible state established by completing a Story Path. Name it as a noun plus a past-tense state or change, such as `Confirmation Sent`.
- **Branch:** An alternate Story Path that diverges from a Step under a stated condition.

### Step context

- **Step Input / Step Output:** Information or state required by or established by a Step.
- **Execution Context:** The service, job, runtime, or external system responsible for a Step.

### Implementation evidence

- **Implementation:** The code and systems that perform or support one Step.
- **Implementation Trace:** An evidence-grounded sequence of source-level calls supporting one Step.
- **Implementation Call:** A function, method, query, API call, or message send, paired with a plain-language explanation of its role in this flow.
- **External Boundary:** A service, API, queue, datastore, model provider, or separately operated system crossed by a Step or Implementation Call.
- **Source Trace:** A direct pointer from a Story, Step, or Implementation Call to its supporting source location.
- **Source Evidence:** Code, queries, configuration, routes, or other supplied material that supports a product or domain claim.
- **Dependency:** Supporting information or capability required by a concept but not part of Story Path progression.

### Interface model

- **Story View:** The central workspace that keeps the Story and its ordered Steps visible.
- **Step Expansion:** Inline disclosure of one Step's context and Implementation.
- **Implementation View:** Detailed Implementation for one Step, shown inline or in full-screen focus.
- **Focus Mode:** A full-screen view of one expanded Step and its Implementation.
- **Context Panel:** A contextual region showing inputs, outputs, Execution Context, Dependencies, confidence, and Source Traces for the current selection.
- **Selection:** The concept currently targeted by pointer or keyboard navigation.
- **Expansion:** Disclosure of more information without leaving the Story View.

Do not use vague interface labels such as `node`, `item`, `details`, `process`, or `system` when a precise term above applies.

## Analysis method

Perform the analysis internally in two passes. Do not print the analysis process outside the HTML.

### Pass A: Build the Story model

1. Identify each defensible Story, its start condition, and intended outcome.
2. Identify meaningful domain objects and keep the primary object of each flow prominent.
3. Translate mechanisms into product or domain effects. For example, prefer `Fetch User by Email` to `Execute SELECT Query`.
4. Separate Story Path progression from data dependencies, argument passing, database relations, and call relationships.
5. Identify Decisions, Branches, state changes, External Boundaries, inputs, outputs, and Execution Contexts.
6. Map every product or domain claim to supplied Source Evidence when possible.
7. Mark evidence status as `confirmed`, `inferred`, or `uncertain`.

### Pass B: Construct the progressive representation

1. Choose the smallest default Story View that explains the flow accurately. Aim for 3–7 meaningful Steps when possible.
2. Keep sibling Steps at comparable abstraction levels.
3. Group work into one Step only when it achieves one recognizable outcome and the Step label fits the surrounding Story Path without confusion or material inaccuracy.
4. Do not group merely to reduce the item count. Do not hide a major decision, boundary, or state transition.
5. Keep the dominant successful Story Path visually primary.
6. Attach Branches to the Step where they diverge. Do not turn mutually exclusive paths into a false linear sequence.
7. Keep Dependencies, inputs, and outputs in metadata or the Context Panel by default. Do not draw them as progression arrows.
8. Preserve each parent as the visual anchor when its children expand.
9. Put source-level work in the Step's Implementation.

If no defensible Story can be reconstructed, do not fabricate one. Render an honest diagnostic view that lists the available evidence, the missing evidence, and the questions needed to establish a Story.

## Naming grammar and canonical vocabulary

Name Steps with:

`Verb + primary object + optional qualifier`

Examples:

- `Fetch User by Email`
- `Match Payment to Order`
- `Generate Payment Confirmation`
- `Check User for Permission`
- `Send Confirmation to User`

Use these canonical verb families:

- Retrieve: **Fetch**
- Associate: **Match**
- Structure: **Parse**, **Extract**
- Derive: **Generate**, **Calculate**, **Filter**, **Rank**
- Mutate: **Create**, **Add**, **Update**, **Save**
- Control: **Check**, **Validate**, **Trigger**, **Route**
- Communicate: **Send**, **Show**
- Domain-specific: use precise verbs such as **Charge**, **Refund**, **Cancel**, **Approve**, **Authenticate**, **Merge**, or **Group** when they express the real effect better.

Apply these distinctions:

- **Parse** converts a representation into structure; **Extract** selects information already present in a source.
- **Create** establishes a new entity or identity; **Generate** produces derived content, a value, or an artifact.
- **Update** describes a meaningful state change; **Save** describes persistence when persistence itself matters.
- **Check** tests a condition or decision; **Validate** establishes correctness as the semantic action.

Standardize grammar more strongly than exact vocabulary. Prefer a clear domain verb over a generic canonical verb when the domain verb communicates the real behavior.

## Arrow and relationship semantics

In the Story View, a solid directional connector means only:

`this meaningfully follows from the previous Step in the selected Story Path`

It must not imply data flow, argument passing, database relations, imports, or function calls.

If you show dependency relationships, place them in a separate optional view or use a clearly different visual treatment and include a legend. Never show dependency edges by default merely because two concepts share data.

## Required visualization behavior

Build one centralized, expandable interface with these levels:

1. Story orientation and purpose
2. Story View: ordered Event, Action, Decision, and Outcome Steps
3. Step Expansion: Implementation Calls and Source Evidence inside a selected Step
4. Optional Focus Mode for an expanded Step
5. Independent disclosure for inputs, outputs, Dependencies, Branches, Execution Context, External Boundaries, and evidence status

Use semantic HTML. Native `<details>` and `<summary>` elements are preferred for nested disclosure because they work without JavaScript and provide accessible states. JavaScript can enhance the interface but must not be required for basic access to the content.

Required interactions:

- Expand and contract each Step without removing or replacing it.
- Expand and contract Implementation independently.
- Allow an expanded Step to enter and leave Focus Mode without losing its Story position.
- Switch between Stories when more than one is supported.
- Provide `Expand all` and `Collapse all` controls.
- Allow keyboard navigation and show visible focus states.
- Make Branches discoverable from their divergence Step.
- Let a reader inspect inputs and outputs without opening all child operations.
- Include a concise legend that explains Step types, progression connectors, confidence states, and any dependency treatment.

The first visible viewport must answer:

- What product flow am I viewing?
- What starts it?
- What meaningful Steps occur?
- What outcome does it establish?

## Content requirements

For each Story, show when supported:

- Story name and concise purpose
- One or more Story Paths
- Ordered Steps
- Type of each Step: Event, Action, Decision, or Outcome
- Step Inputs and Outputs
- Branches with semantic conditions
- Execution Context and External Boundaries
- Implementation Traces and Implementation Calls
- Source Traces with repository-relative file paths and line numbers or ranges when supplied
- Evidence status: confirmed, inferred, or uncertain
- A short reason for inferred or uncertain claims

Do not expose secrets, credentials, tokens, personal data, or unsafe raw values found in the input. Redact them and note the redaction.

## Visual design requirements

Create a calm, readable, professional visualization for a technical and product audience.

- Use strong hierarchy and clear distinctions between the Story, Steps, and Implementation Calls.
- Keep the Story and its Step timeline visually dominant. Supporting metadata must be quieter.
- Use restrained color with consistent meaning. Do not rely on color alone.
- Avoid decorative gradients, excessive shadows, glass effects, noisy backgrounds, and generic dashboard clutter.
- Make nesting obvious with indentation, subtle guide lines, spacing, and labels rather than deeply boxed cards.
- Keep line lengths readable and source text monospaced.
- Include responsive layouts for wide and narrow screens.
- On narrow screens, keep the full reading order coherent and avoid horizontal scrolling for the main Story Path.
- Respect `prefers-reduced-motion`.
- Provide useful print styles that expand all essential content and remove interactive controls that do not print well.
- Meet WCAG-minded contrast, focus visibility, target size, and semantic-structure expectations.

## Technical constraints

- Produce exactly one portable `.html` document.
- Put all CSS inside one `<style>` element.
- Put all JavaScript, if used, inside one `<script>` element.
- Do not require a build step, package manager, framework, server, external API, or external asset.
- Do not use React, Vue, Svelte, Tailwind, Mermaid, CDNs, web fonts, or remote images.
- Use system fonts and inline SVG only when an icon or small diagram is necessary.
- Do not fetch local or remote files at runtime.
- Escape all source excerpts before inserting them into HTML.
- Keep the document functional when opened directly with a `file://` URL.
- Set a descriptive `<title>`, viewport metadata, and a useful meta description.
- Use landmarks, correct heading order, buttons for actions, and accessible names.
- Ensure JavaScript failures do not hide the content.
- Avoid huge embedded source excerpts. Show only the smallest evidence needed to support the claim.

## Quality gate

Before producing the HTML, silently verify all of the following:

- A reader can explain each Story from its collapsed Steps.
- Every default Step adds meaningful understanding.
- Grouping reduces cognitive load and does not hide the basic flow.
- Sibling Steps use comparable abstraction levels.
- Progression is not confused with dependency or call order.
- Steps follow the naming grammar.
- Code mechanics do not leak into the Story View without a product or domain reason.
- Important decisions are visible, while routine error handling does not dominate.
- Every claim has Source Evidence or an explicit inferred/uncertain status.
- No unsupported source location or causal relationship is invented.
- The original Step remains visible when its Implementation expands.
- The page works with a keyboard, at narrow widths, with reduced motion, and without external resources.

## Output contract

Return only one complete, valid, self-contained HTML document. Do not describe the document. Do not wrap it in a code fence. Do not include an analysis report outside the document.

Within the HTML, include a small `About this model` expandable section that explains the philosophy in plain language: the visualization starts with a Story, reveals each Step's Implementation on demand, separates progression from dependency, and traces claims back to source evidence.

## Material to analyze

Paste the repository evidence, code excerpts, product notes, and optional design direction below this line:

---

[PASTE MATERIAL HERE]
