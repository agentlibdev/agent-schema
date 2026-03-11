# agent-schema

Canonical AgentLib manifest schema, examples and validation fixtures.

## Scope

This repository owns the machine-readable contract for portable agents:

- `spec/agent.v0.1.md` documents the manifest
- `schemas/agent.schema.json` is the canonical JSON Schema
- `examples/valid/` contains fixtures that must validate
- `examples/invalid/` contains fixtures that must fail validation

## Current version

The first iteration defines `agentlib.dev/v1alpha1` for `kind: Agent`.

Core requirements:

- immutable published `metadata.version`
- markdown for humans, schema for machines
- portable package structure

## Validate locally

```bash
npm install
npm test
npm run validate:fixtures
```
