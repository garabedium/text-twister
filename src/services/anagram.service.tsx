import { AxiosError } from 'axios';
import client from './services.client';
import { apiRoutes } from '../utils/constants.util';
import { ApiResponse } from '../types/api.interface';
import { Anagram } from '../types/anagram.interface';
// TODO: log error to DB
const AnagramService = {
  getAllByLevelWord: (word: string) => client
    .get<ApiResponse<Anagram[]>>(`${apiRoutes.anagrams}/${word}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => console.log(err.toJSON())),
};

export default AnagramService;
