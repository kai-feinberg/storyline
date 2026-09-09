#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(pluginRoot, '..', '..');
const viewerSource = path.join(repositoryRoot, 'prototypes', 'redesign-viewer');
const viewerDist = path.join(viewerSource, 'dist');
const pluginViewer = path.join(pluginRoot, 'assets', 'viewer');

if (!fs.existsSync(path.join(viewerSource, 'package.json'))) {
  throw new Error(`Viewer source not found: ${viewerSource}`);
}

const build = spawnSync('pnpm', ['build'], {
  cwd: viewerSource,
  encoding: 'utf8',
  stdio: 'inherit',
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
if (!fs.existsSync(path.join(viewerDist, 'index.html'))) {
  throw new Error(`Vite did not create ${path.join(viewerDist, 'index.html')}`);
}

fs.rmSync(pluginViewer, { recursive: true, force: true });
fs.cpSync(viewerDist, pluginViewer, { recursive: true });

console.log(`Published viewer to ${pluginViewer}`);
