import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { playText } from '../../utils/constants.util';
import {
  levelWordsData, gameLettersData, inactiveGameState, activeGameState,
} from '../../utils/tests.util';
import GameLetters from './GameLetters';
import { Letter } from '../../types/letter.interface';
import { GameStatusContext } from '../../providers/gameStatusContext';
import { GameLettersProps, GameStatusContextInterface } from '../../types/game.interface';

describe('Register component', () => {
  const gameLetters = gameLettersData() as Letter[];

  const renderGameLetters = (
    gameLettersProps: GameLettersProps,
    providerValues: GameStatusContextInterface,
  ) => render(
    <GameStatusContext.Provider value={providerValues}>
      <GameLetters {...gameLettersProps} />
    </GameStatusContext.Provider>,
  );

  it('should render the word', () => {
    const { container } = renderGameLetters({ word: playText }, inactiveGameState);
    const letters = container.getElementsByClassName('letters')[0];
    expect(letters.textContent).toEqual(playText);
  });

  it('should render the game letters', () => {
    const letterProps = {
      gameLetters,
      updateGameLetters: jest.fn(),
    };
    renderGameLetters(letterProps, activeGameState);

    const { word } = levelWordsData[0];
    for (let i = 0; i < gameLettersData().length; i += 1) {
      const letter = screen.getByTestId(`game-letter-${i + 1}`);
      expect(letter.textContent).toBe(word[i]);
      expect(letter).toBeEnabled();
    }
  });

  it('should render the solved word if game is not active', () => {
    const letterProps = {
      word: playText,
      gameLetters,
    };

    const { container } = renderGameLetters(letterProps, inactiveGameState);

    const word = container.getElementsByClassName('letters')[0];
    expect(word.textContent).toEqual(playText);
    expect(screen.queryAllByRole('button').length).toEqual(0);
  });
});
