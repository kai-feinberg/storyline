import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';

const cli = path.resolve('plugins/storyline/scripts/storyline.mjs');
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd: path.resolve('.'), encoding: 'utf8' });

test('does not treat an option value as the repository root', () => {
  const result = run('status', '--port', '4444');
  assert.equal(result.status, 2);
  assert.match(result.stderr, /status does not accept viewer options/);
});

test('rejects missing, invalid, and unknown options', () => {
  assert.match(run('open', '--port').stderr, /--port requires a number/);
  assert.match(run('open', '--port', '70000').stderr, /--port must be an integer/);
  assert.match(run('status', '--bogus').stderr, /Unknown option/);
});

test('rejects more than one repository argument', () => {
  const result = run('status', '.', 'another-root');
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Unexpected argument/);
});
