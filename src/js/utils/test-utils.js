import nock from 'nock';
import { ApiRoutes } from './constants';

export const ActiveGame = {
  active: true,
  reset: false,
  started: true,
};

export const ResetGame = {
  active: false,
  reset: true,
  started: true,
};

export const AnagramData = [
  { id: 1, anagram: 'test', solved: false },
  { id: 2, anagram: 'lorem', solved: false },
  { id: 3, anagram: 'ipsum', solved: false },
];

export const LevelWordsData = [
  { id: 1, word: 'texter' },
];

export const nockGetRequest = (url, response) => {
  nock(ApiRoutes.baseUrl)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get(url)
    .reply(200, response);
};
