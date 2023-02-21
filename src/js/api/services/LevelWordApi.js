import client from '../client';
import { ApiRoutes } from '../../utils/constants';

const LevelWordApi = {
  getByRange: () => client.get(ApiRoutes.levelWordRange),
  getAnagrams: (word) => client.get(`${ApiRoutes.anagrams}/${word}`),
  // validate: (word) => client.get(`word/validate/${word}`),
  // validate: async (word) => client.get(`word/validate/${word}`),
};

export default LevelWordApi;
