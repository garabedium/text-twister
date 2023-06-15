import express, { Request, Response } from 'express';
import { TypedRequestQuery } from '../../../types/express/express.interface';
import { BaseLevelWord, LevelWordRequestZipfRange } from '../../../types/level-word.interface';
import { zipfDefaultMin, zipfDefaultMax } from '../../../utils/constants';
import * as LevelWordModel from './level-word.model';

const levelWordRouter = express.Router();

// TODO: express-async
// eslint-disable-next-line @typescript-eslint/no-misused-promises
levelWordRouter.get('/zipf-range', async (
  req: TypedRequestQuery<LevelWordRequestZipfRange>,
  res: Response,
) => {
  const {
    query: {
      zipf: { gte, lte },
      exclude,
    },
  } = req;
  // TODO: validations (gte < lte, within default range)
  let zipfGte:number = zipfDefaultMin;
  if (parseFloat(gte)) {
    zipfGte = parseFloat(gte);
  }

  let zipfLte:number = zipfDefaultMax;
  if (parseFloat(lte)) {
    zipfLte = parseFloat(lte);
  }

  const excludeWords = exclude || '';

  try {
    const levelWord = await LevelWordModel
      .findByZipfRange(zipfGte, zipfLte, excludeWords) as BaseLevelWord;

    res.status(200).send(levelWord);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
levelWordRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const levelWord = await LevelWordModel.find(id) as BaseLevelWord[];
    res.status(200).send(levelWord);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send('error.message');
    }
  }
});

export default levelWordRouter;
