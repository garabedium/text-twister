import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import config from './src/config';
import levelWordRouter from './src/server/models/level-words/level-word.router';
import anagramRouter from './src/server/models/anagrams/anagram.router';
/**
 * App Variables
 */
const app = express();

// App config

app.use(helmet());
app.use(cors());
// Parse requests as application/json:
app.use(express.json());

app.use('/api/level-words', levelWordRouter);
app.use('/api/anagrams', anagramRouter);

/**
 * Activate Server
 */

app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`);
});
