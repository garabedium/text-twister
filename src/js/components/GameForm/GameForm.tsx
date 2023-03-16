import React from 'react';
import { GameFormProps, Letter } from '../../utils/types';
import './GameForm.scss';

import {
  baseDate, minimumGuessLength, gameInputLabel,
} from '../../utils/constants';
import TextInput from '../TextInput/TextInput';
import GuessMobile from '../../features/GuessMobile/GuessMobile';

function GameForm(props: GameFormProps) {
  const {
    levelWordText,
    gameLetters,
    updateGameLetters,
    updateGameNotification,
    usedLetters,
    shuffleUnusedLetters,
    validateWord,
    anagrams,
    handleClear,
    isMobileDevice,
  } = props;

  const userGuess = usedLetters.sort((a: Letter, b: Letter) => a.updatedAt - b.updatedAt).map((result) => result.char).join('');
  const solvedWords = Object.values(anagrams[levelWordText]).filter((anagram) => anagram.solved);

  const isDuplicateSolve = solvedWords.filter((word) => (word.anagram === userGuess)).length > 0;

  const handleKeypress = (event: KeyboardEvent) => {
    const { key } = event;
    const letters = [...gameLetters];
    const foundLetter = letters.find((letter) => key === letter.char && !letter.used);

    if (key !== 'Enter' && foundLetter !== undefined) {
      foundLetter.used = true;
      foundLetter.updatedAt = Date.now();
      updateGameLetters(letters);
    }

    if (key !== 'Enter') {
      event.preventDefault();
    }
  };

  const handleSubmit = (event?: React.FormEvent) => {
    // Event needed when form submitted from Submit button:
    event?.preventDefault();

    if (userGuess.length >= minimumGuessLength) {
      if (isDuplicateSolve) {
        updateGameNotification('validate_dupe');
      } else {
        validateWord(userGuess);
      }
      handleClear();
    } else {
      updateGameNotification('validate_min');
    }
  };

  const handleBackspace = () => {
    const letters = [...gameLetters];
    const lastLetter = letters.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
    lastLetter.used = false;
    lastLetter.updatedAt = baseDate;
    updateGameLetters(letters);
  };

  const handleInput = (event: KeyboardEvent) => {
    if (event.type === 'keypress') {
      return handleKeypress(event);
    }

    if (event.type === 'keydown' && event.key === 'Backspace') {
      return handleBackspace();
    }

    if (event.type === 'keydown' && event.key === ' ') {
      return shuffleUnusedLetters();
    }

    if (event.type === 'keydown' && event.key === 'Enter') {
      return handleSubmit();
    }

    // Prevents cursor from moving left within the TextInput
    if (event.type === 'keydown' && event.key === 'ArrowLeft') {
      return event.preventDefault();
    }

    return null;
  };

  return (
    <form
      id="game-form"
      className="game-form"
      spellCheck="false"
      onSubmit={handleSubmit}
    >
      {isMobileDevice
        ? (
          <GuessMobile
            userGuess={userGuess}
            handleBackspace={handleBackspace}
          />
        ) : (
          <TextInput
            autoFocus
            autoComplete="off"
            placeholder={gameInputLabel}
            name="guess"
            value={userGuess}
            onKeyPress={handleInput}
            onKeyDown={handleInput}
            onChange={handleInput}
            className="game-guess"
            aria-label={gameInputLabel}
          />
        )}

    </form>
  );
}

export default GameForm;
