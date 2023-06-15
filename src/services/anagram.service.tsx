import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { Anagram, ApiResponse } from '../utils/types.util';

// TODO: log error to DB
const AnagramService = {
  getAllByLevelWord: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data)
    .catch((err) => console.log(err.toJSON())),
};

export default AnagramService;
