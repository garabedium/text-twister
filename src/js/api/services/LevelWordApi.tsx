import client from '../client';
import { apiRoutes } from '../../utils/constants';

const LevelWordApi = {
  getByRange: (min: number, max: number, usedWords: string) => client.get(`${apiRoutes.levelWordRange}/${min}&${max}?${usedWords}`),
  getAnagrams: (word: string) => client.get(`${apiRoutes.anagrams}/${word}`),
};

export default LevelWordApi;
