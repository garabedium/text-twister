import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { LevelWord } from '../types/level-word.interface';
import { ApiResponse } from '../types/types';

const LevelWordService = {
  getByZipfRange: (min: number, max: number, excludeWords: string) => client
  // Gets LevelWord by word frequency (zipf_value) min, max:
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}/${min}&${max}?${excludeWords}`)
    .then((response) => response.data),
};

export default LevelWordService;
