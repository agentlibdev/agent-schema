export type AgentSchema = Record<string, unknown>;

export declare const agentSchema: AgentSchema;

export declare function parseManifestYaml(source: string): unknown;

export declare function validateManifest(manifest: unknown): boolean;
