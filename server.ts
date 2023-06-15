import cors from 'cors';
import helmet from 'helmet';

import express, { Request, Response } from 'express';
import path from 'path';
import config from './src/config';
import levelWordRouter from './src/server/models/level-words/level-word.router';
import anagramRouter from './src/server/models/anagrams/anagram.router';

/**
 * App Variables
 */

const app = express();
const distDirPath = new URL('dist/', import.meta.url).pathname;
const appIndex = path.join(distDirPath, 'index.html');

/**
 * App Config
 */

app.use(cors());
app.use(helmet());

// Parse requests as application/json:
app.use(express.json());
// Serve static files directory:
app.use(express.static(distDirPath));

/**
 * App Routes
 */

app.get('/', (_request: Request, response: Response) => {
  // sendFile transfers the file for a given path:
  response.sendFile(appIndex);
});

app.use('/api/level-words', levelWordRouter);
app.use('/api/anagrams', anagramRouter);

/**
 * Activate Server
 */

app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`);
});
