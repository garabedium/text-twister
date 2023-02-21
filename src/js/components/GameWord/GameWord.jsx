import React from 'react';
import Button from '../Button/Button';

import './GameWord.scss';

function GameWord({ gameLetters, word }) {
  let displayContent = null;

  if (gameLetters) {
    displayContent = gameLetters.map((letter) => (
      <Button
        cssClass={`letter ${letter.used ? '--used' : ''}`}
        key={letter.id}
        text={letter.char}
      />
    ));
  }
  if (word) {
    displayContent = word.split('').map((letter) => (
      <span className="letter text-uppercase" key={letter}>
        {letter}
      </span>
    ));
  }

  return (
    <div className="word">
      {displayContent}
    </div>
  );
}

export default GameWord;
