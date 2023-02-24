import React, { useState, useEffect } from 'react';
import {
  TimeDev, TimeProd, IsDevEnv, Icons,
  GameStates,
} from '../../utils/constants';
import './Timer.scss';
import Button from '../Button/Button';

function Timer({ gameStatus, updateGameStatus, restartGame }) {
  const startTime = IsDevEnv ? TimeDev : TimeProd;
  const [seconds, setSeconds] = useState(startTime);

  const isGameActive = (gameStatus === GameStates.active);
  const isGamePaused = (gameStatus === GameStates.paused);

  // TODO: player.solvedAll, reset timer.

  useEffect(() => {
    let interval = null;

    if (isGameActive && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      updateGameStatus(GameStates.paused);
    }

    return () => clearInterval(interval);
  }, [seconds, isGameActive]);

  useEffect(() => {
    if (isGamePaused) {
      setSeconds(startTime);
    }
  }, [isGamePaused]);

  return (
    <div className="game-timer">
      {isGamePaused ? (
        <Button
          icon={`${Icons.play_fill} ri-2x`}
          onClick={() => restartGame()}
        />
      ) : <span>{seconds}</span>}
    </div>
  );
}

export default Timer;
