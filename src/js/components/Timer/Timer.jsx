import React, { useState, useEffect } from 'react';
import {
  timeDev, timeProd, isDevEnv, isTestEnv, icons,
  gameStates, playButtonText,
} from '../../utils/constants';
import './Timer.scss';
import Button from '../Button/Button';

function Timer({ gameStatus, updateGameStatus, restartGame }) {
  const startTime = (isDevEnv || isTestEnv) ? timeDev : timeProd;
  const [seconds, setSeconds] = useState(startTime);

  const isGameActive = (gameStatus === gameStates.active);
  const isGamePaused = (gameStatus === gameStates.paused);

  // TODO: player.solvedAll, reset timer.
  useEffect(() => {
    let interval = null;

    if (isGameActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      updateGameStatus(gameStates.paused);
    }

    return () => clearInterval(interval);
  }, [seconds, isGameActive]);

  useEffect(() => {
    if (isGamePaused) {
      setSeconds(startTime);
    }
  }, [isGamePaused]);

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
