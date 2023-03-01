import client from '../client';
import { ApiRoutes } from '../../utils/constants';

const LevelWordApi = {
  getByRange: (min, max, usedWords) => client.get(`${ApiRoutes.levelWordRange}/${min}&${max}?${usedWords}`),
  getAnagrams: (word) => client.get(`${ApiRoutes.anagrams}/${word}`),
};

export default LevelWordApi;
