import React from 'react';

import './GameWord.scss';

function GameWord(props) {
  const { word } = props;

  return (
    <div className="word">{word}</div>
  );
}

export default GameWord;
