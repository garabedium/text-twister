import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { gameInputLabel, backspaceButtonText } from '../../utils/constants';
import {
  LevelWordsData, GameLettersData, AnagramsData, AnagramsByLevelWord,
} from '../../utils/test-utils';
import GameForm from './GameForm';

describe('Register component', () => {
  const gameLetters = GameLettersData();
  const usedLetters = gameLetters.filter((letter) => letter.used);
  const unusedLetters = gameLetters.filter((letter) => !letter.used);
  let mobileDevice = false;
  const renderGameForm = () => render(
    <GameForm
      levelWordText={LevelWordsData[0].word}
      gameLetters={gameLetters}
      usedLetters={usedLetters}
      unusedLetters={unusedLetters}
      anagrams={AnagramsByLevelWord(AnagramsData)}
      isMobileDevice={mobileDevice}
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
