import assert from 'node:assert/strict';
import { once } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';
import { sourceMetadata } from '../scripts/artifact.mjs';

test('serves the redesigned viewer and protected artifact', async (context) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'storyline-viewer-'));
  fs.mkdirSync(path.join(root, '.storyline'));
  fs.mkdirSync(path.join(root, 'src'));
  fs.writeFileSync(path.join(root, 'src', 'test.ts'), 'first line\nsecond line\n');
  fs.writeFileSync(path.join(root, '.storyline', 'visualization.json'), JSON.stringify({
    schemaVersion: '1.0.0', artifactType: 'storyline.visualization', metadata: sourceMetadata(root), project: { name: 'Viewer test' },
    domains: [{ id: 'domain:test', name: 'Test', storyIds: ['story:test'], evidenceIds: [] }],
    stories: [{ id: 'story:test', domainId: 'domain:test', title: 'Test behavior', pathIds: ['path:test'], evidenceIds: [] }],
    storyPaths: [{ id: 'path:test', storyId: 'story:test', title: 'Default path', stepIds: ['step:test'], startStepId: 'step:test', endStepId: 'step:test' }],
    steps: [{ id: 'step:test', pathId: 'path:test', order: 1, kind: 'outcome', title: 'Completed', evidenceIds: ['evidence:test'] }],
    implementations: [], calls: [], schemas: [],
    sourceEvidence: [{ id: 'evidence:test', path: 'src/test.ts', lineStart: 1, lineEnd: 2 }],
    relationships: [], diagnostics: [],
  }));

  const cli = path.resolve('plugins/storyline/scripts/storyline.mjs');
  const child = spawn(process.execPath, [cli, 'open', root, '--no-open'], { cwd: path.resolve('.') });
  context.after(() => { child.kill(); fs.rmSync(root, { recursive: true, force: true }); });
  let output = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => { output += chunk; });
  await Promise.race([
    once(child.stdout, 'data'),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Viewer did not start')), 3000)),
  ]);
  const url = output.match(/Storyline viewer: (\S+)/)?.[1];
  assert.ok(url);

  const html = await (await fetch(url)).text();
  assert.match(html, /<div id="root"><\/div>/);
  const assetUrls = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
  assert.equal(assetUrls.length, 2);
  for (const assetUrl of assetUrls) {
    const response = await fetch(new URL(assetUrl, url));
    assert.equal(response.status, 200);
  }
  const artifactResponse = await fetch(new URL(`/api/artifact${new URL(url).search}`, url));
  assert.equal(artifactResponse.status, 200);
  assert.equal((await artifactResponse.json()).project.name, 'Viewer test');
});
