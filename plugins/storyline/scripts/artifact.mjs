import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export const VERSION = '1.0.0';
export const dataPath = (root, file = '') => path.join(root, '.storyline', file);

const pluginRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifactSchema = JSON.parse(fs.readFileSync(path.join(pluginRoot, 'skills', 'storyline-generate', 'references', 'artifact.schema.json'), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validateSchema = ajv.compile(artifactSchema);

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

function sourceFiles(root) {
  const tracked = git(root, ['ls-files', '--cached', '--others', '--exclude-standard', '-z']);
  if (tracked !== null) return tracked.split('\0').filter((file) => file && file !== '.storyline' && !file.startsWith('.storyline/')).sort();

  const excluded = new Set(['.git', '.storyline', 'node_modules', 'dist', 'build', 'coverage']);
  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isSymbolicLink() || excluded.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(path.relative(root, absolute).split(path.sep).join('/'));
    }
  };
  visit(root);
  return files.sort();
}

export function sourceMetadata(root) {
  const hash = crypto.createHash('sha256');
  for (const relativePath of sourceFiles(root)) {
    const absolutePath = path.join(root, relativePath);
    hash.update(relativePath);
    hash.update('\0');
    if (!fs.existsSync(absolutePath)) hash.update('<missing>');
    else if (fs.lstatSync(absolutePath).isSymbolicLink()) hash.update(`<symlink:${fs.readlinkSync(absolutePath)}>`, 'utf8');
    else if (fs.lstatSync(absolutePath).isFile()) hash.update(fs.readFileSync(absolutePath));
    else hash.update('<non-file>');
    hash.update('\0');
  }
  const gitCommit = git(root, ['rev-parse', '--verify', 'HEAD']);
  const gitStatus = git(root, ['status', '--porcelain=v1', '--untracked-files=all', '--', '.', ':(exclude).storyline']);
  return {
    visualizationUpdatedAt: new Date().toISOString(),
    sourceFingerprint: `sha256:${hash.digest('hex')}`,
    gitCommit,
    gitDirty: gitStatus === null ? null : gitStatus.length > 0,
  };
}

export function stampArtifact(root) {
  const artifactPath = dataPath(root, 'visualization.json');
  const artifact = readJson(artifactPath);
  artifact.metadata = sourceMetadata(root);
  const temporaryPath = `${artifactPath}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(artifact, null, 2)}\n`, { flag: 'wx' });
  fs.renameSync(temporaryPath, artifactPath);
  return artifact;
}

export function initProject(root) {
  const directory = dataPath(root);
  fs.mkdirSync(directory, { recursive: true });
  const readme = path.join(directory, 'README.md');
  if (!fs.existsSync(readme)) {
    fs.writeFileSync(readme, `# Storyline workspace

This directory contains all Storyline output for this repository.

- \`understanding.json\`: evidence-backed repository understanding written by the \`storyline-understand\` skill.
- \`visualization.json\`: validated visualization artifact written by the \`storyline-generate\` skill.

Run \`storyline init <repository>\` to create this workspace. Storyline does not place generated artifacts elsewhere in the repository.
`);
  }
  return directory;
}

export function validateArtifact(artifact, { root, verifyEvidence = Boolean(root), verifyFreshness = false } = {}) {
  if (!validateSchema(artifact)) {
    const details = validateSchema.errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ');
    throw new Error(`Artifact schema validation failed: ${details}`);
  }

  const collectionNames = ['domains', 'stories', 'storyPaths', 'steps', 'implementations', 'calls', 'schemas', 'sourceEvidence'];
  const entities = collectionNames.filter((name) => !['relationships', 'diagnostics'].includes(name)).flatMap((name) => artifact[name]);
  const ids = new Set();
  for (const entity of entities) {
    if (!entity?.id) throw new Error('Every entity must have an id');
    if (ids.has(entity.id)) throw new Error(`Duplicate id: ${entity.id}`);
    ids.add(entity.id);
  }

  for (const relationship of artifact.relationships) {
    if (ids.has(relationship.id)) throw new Error(`Duplicate id: ${relationship.id}`);
    ids.add(relationship.id);
  }
  for (const dataFlow of artifact.dataFlows ?? []) {
    if (ids.has(dataFlow.id)) throw new Error(`Duplicate id: ${dataFlow.id}`);
    ids.add(dataFlow.id);
  }

  const ref = (id, owner) => {
    if (id && !ids.has(id)) throw new Error(`${owner} references missing id: ${id}`);
  };
  const refs = (values, owner) => (values ?? []).forEach((id) => ref(id, owner));
  const entityIds = Object.fromEntries(collectionNames.map((name) => [name, new Set(artifact[name].map((entity) => entity.id))]));
  const typedRef = (id, owner, collection) => {
    if (id && !entityIds[collection].has(id)) throw new Error(`${owner} must reference an id from ${collection}: ${id}`);
  };
  const typedRefs = (values, owner, collection) => (values ?? []).forEach((id) => typedRef(id, owner, collection));

  for (const domain of artifact.domains) {
    typedRefs(domain.storyIds, domain.id, 'stories');
    typedRefs(domain.evidenceIds, domain.id, 'sourceEvidence');
    for (const storyId of domain.storyIds) {
      const story = artifact.stories.find((item) => item.id === storyId);
      if (!story || story.domainId !== domain.id) throw new Error(`${domain.id} contains Story ${storyId} owned by another Domain`);
    }
  }
  for (const story of artifact.stories) {
    typedRef(story.domainId, story.id, 'domains');
    typedRefs(story.pathIds, story.id, 'storyPaths');
    typedRefs(story.evidenceIds, story.id, 'sourceEvidence');
    if (!artifact.domains.find((item) => item.id === story.domainId)?.storyIds.includes(story.id)) throw new Error(`${story.id} is not linked back from its Domain`);
    if (!story.pathIds?.length) throw new Error(`${story.id} must have at least one Story Path`);
    for (const pathId of story.pathIds) {
      const storyPath = artifact.storyPaths.find((item) => item.id === pathId);
      if (!storyPath || storyPath.storyId !== story.id) throw new Error(`${story.id} contains Story Path ${pathId} owned by another Story`);
    }
  }
  for (const storyPath of artifact.storyPaths) {
    typedRef(storyPath.storyId, storyPath.id, 'stories');
    typedRefs(storyPath.stepIds, storyPath.id, 'steps');
    typedRef(storyPath.startStepId, storyPath.id, 'steps');
    typedRef(storyPath.endStepId, storyPath.id, 'steps');
    if (!artifact.stories.find((item) => item.id === storyPath.storyId)?.pathIds.includes(storyPath.id)) throw new Error(`${storyPath.id} is not linked back from its Story`);
    if (!storyPath.stepIds?.length) throw new Error(`${storyPath.id} must have at least one Step`);
    if (storyPath.startStepId !== storyPath.stepIds[0]) throw new Error(`${storyPath.id} startStepId must be its first Step`);
    if (storyPath.endStepId !== storyPath.stepIds.at(-1)) throw new Error(`${storyPath.id} endStepId must be its last Step`);
    storyPath.stepIds.forEach((stepId, index) => {
      const step = artifact.steps.find((item) => item.id === stepId);
      if (!step || step.pathId !== storyPath.id) throw new Error(`${storyPath.id} contains Step ${stepId} owned by another Story Path`);
      if (step.order !== index + 1) throw new Error(`${storyPath.id} Step order must follow stepIds starting at 1`);
    });
  }
  for (const step of artifact.steps) {
    typedRef(step.pathId, step.id, 'storyPaths');
    typedRef(step.inputSchemaId, step.id, 'schemas');
    typedRef(step.outputSchemaId, step.id, 'schemas');
    typedRef(step.implementationId, step.id, 'implementations');
    typedRefs(step.evidenceIds, step.id, 'sourceEvidence');
    if (!artifact.storyPaths.find((item) => item.id === step.pathId)?.stepIds.includes(step.id)) throw new Error(`${step.id} is not linked back from its Story Path`);
    if (!['event', 'action', 'decision', 'outcome'].includes(step.kind)) throw new Error(`${step.id} has invalid kind: ${step.kind}`);
    if (!Number.isInteger(step.order) || step.order < 1) throw new Error(`${step.id} must have a positive integer order`);
    if (step.inputSchemaId && artifact.schemas.find((item) => item.id === step.inputSchemaId)?.direction !== 'input') throw new Error(`${step.id} inputSchemaId must reference an input Schema`);
    if (step.outputSchemaId && artifact.schemas.find((item) => item.id === step.outputSchemaId)?.direction !== 'output') throw new Error(`${step.id} outputSchemaId must reference an output Schema`);
    if (step.implementationId && artifact.implementations.find((item) => item.id === step.implementationId)?.stepId !== step.id) throw new Error(`${step.id} references an Implementation owned by another Step`);
  }
  for (const implementation of artifact.implementations) {
    typedRef(implementation.stepId, implementation.id, 'steps');
    typedRefs(implementation.callIds, implementation.id, 'calls');
    typedRefs(implementation.evidenceIds, implementation.id, 'sourceEvidence');
    if (artifact.steps.find((item) => item.id === implementation.stepId)?.implementationId !== implementation.id) throw new Error(`${implementation.id} is not linked back from its Step`);
    for (const callId of implementation.callIds) {
      if (artifact.calls.find((item) => item.id === callId)?.implementationId !== implementation.id) throw new Error(`${implementation.id} contains Call ${callId} owned by another Implementation`);
    }
  }
  for (const call of artifact.calls) {
    typedRef(call.implementationId, call.id, 'implementations');
    typedRefs(call.evidenceIds, call.id, 'sourceEvidence');
    if (!artifact.implementations.find((item) => item.id === call.implementationId)?.callIds.includes(call.id)) throw new Error(`${call.id} is not linked back from its Implementation`);
  }
  for (const schema of artifact.schemas) {
    for (const field of schema.fields) typedRef(field.schemaId, `${schema.id}.${field.name}`, 'schemas');
  }
  for (const evidence of artifact.sourceEvidence) {
    if (path.isAbsolute(evidence.path) || evidence.path.includes('\\') || evidence.path.split('/').includes('..')) throw new Error(`${evidence.id} has an unsafe source path`);
    if (!Number.isInteger(evidence.lineStart) || !Number.isInteger(evidence.lineEnd) || evidence.lineStart < 1 || evidence.lineEnd < evidence.lineStart) throw new Error(`${evidence.id} has an invalid line range`);
    if (verifyEvidence) {
      const sourcePath = path.resolve(root, evidence.path);
      if (!sourcePath.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) throw new Error(`${evidence.id} source file does not exist: ${evidence.path}`);
      const lineCount = fs.readFileSync(sourcePath, 'utf8').split(/\r?\n/).length;
      if (evidence.lineEnd > lineCount) throw new Error(`${evidence.id} line range exceeds ${evidence.path} (${lineCount} lines)`);
    }
  }
  for (const relationship of artifact.relationships) {
    ref(relationship.from, relationship.id);
    ref(relationship.to, relationship.id);
  }
  for (const dataFlow of artifact.dataFlows ?? []) {
    typedRefs(dataFlow.storyIds, dataFlow.id, 'stories');
    for (const stage of dataFlow.stages) {
      typedRef(stage.stepId, `${dataFlow.id} stage`, 'steps');
      typedRef(stage.schemaId, `${dataFlow.id} stage`, 'schemas');
    }
  }

  if (verifyFreshness) {
    if (!root) throw new Error('A repository root is required to verify artifact freshness');
    const current = sourceMetadata(root);
    if (artifact.metadata.sourceFingerprint !== current.sourceFingerprint) throw new Error('Visualization is stale: repository source has changed since it was generated');
  }

  return artifact;
}

export function status(root) {
  return {
    'understanding.json': fs.existsSync(dataPath(root, 'understanding.json')),
    'visualization.json': fs.existsSync(dataPath(root, 'visualization.json')),
  };
}
