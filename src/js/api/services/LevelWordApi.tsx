import client from '../client';
import { apiRoutes } from '../../utils/constants';
import { LevelWord, Anagram } from '../../utils/types';

type ApiResponse<T> = Promise<T>;
const LevelWordApi = {
  getByRange: (min: number, max: number, excludeWords: string) => client
  // Gets LevelWord by word frequency (zipf_value) min, max:
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}/${min}&${max}?${excludeWords}`)
    .then((response) => response.data),

  // Gets Anagrams by LevelWord
  getAnagrams: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data),
};

export default LevelWordApi;
