import { AxiosError } from 'axios';
import client from './services.client';
import { apiRoutes } from '../utils/constants';
import { Anagram, ApiResponse } from '../utils/types';

// TODO: log error to DB
const AnagramService = {
  getAllByLevelWord: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => console.log(error.toJSON())),
};

export default AnagramService;
