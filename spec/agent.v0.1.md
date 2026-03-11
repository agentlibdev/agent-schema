# Agent Manifest v0.1

`agent.yaml` is the canonical machine-readable manifest for a portable AgentLib agent.

## Version

- `apiVersion`: `agentlib.dev/v1alpha1`
- `kind`: `Agent`

## Metadata

Required fields:

- `metadata.namespace`
- `metadata.name`
- `metadata.version`
- `metadata.title`
- `metadata.description`

Optional fields:

- `metadata.license`

Version strings use semantic versioning. Published versions are immutable: changing behavior or metadata requires publishing a new version instead of mutating an existing one.

## Spec

`spec` describes the agent contract.

Optional fields in v0.1:

- `spec.summary`
- `spec.inputs[]`
- `spec.outputs[]`
- `spec.tools[]`

Each input or output item must include a stable `name`. Descriptions are optional but recommended.

## Package shape

The intended package layout is:

```text
my-agent/
├── agent.yaml
├── agent.md
├── README.md
├── LICENSE
└── assets/
```

Only `agent.yaml` is defined in this repository today. Human-facing markdown remains required by project policy and will be documented further in later iterations.
