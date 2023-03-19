import React, { useState, useEffect } from 'react';
import {
  timeDev, timeProd, isDevEnv, isTestEnv, icons,
  gameStates, playButtonText,
} from '../../utils/constants';
import './Timer.scss';
import { TimerProps, GameStatus, TimerInterval } from '../../utils/types';
import Button from '../Button/Button';

function Timer(props: TimerProps) {
  const { gameStatus, updateGameStatus, restartGame } = props;

  const startTime = (isDevEnv || isTestEnv) ? timeDev : timeProd;
  const [seconds, setSeconds] = useState(startTime);

  const isGameActive = (gameStatus === gameStates.active);
  const isGamePaused = (gameStatus === gameStates.paused);

  // TODO: player.solvedAll, reset timer.
  useEffect(() => {
    let interval: TimerInterval;

    if (isGameActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      updateGameStatus(gameStates.paused as GameStatus);
    }

    return () => clearInterval(interval);
  }, [seconds, isGameActive, updateGameStatus]);

  useEffect(() => {
    if (isGamePaused) {
      setSeconds(startTime);
    }
  }, [isGamePaused, setSeconds, startTime]);

  return (
    <div className="game-timer-row">
      <div className="game-timer">
        {isGamePaused ? (
          <Button
            icon={`${icons.play_fill} ri-2x`}
            onClick={() => restartGame()}
            aria-label={playButtonText}
          />
        ) : <span>{seconds}</span>}
      </div>
    </div>
  );
}

export default Timer;
