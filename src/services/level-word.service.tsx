import client from './services.client';
import { apiRoutes } from '../utils/constants';
import { LevelWord, ApiResponse } from '../utils/types';

const LevelWordService = {
  // Gets LevelWord by its frequency (zipf_value):
  getByZipfRange: (gte: number, lte: number, excludeWords: string) => client
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}?zipf=[${gte}]&zipf=[${lte}]?${excludeWords}`)
    .then((response) => response.data),
};

export default LevelWordService;
