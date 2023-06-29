import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { Anagram } from '../types/anagram.interface';
import { ApiResponse } from '../types/api.interface';

// TODO: handle error
const AnagramService = {
  getAllByLevelWord: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data)
    .catch(() => {}),
};

export default AnagramService;
