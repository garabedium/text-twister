import React from 'react';
import Button from '../Button/Button';

import './GameWord.scss';

function GameWord({ gameLetters, updateGameLetters, word }) {
  let content = null;

  const handleLetterClick = (clickedLetter) => {
    const letters = [...gameLetters];
    const foundLetter = letters.find((letter) => letter.id === clickedLetter.id);

    if (foundLetter !== undefined) {
      foundLetter.used = true;
      foundLetter.updatedAt = Date.now();
      updateGameLetters(letters);
    }
  };

  if (gameLetters) {
    content = gameLetters.map((letter) => (
      <Button
        className={`letter ${letter.used ? '--used' : ''}`}
        key={letter.id}
        text={letter.char}
        disabled={letter.used}
        onClick={() => handleLetterClick(letter)}
      />
    ));
  }
  if (word) {
    // Create letter object array to avoid duplicate key error with repeating letters:
    const wordArray = word.split('').map((char, i) => ({ char, id: i }));
    content = wordArray.map((letter) => (
      <span className="letter text-uppercase" key={letter.id}>
        {letter.char}
      </span>
    ));
  }

  return (
    <div className="letters">
      {content}
    </div>
  );
}

export default GameWord;
