import db from '../../../config/database';
import { LevelWord } from './level-word.interface';

// eslint-disable-next-line import/prefer-default-export
export const find = async (id: number) => new Promise((resolve, reject) => {
  const query = 'SELECT word, zipf_value, id FROM level_words WHERE id = ?';
  db.query(query, id, (error, result) => {
    if (error) { reject(error); }
    resolve(result as LevelWord[]);
  });
});
