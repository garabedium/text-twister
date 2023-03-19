import client from '../client';
import { apiRoutes } from '../../utils/constants';
import { LevelWord } from '../../utils/types';

type ApiResponse<Arg> = Promise<Arg>;
const LevelWordApi = {
  getByRange: (min: number, max: number, usedWords: string) => client
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}/${min}&${max}?${usedWords}`)
    .then((response) => response.data),
  getAnagrams: (word: string) => client.get(`${apiRoutes.anagrams}/${word}`),
};

export default LevelWordApi;
