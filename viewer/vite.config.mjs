import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const viewerRoot = fileURLToPath(new URL('.', import.meta.url));
const exampleArtifact = resolve(viewerRoot, '../showcase/storysketch/visualization.json');

export default {
  plugins: [
    {
      name: 'storyline-example-artifact',
      configureServer(server) {
        server.middlewares.use('/api/artifact', (request, response, next) => {
          if (request.method !== 'GET') {
            next();
            return;
          }

          try {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(readFileSync(exampleArtifact, 'utf8'));
          } catch (error) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ message: `Could not read the example artifact: ${error.message}` }));
          }
        });
      },
    },
  ],
};
