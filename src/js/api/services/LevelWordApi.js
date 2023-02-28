import client from '../client';
import { ApiRoutes } from '../../utils/constants';

const LevelWordApi = {
  getByRange: (min, max, usedWords) => client.get(`${ApiRoutes.levelWordRange}/${min}&${max}?${usedWords}`),
  getAnagrams: (word) => client.get(`${ApiRoutes.anagrams}/${word}`),
  // validate: (word) => client.get(`word/validate/${word}`),
  // validate: async (word) => client.get(`word/validate/${word}`),
};

export default LevelWordApi;
