import express, { Request, Response } from 'express';
import { BaseLevelWord } from '../../../types/level-word.interface';
import * as LevelWordModel from './level-word.model';

const levelWordRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
levelWordRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const levelWord = await LevelWordModel.find(id) as BaseLevelWord[];
    res.status(200).send(levelWord);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

export default levelWordRouter;
