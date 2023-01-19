import React, { useState, useEffect } from 'react';
import { TimerDev, TimerProd, IsDevEnv } from '../../utils/constants';
import './Timer.scss';

function Timer(props) {
  const { updateGameState, game } = props;
  const startTime = IsDevEnv ? TimerDev : TimerProd;
  const [seconds, setSeconds] = useState(startTime);

  // cases & props:
  // if player.solvedAll is true, terminate the timer, set seconds to 0

  useEffect(() => {
    let interval = null;

    if (game.active && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      updateGameState();
    }

    return () => clearInterval(interval);
  }, [seconds, game.active]);

  useEffect(() => {
    if (game.reset) {
      setSeconds(startTime);
    }
  }, [game.reset]);

  return (
    <div className="game-timer">
      <span>{seconds}</span>
    </div>
  );
}

export default Timer;
