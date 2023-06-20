import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { gameInputLabel, backspaceButtonText } from '../../utils/constants.util';
import {
  levelWordsData, gameLettersData, anagramsData,
} from '../../utils/tests.util';
import { anagramsByLevelWord } from '../../utils/methods.util';
import { Letter } from '../../types/letter.interface';
import GameForm from './GameForm';

describe('Register component', () => {
  const gameLetters = gameLettersData() as Letter[];
  const usedLetters = gameLetters.filter((letter) => letter.used);

  let mobileDevice = false;
  const renderGameForm = () => render(
    <GameForm
      levelWordText={levelWordsData[0].word}
      gameLetters={gameLetters}
      usedLetters={usedLetters}
      anagrams={anagramsByLevelWord(anagramsData, levelWordsData[0].word)}
      isMobileDevice={mobileDevice}
      updateGameLetters={() => null}
      handleClear={() => null}
      validateWord={() => null}
      updateGameNotification={() => null}
      shuffleUnusedLetters={() => null}
    />,
  );

  it('should show a text input if not on a mobile device', () => {
    renderGameForm();
    const input = screen.getByLabelText(gameInputLabel);
    expect(input).toBeInTheDocument();
  });

  it('should load the guess mobile component if using a mobile device', () => {
    mobileDevice = true;
    renderGameForm();
    const backspaceButton = screen.getByLabelText(backspaceButtonText);
    expect(backspaceButton).toBeInTheDocument();
  });
});
