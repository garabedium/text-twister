import React from 'react';
import '@testing-library/jest-dom';
import {
  screen, render, act,
} from '@testing-library/react';
import { gameStates, playButtonText, timeDev } from '../../utils/constants.util';
import Timer from './Timer';

describe('Timer component', () => {
  it('should display the start time when the game is active', () => {
    render(
      <Timer
        gameStatus={gameStates.active}
        updateGameStatus={() => null}
        restartGame={() => null}
      />,
    );
    const time = screen.getByText(timeDev);
    expect(time).toBeInTheDocument();
  });

  it('should display a reset button when the game is reset', () => {
    render(
      <Timer
        gameStatus={gameStates.paused}
        updateGameStatus={() => null}
        restartGame={() => null}
      />,
    );
    const playButton = screen.getByLabelText(playButtonText);
    expect(playButton).toBeInTheDocument();
  });

  it('should count down from a specific number to zero', async () => {
    jest.useFakeTimers();
    render(
      <Timer
        gameStatus={gameStates.active}
        updateGameStatus={() => null}
        restartGame={() => null}
      />,
    );

    expect(screen.getByText(timeDev)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(timeDev * 1000));

    expect(await screen.findByText(timeDev - timeDev)).toBeInTheDocument();
  });
});
