import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { LevelWord, ApiResponse } from '../utils/types.util';

const LevelWordService = {
  // Gets LevelWord by its frequency (zipf_value):
  getByZipfRange: (query: string) => client
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}${query}`)
    .then((response) => response.data),
};

export default LevelWordService;
