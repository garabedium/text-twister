import React from 'react';
import Button from '../Button/Button';
import { Letter } from '../../types/letter.interface';
import { GameLettersProps } from '../../types/game.interface';
import './GameLetters.scss';

function GameLetters(props: GameLettersProps) {
  const {
    gameLetters,
    word,
    isGameActive,
    updateGameLetters,
  } = props;

  let content = null;

  const handleLetterClick = (clickedLetter: Letter) => {
    if (gameLetters?.length && updateGameLetters) {
      const letters = [...gameLetters];
      const foundLetter = letters.find((letter) => letter.id === clickedLetter.id);

      if (foundLetter !== undefined) {
        foundLetter.used = true;
        foundLetter.updatedAt = Date.now();
        updateGameLetters(letters);
      }
    }
  };

  if (gameLetters && isGameActive) {
    content = gameLetters.map((letter) => (
      <Button
        className={`letter ${letter.used ? '--used' : ''}`}
        key={letter.id}
        text={letter.char}
        disabled={letter.used}
        onClick={() => handleLetterClick(letter)}
        data-testid={`game-letter-${letter.id}`}
      />
    ));
  } else if (word && !isGameActive) {
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

export default GameLetters;
