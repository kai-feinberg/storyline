#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dataPath, initProject, readJson, stampArtifact, status, validateArtifact } from './artifact.mjs';

const args = process.argv.slice(2);
const command = args.shift();
const commands = ['init', 'stamp', 'validate', 'view', 'open', 'open-artifact', 'status'];

if (!commands.includes(command)) {
  console.error(`Usage: storyline <${commands.join('|')}> [project-root|artifact-file] [--no-open] [--port number]`);
  console.error('Repository understanding and artifact generation are performed by the storyline-understand and storyline-generate agent skills.');
  process.exit(2);
}

function parseArguments(values) {
  const parsed = { project: null, json: false, noOpen: false, port: 0 };
  for (let index = 0; index < values.length; index += 1) {
    const argument = values[index];
    if (argument === '--json') parsed.json = true;
    else if (argument === '--no-open') parsed.noOpen = true;
    else if (argument === '--port') {
      const value = values[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--port requires a number');
      parsed.port = Number(value);
      index += 1;
      if (!Number.isInteger(parsed.port) || parsed.port < 1 || parsed.port > 65535) throw new Error('--port must be an integer from 1 to 65535');
    } else if (argument.startsWith('--')) throw new Error(`Unknown option: ${argument}`);
    else if (parsed.project) throw new Error(`Unexpected argument: ${argument}`);
    else parsed.project = argument;
  }
  if (!['view', 'open', 'open-artifact'].includes(command) && (parsed.noOpen || parsed.port)) throw new Error(`${command} does not accept viewer options`);
  if (command === 'open-artifact' && !parsed.project) throw new Error('open-artifact requires an artifact file');
  return parsed;
}

let options;
try {
  options = parseArguments(args);
} catch (error) {
  console.error(`Storyline: ${error.message}`);
  process.exit(2);
}
const root = path.resolve(options.project ?? process.cwd());

function loadArtifact() {
  const artifactPath = dataPath(root, 'visualization.json');
  if (!fs.existsSync(artifactPath)) throw new Error(`Missing ${artifactPath}. Run the storyline-generate skill first.`);
  return validateArtifact(readJson(artifactPath), { root, verifyEvidence: true, verifyFreshness: true });
}

function loadStandaloneArtifact(file) {
  const artifactPath = path.resolve(file);
  if (!fs.existsSync(artifactPath)) throw new Error(`Missing ${artifactPath}.`);
  return validateArtifact(readJson(artifactPath), { verifyEvidence: false, verifyFreshness: false });
}

function report(message, payload = {}) {
  if (options.json) console.log(JSON.stringify({ command, status: 'success', ...payload }));
  else console.log(message);
}

function startViewer(artifact) {
  const token = crypto.randomBytes(24).toString('hex');
  const requestedPort = options.port;
  const viewerRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'viewer');
  const viewerPath = path.join(viewerRoot, 'index.html');
  const contentTypes = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8' };
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (url.pathname === '/api/health') { response.setHeader('content-type', 'application/json'); response.end(JSON.stringify({ ok: true })); return; }
    if (url.pathname.startsWith('/assets/')) {
      const assetPath = path.resolve(viewerRoot, `.${url.pathname}`);
      if (!assetPath.startsWith(`${viewerRoot}${path.sep}`) || !fs.existsSync(assetPath)) { response.statusCode = 404; response.end('Not found'); return; }
      response.setHeader('content-type', contentTypes[path.extname(assetPath)] ?? 'application/octet-stream');
      fs.createReadStream(assetPath).pipe(response);
      return;
    }
    if (url.searchParams.get('token') !== token) { response.statusCode = 403; response.end('Forbidden'); return; }
    if (url.pathname === '/api/artifact') { response.setHeader('content-type', 'application/json'); response.end(JSON.stringify(artifact)); return; }
    if (url.pathname === '/') { response.setHeader('content-type', 'text/html; charset=utf-8'); fs.createReadStream(viewerPath).pipe(response); return; }
    response.statusCode = 404; response.end('Not found');
  });
  server.listen(requestedPort, '127.0.0.1', () => {
    const address = server.address();
    const url = `http://127.0.0.1:${address.port}/?token=${token}`;
    console.log(`Storyline viewer: ${url}`);
    if (!options.noOpen) {
      const opener = process.platform === 'darwin' ? ['open', [url]] : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : ['xdg-open', [url]];
      execFile(opener[0], opener[1], () => {});
    }
  });
}

if (command === 'init') {
  const output = initProject(root);
  report(`Initialized ${output}`, { output });
}
if (command === 'stamp') {
  const artifact = stampArtifact(root);
  validateArtifact(artifact, { root, verifyEvidence: true, verifyFreshness: true });
  report(`Stamped ${dataPath(root, 'visualization.json')}`, { metadata: artifact.metadata });
}
if (command === 'validate') { const artifact = loadArtifact(); report(`Valid Storyline artifact: ${artifact.stories.length} stories, ${artifact.steps.length} steps`, { counts: { domains: artifact.domains.length, stories: artifact.stories.length, steps: artifact.steps.length } }); }
if (command === 'status') report(JSON.stringify(status(root), null, 2), { files: status(root) });
if (command === 'view' || command === 'open') startViewer(loadArtifact());
if (command === 'open-artifact') startViewer(loadStandaloneArtifact(options.project));
