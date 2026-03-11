# AGENTS.md

This file defines repo-specific operating rules for `agent-schema`.

The root [AGENTS.md](/home/raul/agentlibdev/AGENTS.md) still applies. This file narrows execution for the canonical manifest contract repository.

## Mission

Define the machine-readable contract for portable AgentLib agents.

This repo is the source of truth for:

- `agent.yaml` structure
- JSON Schema definitions
- compatibility rules
- manifest examples
- validation fixtures

## Scope Boundaries

This repo owns:

- schema shape and required fields
- versioning and compatibility notes
- valid and invalid examples
- validation tooling for local and CI use

This repo does not own:

- registry API behavior
- registry database schema
- provider integrations
- runtime execution semantics of agents

## Contract Rules

Prefer one canonical contract:

- markdown for humans
- JSON Schema for machines

The markdown spec and JSON Schema must not drift. If one changes, update the other in the same change.

## Versioning Rules

Published agent package versions are immutable.

Schema evolution rules:

- additive changes within an alpha line are preferred
- breaking changes require a new schema version
- examples must be updated when compatibility rules change

Do not introduce speculative fields without a concrete consumer.

## Initial Manifest Direction

The first useful version should remain intentionally small:

- identity
- version
- title and description
- optional license
- basic inputs
- basic outputs
- tools list

Do not over-model execution internals in v0.1.

## Repository Layout

Prefer:

- `spec/`
- `schemas/`
- `examples/valid/`
- `examples/invalid/`
- `scripts/`
- `test/`

Keep fixtures small and obvious. Each invalid example should fail for one primary reason.

## Testing Rules

Every schema rule worth keeping should have evidence:

- a valid fixture that passes
- an invalid fixture that fails when practical

Priority checks:

- required fields
- semver validation
- identifier format
- additional properties rejection
- backward compatibility expectations

Use TDD when changing behavior:

1. add failing validation test or fixture
2. verify failure
3. change schema minimally
4. verify pass

## Documentation Rules

Every schema change must update:

- the spec markdown
- relevant examples
- repo README if usage expectations changed

## Approval Gates For This Repo

Ask before:

- freezing `apiVersion`
- making a breaking schema change
- renaming public manifest fields
- changing package layout expectations that examples and docs will depend on

## Execution Priority

Unless directed otherwise, use this order:

1. define minimal manifest version
2. add JSON Schema
3. add valid and invalid fixtures
4. add validation tooling
5. document compatibility rules

## Definition of Done

Work in this repo is done when:

- schema and markdown spec match
- fixtures validate as expected
- checks pass
- compatibility impact is stated

