import { useReducer, useEffect, useCallback } from 'react';
import AnagramService from '../services/anagram.service';
import {
  Anagram, AnagramsReducerAction, AnagramsHashMap,
} from '../types/anagram.interface';
import { anagramsByLevelWord, exhaustiveCheckError } from '../utils/methods.util';

function anagramsReducer(
  state: AnagramsHashMap,
  action: AnagramsReducerAction,
): AnagramsHashMap | never {
  switch (action.type) {
    case 'added': {
      const { payload } = action;
      return { ...state, ...payload };
    }
    case 'solved_updated': {
      const { payload } = action;
      return { ...state, ...payload };
    }
    default: {
      return exhaustiveCheckError(action);
    }
  }
}

function useAnagrams(levelWordText: string) {
  const [anagrams, dispatch] = useReducer(anagramsReducer, {});
  const hasAnagrams = Object.keys(anagrams).length && anagrams[levelWordText];

  const getAnagrams = useCallback(async () => {
    const result: Anagram[] | void = await AnagramService.getAllByLevelWord(levelWordText);
    if (result?.length) {
      const anagramsHash: AnagramsHashMap = anagramsByLevelWord(result, levelWordText);
      dispatch({ type: 'added', payload: anagramsHash });
    }
  }, [levelWordText]);

  const isValidAnagram = (word: string) => anagrams[levelWordText][word] !== undefined;

  const updateSolvedWord = (word: string) => {
    const payload = {
      [levelWordText]: {
        ...anagrams[levelWordText],
        [word]: { ...anagrams[levelWordText][word], solved: true },
      },
    };
    dispatch({ type: 'solved_updated', payload });
  };

  useEffect(() => {
    getAnagrams().catch(() => {});
  }, [levelWordText, getAnagrams]);

  return {
    anagrams, hasAnagrams, isValidAnagram, updateSolvedWord,
  };
}

export default useAnagrams;
