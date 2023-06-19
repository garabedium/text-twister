// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import { apiRoutes } from './constants.util';
import { Anagram } from '../types/anagram.interface';
import { LevelWord } from '../types/types';

export const levelWordsData = [
  {
    id: 1, word: 'really', zipf_value: 5.9, status: 'current',
  },
  {
    id: 2, word: 'broken', zipf_value: 5.8, status: 'next',
  },
];

export const anagramsData = [
  {
    anagram: 'really', id: 3, level_word: levelWordsData[0].word, solved: false,
  },
  {
    anagram: 'real', id: 4, level_word: levelWordsData[0].word, solved: false,
  },
  {
    anagram: 'are', id: 5, level_word: levelWordsData[0].word, solved: false,
  },
  {
    anagram: 'lay', id: 6, level_word: levelWordsData[0].word, solved: false,
  },
  {
    anagram: 'broken', id: 7, level_word: levelWordsData[1].word, solved: false,
  },
  {
    anagram: 'broke', id: 8, level_word: levelWordsData[1].word, solved: false,
  },
];

export const gameLettersData = () => {
  const { word } = levelWordsData[0];
  const letters = word.split('').map((letter, i) => ({ id: i + 1, char: letter, used: false }));
  return letters;
};

export const nockGetRequest = (url: string, response: LevelWord | Anagram[]) => {
  nock(apiRoutes.baseUrl)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get(url)
    .reply(200, response);
};
