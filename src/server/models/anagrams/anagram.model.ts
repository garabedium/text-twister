import db from '../../../config/database';
import { BaseAnagram } from '../../../types/anagram.interface';

// eslint-disable-next-line import/prefer-default-export
export const findAllByLevelWord = async (word: string) => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM levelword_anagrams WHERE level_word = ? ORDER BY char_length(anagram) DESC';
  db.query(query, word, (error, result) => {
    if (error) { reject(error); }
    resolve(result as BaseAnagram[]);
  });
});
