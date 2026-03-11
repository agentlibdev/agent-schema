import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';

const root = resolve(process.cwd());

async function loadJson(path) {
  return JSON.parse(await readFile(resolve(root, path), 'utf8'));
}

async function loadYaml(path) {
  return YAML.parse(await readFile(resolve(root, path), 'utf8'));
}

test('accepts the minimal valid agent manifest fixture', async () => {
  const schema = await loadJson('schemas/agent.schema.json');
  const manifest = await loadYaml('examples/valid/minimal-agent/agent.yaml');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const valid = validate(manifest);

  assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
});

test('accepts a richer valid fixture with multiple tools and outputs', async () => {
  const schema = await loadJson('schemas/agent.schema.json');
  const manifest = await loadYaml('examples/valid/support-triager/agent.yaml');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const valid = validate(manifest);

  assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
});

test('rejects a manifest that omits metadata.version', async () => {
  const schema = await loadJson('schemas/agent.schema.json');
  const manifest = await loadYaml('examples/invalid/missing-version/agent.yaml');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const valid = validate(manifest);

  assert.equal(valid, false);
  assert.match(JSON.stringify(validate.errors), /metadata/);
  assert.match(JSON.stringify(validate.errors), /version/);
});

test('rejects a manifest with an invalid namespace format', async () => {
  const schema = await loadJson('schemas/agent.schema.json');
  const manifest = await loadYaml('examples/invalid/invalid-namespace/agent.yaml');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const valid = validate(manifest);

  assert.equal(valid, false);
  assert.match(JSON.stringify(validate.errors), /namespace/);
});

test('rejects a manifest with unsupported top-level properties', async () => {
  const schema = await loadJson('schemas/agent.schema.json');
  const manifest = await loadYaml('examples/invalid/extra-top-level/agent.yaml');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const valid = validate(manifest);

  assert.equal(valid, false);
  assert.match(JSON.stringify(validate.errors), /additionalProperties/);
});
