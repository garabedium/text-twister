import {
  ShuffleLetters, ScoreWordLengthKey,
} from '../types/misc.types';
import { Anagram } from '../types/anagram.interface';
import { LevelWord } from '../types/level-word.interface';
import { scoreMultiples, zipfDefaultMin, zipfDefaultMax } from './constants.util';

// Take in a word and shuffle the letters via Fisher-Yates algorithm
export function shuffleLetters(letters: string, solvedWord?: string): ShuffleLetters | string[] {
  const lettersArr = letters.split('');
  let shuffled = '';

  for (let i = lettersArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = lettersArr[i];
    lettersArr[i] = lettersArr[j];
    lettersArr[j] = temp;
  }

  shuffled = lettersArr.join('');

  // Don't show the solved word or the same shuffled sequence:
  if (shuffled.length > 1 && (shuffled === solvedWord || shuffled === letters)) {
    return shuffleLetters(letters);
  }

  return shuffled.split('');
}

export function calcWordScore(wordLength: number, score: number) {
  return score + (wordLength * scoreMultiples[wordLength as ScoreWordLengthKey]);
}

export function anagramsByLevelWord(anagrams: Anagram[], levelWord: string) {
  const levelWordAnagrams = { [levelWord]: {} };

  anagrams.forEach((anagram: Anagram) => {
    levelWordAnagrams[levelWord] = { ...levelWordAnagrams[levelWord], [anagram.anagram]: anagram };
  });

  return levelWordAnagrams;
}

export function buildLevelWordZipfQuery(
  usedWords: LevelWord[] | [],
  zipfMin: number = zipfDefaultMin,
  zipfMax: number = zipfDefaultMax,
) {
  let query = `?zipf=[${zipfMin}]&zipf=[${zipfMax}]`;
  const excludedWords = usedWords.map((word: LevelWord) => `&exclude=${word.word}`).join('');
  query += excludedWords;

  return query;
}
