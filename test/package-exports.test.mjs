import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(process.cwd());

async function readFixture(relativePath) {
  return readFile(resolve(root, relativePath), 'utf8');
}

test('package root exports schema and manifest helpers', async () => {
  const manifestModule = await import('@agentlibdev/agent-schema');
  const validYaml = await readFixture('examples/valid/minimal-agent/agent.yaml');
  const invalidYaml = await readFixture('examples/invalid/missing-version/agent.yaml');

  assert.ok(manifestModule.agentSchema);
  assert.equal(typeof manifestModule.parseManifestYaml, 'function');
  assert.equal(typeof manifestModule.validateManifest, 'function');

  const validManifest = manifestModule.parseManifestYaml(validYaml);
  const invalidManifest = manifestModule.parseManifestYaml(invalidYaml);

  assert.equal(manifestModule.validateManifest(validManifest), true);
  assert.equal(manifestModule.validateManifest(invalidManifest), false);
});
