import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ActiveGame, AnagramData, ResetGame } from '../../utils/test-utils';
import Anagrams from './Anagrams';

describe('Register Anagrams component', () => {
  it('should not show the anagram if the word is unsolved and the game is active', () => {
    render(<Anagrams game={ActiveGame} anagrams={AnagramData} />);

    for (let i = 0; i < AnagramData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${AnagramData[i].id}`).textContent;
      expect(text).not.toBe(AnagramData[i].anagram);
    }
  });

  it('should show the anagrams if the word is solved and the game is active', () => {
    const solvedAnagrams = AnagramData.map((anagram) => ({ ...anagram, solved: true }));
    render(<Anagrams game={ActiveGame} anagrams={solvedAnagrams} />);

    for (let i = 0; i < solvedAnagrams.length; i += 1) {
      const text = screen.getByTestId(`anagram-${solvedAnagrams[i].id}`).textContent;
      expect(text).toBe(solvedAnagrams[i].anagram);
    }
  });

  it('should show the anagrams if the game is reset', () => {
    render(<Anagrams game={ResetGame} anagrams={AnagramData} />);

    for (let i = 0; i < AnagramData.length; i += 1) {
      const text = screen.getByTestId(`anagram-${AnagramData[i].id}`).textContent;
      expect(text).toBe(AnagramData[i].anagram);
    }
  });
});
