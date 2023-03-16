// eslint-disable-next-line import/no-extraneous-dependencies
import nock from 'nock';
import { apiRoutes } from './constants';

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

export const LevelWordsData = [
  {
    id: 1, word: 'really', zipf_value: 5.9, status: 'current',
  },
  {
    id: 2, word: 'broken', zipf_value: 5.8, status: 'next',
  },
];

export const AnagramsData = [
  { anagram: 'really', id: 3, level_word: LevelWordsData[0].word },
  { anagram: 'real', id: 4, level_word: LevelWordsData[0].word },
  { anagram: 'are', id: 5, level_word: LevelWordsData[0].word },
  { anagram: 'lay', id: 6, level_word: LevelWordsData[0].word },
  { anagram: 'broken', id: 7, level_word: LevelWordsData[1].word },
  { anagram: 'broke', id: 8, level_word: LevelWordsData[1].word },
];

export const AnagramsByLevelWord = (anagrams) => {
  const { word } = LevelWordsData[0];
  const result = { [word]: {} };
  anagrams.forEach((anagram) => {
    result[word] = { ...result[word], [anagram.anagram]: anagram };
  });
  return result;
};

export const GameLettersData = () => {
  const { word } = LevelWordsData[0];
  const letters = word.split('').map((letter, i) => ({ id: i + 1, char: letter, used: false }));
  return letters;
};

export const nockGetRequest = (url, response) => {
  nock(apiRoutes.baseUrl)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get(url)
    .reply(200, response);
};
