import assert from 'node:assert/strict';
import test from 'node:test';
import { deriveSchemaChanges } from '../../../viewer/src/viewer-data.js';

test('derives conservative structural schema changes', () => {
  const input = {
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'draft', type: 'string', required: false },
      { name: 'legacyId', type: 'string', required: false },
    ],
  };
  const output = {
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'draft', type: 'string', required: true },
      { name: 'sceneCount', type: 'number', required: true },
    ],
  };

  assert.deepEqual(deriveSchemaChanges(input, output).map(({ kind, from, to }) => ({ kind, from, to })), [
    { kind: 'preserved', from: 'title', to: 'title' },
    { kind: 'changed', from: 'draft', to: 'draft' },
    { kind: 'added', from: null, to: 'sceneCount' },
    { kind: 'removed', from: 'legacyId', to: null },
  ]);
  assert.match(deriveSchemaChanges(input, output).at(-1).description, /not present/);
});

test('returns no changes when both schemas are missing', () => {
  assert.deepEqual(deriveSchemaChanges(null, null), []);
});
