import db from '../../../config/database';
import { BaseLevelWord } from '../../../types/level-word.interface';

// eslint-disable-next-line import/prefer-default-export
export const find = async (id: number) => new Promise((resolve, reject) => {
  const query = 'SELECT word, zipf_value, id FROM level_words WHERE id = ?';
  db.query(query, id, (error, result) => {
    if (error) { reject(error); }
    resolve(result as BaseLevelWord[]);
  });
});

export const findByZipfRange = async (gte: number, lte: number, exclude: string) => new Promise(
  (resolve, reject) => {
    const query = `
            SELECT id, word, zipf_value 
            FROM level_words
            WHERE zipf_value BETWEEN ? and ?
            AND word not in (?)
            ORDER BY RAND()
            LIMIT 1`;

    db.query(query, [gte, lte, exclude], (error, result) => {
      if (error) { reject(error); }
      resolve(result as BaseLevelWord[]);
    });
  },
);
