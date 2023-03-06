import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GameStates, PlayText } from '../../utils/constants';
import { LevelWordsData, GameLettersData } from '../../utils/test-utils';
import GameLettersDisplay from './GameLettersDisplay';

describe('Register component', () => {
  it('should render the word', () => {
    const { container } = render(
      <GameLettersDisplay word={PlayText} />,
    );
    const letters = container.getElementsByClassName('letters')[0];
    expect(letters.textContent).toEqual(PlayText);
  });
  it('should render the game letters', () => {
    render(
      <GameLettersDisplay
        gameLetters={GameLettersData()}
        isGameActive={GameStates.active}
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
      <GameLettersDisplay
        word={PlayText}
        gameLetters={GameLettersData()}
        isGameActive={false}
      />,
    );
    const word = container.getElementsByClassName('letters')[0];
    expect(word.textContent).toEqual(PlayText);
    expect(screen.queryAllByRole('button').length).toEqual(0);
  });
});
