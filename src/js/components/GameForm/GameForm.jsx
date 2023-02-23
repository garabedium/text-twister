import React from 'react';
import './GameForm.scss';

import { BaseDate, MinimumGuessLength } from '../../utils/constants';
import TextInput from '../TextInput/TextInput';

function GameForm({
  levelWordText,
  gameLetters,
  updateUsedLetters,
  usedLetters,
  shuffleUnusedLetters,
  validateWord,
  anagrams,
  handleClear,
}) {
  const userGuess = usedLetters.sort((a, b) => a.updatedAt - b.updatedAt).map((result) => result.char).join('');
  const solvedWords = Object.values(anagrams[levelWordText]).filter((anagram) => anagram.solved);

  const isDuplicateSolve = solvedWords.filter((word) => (word.anagram === userGuess)).length > 0;

  const handleKeypress = (event) => {
    const { key } = event;
    const letters = [...gameLetters];
    const foundLetter = letters.filter((letter) => key === letter.char && !letter.used);
    // TODO: rewrite this:
    if (key !== 'Enter' && foundLetter.length) {
      foundLetter[0].used = true;
      foundLetter[0].updatedAt = Date.now();
      updateUsedLetters(letters);
    }

    if (key !== 'Enter') {
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userGuess.length >= MinimumGuessLength) {
      if (isDuplicateSolve) {
        // set dupe notification
        // setNotification('validate_dupe')
      } else {
        validateWord(userGuess);
      }
      handleClear();
    } else {
      // set validate_min notification
      // setNotification('validate_min')
    }
  };

  const handleBackspace = () => {
    const letters = [...gameLetters];
    const lastLetter = letters.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
    lastLetter.used = false;
    lastLetter.updatedAt = BaseDate;
    updateUsedLetters(letters);
  };

  // eslint-disable-next-line consistent-return
  const handleInput = (event) => {
    if (event.type === 'keypress') {
      return handleKeypress(event);
    }

    if (event.type === 'keydown' && event.key === 'Backspace') {
      return handleBackspace();
    }

    if (event.type === 'keydown' && event.key === ' ') {
      return shuffleUnusedLetters();
    }

    // Prevents cursor from moving left within the TextInput
    if (event.type === 'keydown' && event.key === 'ArrowLeft') {
      event.preventDefault();
    }
    // TODO: returning false or null here will cause problems with spacebar shuffle
    // return false;
  };

  return (
    <form
      id="game-form"
      className="game-form"
      spellCheck="false"
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder="Guess a word..."
        name="guess"
        content={userGuess}
        handleChange={handleInput}
        class="game-guess"
      />
    </form>
  );
}

export default GameForm;
