import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { gameStates } from '../../utils/constants';
import {
  AnagramsByLevelWord, LevelWordsData, AnagramsData,
} from '../../utils/test-utils';
import Anagrams from './Anagrams';

describe('Register Anagrams component', () => {
  const levelWordText = LevelWordsData[0].word;

  it('should not show the anagram if the word is unsolved and the game is active', () => {
    render(
      <Anagrams
        gameStatus={gameStates.active}
        anagrams={AnagramsByLevelWord(AnagramsData)}
        levelWordText={levelWordText}
      />,
    );

    for (let i = 0; i < AnagramsData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${AnagramsData[i].id}`).textContent;
      expect(text).not.toBe(AnagramsData[i].anagram);
    }
  });

  it('should show the anagrams if the word is solved and the game is active', () => {
    const solvedAnagrams = AnagramsData.map((anagram) => ({ ...anagram, solved: true }));
    render(
      <Anagrams
        gameStatus={gameStates.active}
        anagrams={AnagramsByLevelWord(solvedAnagrams)}
        levelWordText={levelWordText}
      />,
    );

    for (let i = 0; i < solvedAnagrams.length; i += 1) {
      const text = screen.getByTestId(`anagram-${solvedAnagrams[i].id}`).textContent;
      expect(text).toBe(solvedAnagrams[i].anagram);
    }
  });

  it('should show the anagrams if the game is paused', () => {
    render(
      <Anagrams
        gameStatus={gameStates.paused}
        anagrams={AnagramsByLevelWord(AnagramsData)}
        levelWordText={levelWordText}
      />,
    );

    for (let i = 0; i < AnagramsData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${AnagramsData[i].id}`).textContent;
      expect(text).toBe(AnagramsData[i].anagram);
    }
  });
});
