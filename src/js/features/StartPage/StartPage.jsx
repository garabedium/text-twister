import React, { useState, useEffect } from 'react';

import './StartPage.scss';
import { shuffleLetters } from '../../utils/utils';

import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord';

function StartPage(props) {
  const solvedWord = 'play';
  const shuffleLimit = 5;
  const shuffleDelay = 1000;

  const [shuffleWord, setShuffleWord] = useState('');
  const [shuffleCount, setShuffleCount] = useState(0);

  // Shuffle "play" letters a few times:
  function shuffleStartPageLetters() {
    const currentShuffle = shuffleLetters(solvedWord, '');

    if (currentShuffle === solvedWord || currentShuffle === shuffleWord) {
      return shuffleStartPageLetters();
    }

    if (shuffleCount < shuffleLimit) {
      setShuffleWord(currentShuffle);
      setShuffleCount((shuffleCount) => shuffleCount + 1);
    }
  }

  useEffect(() => {
    shuffleStartPageLetters();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      shuffleStartPageLetters();
    }, shuffleDelay);
  }, [shuffleCount, shuffleWord]);

  const displayWord = shuffleCount === shuffleLimit ? solvedWord : shuffleWord;
  const letters = displayWord.split('').map((letter) => (
    <Button
      class={`letter letter text-uppercase ${shuffleCount < 5 ? '--animate-letter-fade' : '--animate-letter-fade-last'}`}
      text={letter}
      key={letter}
    />
  ));

  return (
    <div className="word-row start-page">
      <div className="game-timer">
        <Button
          icon="ri-play-fill ri-2x"
          handleClick={props.startGame}
        />
      </div>
      <GameWord word={letters} />
      <ul className="instructions-list">
        <li>
          <i className="ri-timer-flash-line ri-3x" />
          {' '}
          Solve words before time runs out
        </li>
        <li>
          <i className="ri-funds-line ri-3x" />
          {' '}
          Solve the 6 letter word and move on up
        </li>
        <li>
          <i className="ri-error-warning-line ri-3x" />
          {' '}
          Words must be a minimum of 3 letters
        </li>
        <li>
          <i className="ri-space ri-3x" />
          {' '}
          Spacebar to shuffle words
        </li>
        <li>
          <i className="ri-arrow-right-line ri-3x" />
          {' '}
          Enter to solve word
        </li>
      </ul>
    </div>
  );
}

export default StartPage;
