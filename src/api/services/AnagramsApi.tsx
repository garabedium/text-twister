import client from '../client';
import { apiRoutes } from '../../utils/constants';
import { Anagram, ApiResponse } from '../../utils/types';

// TODO: log error to DB
const AnagramsApi = {
  getAnagrams: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data)
    .catch((err) => console.log(err.toJSON())),
};

export default AnagramsApi;
