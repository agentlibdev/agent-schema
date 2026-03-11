import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';

const root = resolve(process.cwd());

async function loadSchema() {
  const raw = await readFile(resolve(root, 'schemas/agent.schema.json'), 'utf8');
  return JSON.parse(raw);
}

async function loadYaml(path) {
  return YAML.parse(await readFile(path, 'utf8'));
}

async function collectAgentFiles(baseDir) {
  const entries = await readdir(baseDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    files.push(resolve(baseDir, entry.name, 'agent.yaml'));
  }

  return files;
}

const schema = await loadSchema();
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const validFiles = await collectAgentFiles(resolve(root, 'examples/valid'));
const invalidFiles = await collectAgentFiles(resolve(root, 'examples/invalid'));

let failures = 0;

for (const file of validFiles) {
  const manifest = await loadYaml(file);
  if (!validate(manifest)) {
    console.error(`Expected valid fixture to pass: ${file}`);
    console.error(JSON.stringify(validate.errors, null, 2));
    failures += 1;
  }
}

for (const file of invalidFiles) {
  const manifest = await loadYaml(file);
  if (validate(manifest)) {
    console.error(`Expected invalid fixture to fail: ${file}`);
    failures += 1;
  }
}

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log(`Validated ${validFiles.length} valid and ${invalidFiles.length} invalid fixtures.`);
}
