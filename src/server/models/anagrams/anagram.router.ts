import express, { Request, Response } from 'express';
import { BaseAnagram } from '../../../types/anagram.interface';
import anagramsByWord from './anagram.model';

const anagramRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
anagramRouter.get('/:word', async (req: Request, res: Response) => {
  const { word } = req.params;
  try {
    const anagrams = await anagramsByWord(word) as BaseAnagram[];
    res.status(200).send(anagrams);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

export default anagramRouter;
