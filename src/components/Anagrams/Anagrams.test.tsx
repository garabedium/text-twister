import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { gameStates } from '../../utils/constants.util';
import { levelWordsData, anagramsData } from '../../utils/test.util';
import { anagramsByLevelWord } from '../../utils/methods.util';
import { GameStatus } from '../../types/game.interface';
import Anagrams from './Anagrams';

describe('Register Anagrams component', () => {
  const levelWordText = levelWordsData[0].word;

  it('should not show the anagram if the word is unsolved and the game is active', () => {
    render(
      <Anagrams
        gameStatus={gameStates.active as GameStatus}
        anagrams={anagramsByLevelWord(anagramsData, levelWordText)}
        levelWordText={levelWordText}
      />,
    );

    for (let i = 0; i < anagramsData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${anagramsData[i].id}`).textContent;
      expect(text).not.toBe(anagramsData[i].anagram);
    }
  });

  it('should show the anagrams if the word is solved and the game is active', () => {
    const solvedAnagrams = anagramsData.map((anagram) => ({ ...anagram, solved: true }));
    render(
      <Anagrams
        gameStatus={gameStates.active as GameStatus}
        anagrams={anagramsByLevelWord(solvedAnagrams, levelWordText)}
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
        gameStatus={gameStates.paused as GameStatus}
        anagrams={anagramsByLevelWord(anagramsData, levelWordText)}
        levelWordText={levelWordText}
      />,
    );

    for (let i = 0; i < anagramsData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${anagramsData[i].id}`).textContent;
      expect(text).toBe(anagramsData[i].anagram);
    }
  });
});
