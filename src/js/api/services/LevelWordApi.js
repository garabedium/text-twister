import client from '../client';
import { apiRoutes } from '../../utils/constants';

const LevelWordApi = {
  getByRange: (min, max, usedWords) => client.get(`${apiRoutes.levelWordRange}/${min}&${max}?${usedWords}`),
  getAnagrams: (word) => client.get(`${apiRoutes.anagrams}/${word}`),
};

export default LevelWordApi;
