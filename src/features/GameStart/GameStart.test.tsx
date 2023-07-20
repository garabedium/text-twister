import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GameStatusContext } from '../../contexts/gameStatusContext';

import GameStart from './GameStart';
import { inactiveGameState } from '../../utils/tests.util';
import { playButtonText } from '../../utils/constants.util';

import { GameStatusContextInterface } from '../../types/game.interface';

describe('GameStart component', () => {
  const renderGameStart = (providerValues: GameStatusContextInterface) => render(
    <GameStatusContext.Provider value={providerValues}>
      <GameStart />
    </GameStatusContext.Provider>,
  );

  it('renders the StartPage component if the game is inactive', () => {
    renderGameStart(inactiveGameState);
    const playButton = screen.getByLabelText(playButtonText);
    expect(playButton).toBeInTheDocument();
  });
});
