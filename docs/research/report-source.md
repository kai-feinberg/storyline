# Source ledger: repositories similar to Storyline

Accessed 2026-09-05. This is the internal claim-to-source ledger for the user-facing report.

## Scope and interpretation

The comparison treats Storyline as an agent-generated, repository-local model of product behavior. Its primary hierarchy is Story -> Step -> Implementation. It favors user or system outcomes, ordered behavior, progressive disclosure, exact source evidence, explicit uncertainty, a validated JSON contract, and a local viewer. It deliberately does not make file trees, dependency graphs, data models, or complete call graphs the main experience.

Local sources:

- Storyline README: `/Users/kai/Documents/storyline/README.md`
- How Storyline Works: `/Users/kai/Documents/storyline/docs/how-storyline-works.md`
- Product definition: `/Users/kai/Documents/storyline/docs/product/product.md`
- Understanding contract: `/Users/kai/Documents/storyline/plugins/storyline/skills/storyline-understand/references/understanding-contract.md`

## External claims and primary sources

- CodeSee: agent-maintained `.codesee/features.json`; Epic -> Feature -> Step; triggers, branches, refs, confidence, provenance, tours; source or spec-driven generation; local folder access; MIT. Sources: https://github.com/Kaka-cheaper/codeSee and https://github.com/Kaka-cheaper/codeSee/blob/main/prompts/_schema.md
- Cartographer: behavior-first exploration; persistent evidence-grounded world model; exact source proof; boundaries emerge from flows; semantic zoom; behavior slices; local service; MIT. Sources: https://github.com/miltonian/cartographer and https://github.com/miltonian/cartographer/blob/main/plugin/skills/explore/SKILL.md
- Understand Anything: structural graph plus separate business-domain view with domains, flows, and steps; multi-agent analysis; guided tours; source inspection; incremental updates; local tokenized viewer; JSON can be committed; MIT. Sources: https://github.com/Egonex-AI/Understand-Anything and https://github.com/Egonex-AI/Understand-Anything/blob/main/understand-anything-plugin/packages/core/src/schema.ts
- SourceBridge: requirement-aware code comprehension; workflow stories, code tours, learning paths, architecture diagrams; Tree-sitter index; requirement-to-code traceability; MCP and VS Code integration; AGPL-3.0. Source: https://github.com/sourcebridge-ai/sourcebridge
- Visual Project Map: agent-generated JSON; interface-first folder contracts; inputs/outputs and end-to-end data flow; progressive disclosure; no build step; MIT. Source: https://github.com/georgegui/visual-project-map
- CodeBoarding: interactive architecture diagrams; hybrid static analysis and LLM synthesis; recursive component documents with source references; checked-in analysis artifact; multiple languages/providers; MIT. Source: https://github.com/CodeBoarding/CodeBoarding
- CodeWiki: holistic repository documentation; hierarchical decomposition; recursive multi-agent processing; Markdown, Mermaid and interactive output; benchmark and paper; MIT stated in README. Sources: https://github.com/FSoft-AI4Code/CodeWiki and https://arxiv.org/abs/2510.24428
- AppMap: JSON specification for actual runtime execution events, code-object hierarchy, parameters, HTTP/SQL details, and source locations; behavior and sequence visualization. Sources: https://github.com/getappmap/appmap and https://github.com/marketplace/get-appmap
- Codag: Tree-sitter and pattern matching find LLM calls; call graph plus LLM semantic pass creates workflow DAG; branches, transformations, source links, incremental updates; limited to AI/LLM workflows; MIT. Source: https://github.com/codag-megalith/codag-visualizer
- GitDiagram: two-stage model generation from repository tree and README; architecture explanation and strict graph AST; validates linked repository paths; Mermaid and source links; MIT. Source: https://github.com/ahmedkhaleel2004/gitdiagram
- CodeTour: manually authored ordered walkthroughs tied to directories or exact file lines; stored as JSON in a repository; versionable to Git refs; MIT. Source: https://github.com/microsoft/codetour
- CodeAtlas: deterministic structural map, published schema, optional AI enrichment that may relabel but does not create mechanical facts; flows and tours; MIT. Source: https://github.com/Memnoc/CodeAtlas

Repository metadata was read from the GitHub REST API on 2026-09-05. Star counts are volatile and are not used as quality evidence. Creation dates are also not used to imply idea provenance.

## Confidence and unresolved points

- High confidence on declared product model and architecture where schemas or skills were inspected.
- Medium confidence on practical analysis quality because the candidates were not all run on the same repository.
- No independent accuracy benchmark spans these tools. CodeWiki's own benchmark does not measure Storyline's behavior-first objective.
- Similar language does not establish influence or copying. Repository creation dates cannot establish when concepts were independently developed.
