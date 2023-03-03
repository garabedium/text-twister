import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
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
});
