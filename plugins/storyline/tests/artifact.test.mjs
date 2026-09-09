import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { sourceMetadata, stampArtifact, validateArtifact } from '../scripts/artifact.mjs';

const validArtifact = () => ({
  schemaVersion: '1.0.0', artifactType: 'storyline.visualization', project: { name: 'test' },
  metadata: { visualizationUpdatedAt: '2026-08-16T12:00:00.000Z', sourceFingerprint: 'sha256:0000000000000000000000000000000000000000000000000000000000000000', gitCommit: null, gitDirty: null },
  domains: [{ id: 'domain:test', name: 'Test', storyIds: ['story:test'], evidenceIds: [] }],
  stories: [{ id: 'story:test', domainId: 'domain:test', title: 'Test behavior', pathIds: ['path:test'], evidenceIds: [] }],
  storyPaths: [{ id: 'path:test', storyId: 'story:test', title: 'Default path', stepIds: ['step:test'], startStepId: 'step:test', endStepId: 'step:test' }],
  steps: [{ id: 'step:test', pathId: 'path:test', order: 1, kind: 'outcome', title: 'Completed', evidenceIds: ['evidence:test'] }],
  implementations: [], calls: [], schemas: [],
  sourceEvidence: [{ id: 'evidence:test', path: 'src/test.ts', lineStart: 1, lineEnd: 2 }],
  relationships: [], diagnostics: [],
});

test('accepts a complete agent-generated artifact', () => {
  const artifact = validArtifact();
  assert.equal(validateArtifact(artifact), artifact);
});

test('rejects dangling agent references', () => {
  const artifact = validArtifact();
  artifact.steps[0].evidenceIds = ['evidence:missing'];
  assert.throws(() => validateArtifact(artifact), /must reference an id from sourceEvidence/);
});

test('rejects unsafe evidence paths', () => {
  const artifact = validArtifact();
  artifact.sourceEvidence[0].path = '../secret';
  assert.throws(() => validateArtifact(artifact), /unsafe source path/);
});

test('rejects artifacts that do not satisfy the published schema', () => {
  const artifact = validArtifact();
  delete artifact.steps[0].title;
  assert.throws(() => validateArtifact(artifact), /schema validation failed.*title/);
});

test('rejects invalid visualization update metadata', () => {
  const artifact = validArtifact();
  artifact.metadata.visualizationUpdatedAt = 'yesterday';
  assert.throws(() => validateArtifact(artifact), /date-time/);
});

test('rejects a Step owned by another Story Path', () => {
  const artifact = validArtifact();
  artifact.storyPaths.push({ id: 'path:other', storyId: 'story:test', title: 'Other', stepIds: ['step:test'], startStepId: 'step:test', endStepId: 'step:test' });
  artifact.stories[0].pathIds.push('path:other');
  assert.throws(() => validateArtifact(artifact), /owned by another Story Path/);
});

test('rejects duplicate relationship IDs', () => {
  const artifact = validArtifact();
  artifact.relationships = [
    { id: 'relationship:test', from: 'story:test', to: 'step:test', kind: 'contains' },
    { id: 'relationship:test', from: 'story:test', to: 'step:test', kind: 'contains' },
  ];
  assert.throws(() => validateArtifact(artifact), /Duplicate id/);
});

test('rejects references to the wrong entity type', () => {
  const artifact = validArtifact();
  artifact.steps[0].evidenceIds = ['story:test'];
  assert.throws(() => validateArtifact(artifact), /must reference an id from sourceEvidence/);
});

test('verifies source evidence against repository files when requested', () => {
  const artifact = validArtifact();
  assert.throws(() => validateArtifact(artifact, { root: process.cwd(), verifyEvidence: true }), /source file does not exist/);
});

test('stamps source provenance and detects later source changes', (context) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'storyline-freshness-'));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, '.storyline'));
  fs.mkdirSync(path.join(root, 'src'));
  fs.writeFileSync(path.join(root, 'src', 'test.ts'), 'first line\nsecond line\n');
  fs.writeFileSync(path.join(root, '.storyline', 'visualization.json'), JSON.stringify(validArtifact()));

  const artifact = stampArtifact(root);
  assert.match(artifact.metadata.sourceFingerprint, /^sha256:[a-f0-9]{64}$/);
  assert.equal(artifact.metadata.sourceFingerprint, sourceMetadata(root).sourceFingerprint);
  validateArtifact(artifact, { root, verifyEvidence: true, verifyFreshness: true });

  fs.appendFileSync(path.join(root, 'src', 'test.ts'), 'changed\n');
  assert.throws(() => validateArtifact(artifact, { root, verifyFreshness: true }), /Visualization is stale/);
});
