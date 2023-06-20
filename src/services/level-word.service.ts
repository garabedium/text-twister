import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { LevelWord } from '../types/level-word.interface';
import { ApiResponse } from '../types/api.interface';

const LevelWordService = {
  getByZipfRange: (query: string) => client
  // Gets LevelWord by word frequency (zipf_value) min, max:
    .get<ApiResponse<LevelWord>>(`${apiRoutes.levelWordRange}/${query}`)
    .then((response) => response.data),
};

export default LevelWordService;
