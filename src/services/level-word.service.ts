import client from './services.client';
import { apiRoutes } from '../utils/constants';
import { LevelWord, ApiResponse } from '../utils/types';

const LevelWordService = {
  getByZipfRange: (min: number, max: number, excludeWords: string) => client
  // Gets LevelWord by word frequency (zipf_value) min, max:
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}/${min}&${max}?${excludeWords}`)
    .then((response) => response.data),
};

export default LevelWordService;
