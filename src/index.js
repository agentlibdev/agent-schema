import YAML from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import agentSchema from '../schemas/agent.schema.json' with { type: 'json' };

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(agentSchema);

function parseManifestYaml(source) {
  return YAML.parse(source);
}

function validateManifest(manifest) {
  return validate(manifest) === true;
}

export { agentSchema, parseManifestYaml, validateManifest };
