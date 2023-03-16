import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { playText } from '../../utils/constants';
import { LevelWordsData, GameLettersData } from '../../utils/test-utils';
import GameLetters from './GameLetters';
import { Letter } from '../../utils/types';

describe('Register component', () => {
  const gameLetters = GameLettersData() as Letter[];

  it('should render the word', () => {
    const { container } = render(
      <GameLetters
        word={playText}
        isGameActive={false}
      />,
    );
    const letters = container.getElementsByClassName('letters')[0];
    expect(letters.textContent).toEqual(playText);
  });
  it('should render the game letters', () => {
    render(
      <GameLetters
        gameLetters={gameLetters}
        isGameActive
        updateGameLetters={() => null}
      />,
    );
    const { word } = LevelWordsData[0];
    for (let i = 0; i < GameLettersData().length; i += 1) {
      const letter = screen.getByTestId(`game-letter-${i + 1}`);
      expect(letter.textContent).toBe(word[i]);
      expect(letter).toBeEnabled();
    }
  });
  it('should render the solved word if game is not active', () => {
    const { container } = render(
      <GameLetters
        word={playText}
        gameLetters={gameLetters}
        isGameActive={false}
      />,
    );
    const word = container.getElementsByClassName('letters')[0];
    expect(word.textContent).toEqual(playText);
    expect(screen.queryAllByRole('button').length).toEqual(0);
  });
});
