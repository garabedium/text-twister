import React from 'react';
import '@testing-library/jest-dom';
import {
  screen, render, act,
} from '@testing-library/react';
import { GameStates, PlayButtonText, TimeDev } from '../../utils/constants';
import Timer from './Timer';

describe('Timer component', () => {
  it('should display the start time when the game is active', () => {
    render(
      <Timer
        gameStatus={GameStates.active}
        updateGameStatus={() => null}
        restartGame={() => null}
      />,
    );
    const time = screen.getByText(TimeDev);
    expect(time).toBeInTheDocument();
  });

  it('should display a reset button when the game is reset', () => {
    render(
      <Timer
        gameStatus={GameStates.paused}
        updateGameStatus={() => null}
        restartGame={() => null}
      />,
    );
    const playButton = screen.getByLabelText(PlayButtonText);
    expect(playButton).toBeInTheDocument();
  });

  it('should count down from a specific number to zero', async () => {
    jest.useFakeTimers();
    render(<Timer gameStatus={GameStates.active} />);

    expect(screen.getByText(TimeDev)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(TimeDev * 1000));

    expect(await screen.findByText(TimeDev - TimeDev)).toBeInTheDocument();
  });
});
