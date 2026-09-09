# Storyline Vocabulary

Use **Story → Step → Implementation → Implementation Call** as the only hierarchy.

| Term | Required meaning |
| --- | --- |
| Story | A complete, evidence-backed product behavior with a trigger and outcome. |
| Story Path | One ordered route through a Story. |
| Step | One meaningful Event, Action, Decision, or Outcome. |
| Event | A meaningful fact that starts or resumes progression. |
| Action | Work that retrieves, changes, derives, or communicates something meaningful. |
| Decision | A meaningful condition that selects a Story Path. |
| Outcome | The result established by a Story Path. |
| Step Input | Domain information or state required by a Step. |
| Step Output | Domain information, state, or event established by a Step. |
| Execution Context | The application, service, worker, job, or external system responsible for a Step. |
| External Boundary | A service, API, queue, data store, or model provider crossed by a Step. |
| Implementation | The technical work that performs one Step. |
| Implementation Call | A meaningful function, method, query, API call, or message send in an Implementation. |
| Source Evidence | The smallest useful source range that supports a claim. |
| Diagnostic | A recorded gap, conflict, or uncertainty. |

## Label grammar

- Story: outcome-oriented verb phrase, such as **Complete checkout**.
- Action: verb + primary object + optional qualifier, such as **Fetch order by ID**.
- Event and Outcome: noun + meaningful state, such as **Document uploaded**.
- Decision: concise question or condition, such as **Review required?**.
- Summary: one plain sentence about meaning, not mechanism.

## Preferred verbs

- **Fetch** existing information.
- **Match** existing objects.
- **Parse** a representation into structure.
- **Extract** information already present.
- **Generate** a derived value or artifact.
- **Create** a new domain identity.
- **Add** information to an existing object.
- **Update** meaningful state.
- **Save** when persistence itself matters.
- **Check** a condition and **Validate** correctness.
- **Send** across a boundary and **Show** to a user.
- Prefer a precise domain verb, such as **Charge**, **Refund**, or **Authenticate**, when it explains the effect better.

Do not use journey, workflow, use case, node, card, stage, operation, layer, or code Step as substitutes for the hierarchy terms. Use **behavior** only as a general description, not as a level.

Use one noun for one concept across the artifact. Do not merge source terms when their rules, identities, or lifecycles differ.
