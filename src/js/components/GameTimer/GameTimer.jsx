import React from 'react';

import './GameTimer.scss'

function GameTimer(props) {
  const { seconds } = props;

  return ( 
    <span>{seconds}</span>
  );
}

export default GameTimer;