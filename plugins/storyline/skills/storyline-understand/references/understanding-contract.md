# Understanding Contract

Write `.storyline/understanding.json` with this shape. Add detail where useful, but preserve the named top-level collections.

```json
{
  "schemaVersion": "1.0.0",
  "project": {
    "name": "example",
    "root": ".",
    "purpose": "What this product accomplishes",
    "languages": ["TypeScript"],
    "frameworks": ["Next.js"],
    "applications": ["web"],
    "analyzedAt": "ISO-8601 timestamp"
  },
  "architecture": {
    "summary": "How the system is organized and runs",
    "components": [
      {
        "id": "component:web",
        "name": "Web application",
        "kind": "application",
        "responsibility": "User interface and HTTP API",
        "evidenceIds": ["evidence:app-layout"]
      }
    ],
    "boundaries": [],
    "dataStores": [],
    "externalSystems": []
  },
  "concepts": [
    {
      "id": "concept:project",
      "name": "Project",
      "definition": "A persisted unit of user work",
      "rules": [],
      "evidenceIds": []
    }
  ],
  "entryPoints": [
    {
      "id": "entry:post-projects",
      "kind": "http",
      "name": "Create project",
      "trigger": "POST /api/projects",
      "summary": "Accepts and stores a project",
      "evidenceIds": []
    }
  ],
  "behaviors": [
    {
      "id": "behavior:create-project",
      "name": "Create a project",
      "goal": "Preserve user work for later editing",
      "trigger": "A project submission",
      "outcome": "A persisted project is returned",
      "actors": ["user"],
      "entryPointIds": ["entry:post-projects"],
      "stages": [
        {
          "id": "stage:create-project:validate",
          "name": "Validate project data",
          "summary": "Checks the submitted project before persistence",
          "kind": "action",
          "inputs": [],
          "outputs": [],
          "implementation": [],
          "evidenceIds": []
        }
      ],
      "alternatePaths": [],
      "failureModes": [],
      "status": "confirmed",
      "evidenceIds": []
    }
  ],
  "evidence": [
    {
      "id": "evidence:app-layout",
      "path": "src/app/layout.tsx",
      "lineStart": 1,
      "lineEnd": 30,
      "symbol": "RootLayout",
      "kind": "source",
      "supports": "Defines the web application root",
      "status": "confirmed"
    }
  ],
  "unknowns": [],
  "diagnostics": []
}
```

## Behavior quality

A behavior is a meaningful user or system goal. It is not automatically equivalent to a route, file, class, or function.

Include:

- Trigger and intended outcome.
- Meaningful stages in execution order.
- Data or state read and written.
- Decisions and alternate paths.
- External boundaries.
- Implementation evidence.

Do not include standalone utilities unless they are necessary to explain a behavior.

## Coverage

Aim for broad coverage of important behavior. Prefer fewer well-supported behaviors over many shallow route summaries. Record a diagnostic when a major area could not be traced.
