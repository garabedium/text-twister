import React from 'react';
import '@testing-library/jest-dom';
import {
  screen, render, act,
} from '@testing-library/react';
import { playButtonText, timeDev } from '../../utils/constants.util';
import Timer from './Timer';
import { GameStatusContext } from '../../contexts/gameStatusContext';
import { GameStatusContextInterface } from '../../types/game.interface';
import { activeGameState, pausedGameState } from '../../utils/tests.util';

describe('Timer component', () => {
  const renderTimerComponent = (providerValues: GameStatusContextInterface) => render(
    <GameStatusContext.Provider value={providerValues}>
      <Timer
        restartGame={jest.fn()}
      />
    </GameStatusContext.Provider>,
  );

  it('should display the start time when the game is active', () => {
    renderTimerComponent(activeGameState);
    const time = screen.getByText(timeDev);
    expect(time).toBeInTheDocument();
  });

  it('should display a reset button when the game is reset', () => {
    renderTimerComponent(pausedGameState);
    const playButton = screen.getByLabelText(playButtonText);
    expect(playButton).toBeInTheDocument();
  });

  it('should count down from a specific number to zero', async () => {
    jest.useFakeTimers();
    renderTimerComponent(activeGameState);
    expect(screen.getByText(timeDev)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(timeDev * 1000));

    expect(await screen.findByText(timeDev - timeDev)).toBeInTheDocument();
  });
});
