import React, { useState, useEffect } from 'react';

import './StartPage.scss';
// import { shuffleLetters } from '../../utils/utils';
import { GameStates, Icons } from '../../utils/constants';

import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord';

function StartPage({ updateGameStatus, hasLevelWord }) {
  // const solvedWord = 'play';
  // const shuffleLimit = 5;
  // const shuffleDelay = 1000;
  const displayWord = 'play';

  // const [shuffleWord, setShuffleWord] = useState('');
  // const [shuffleCount, setShuffleCount] = useState(0);

  // Shuffle "play" letters a few times:
  // function shuffleStartPageLetters() {
  //   const currentShuffle = shuffleLetters(solvedWord, '');

  //   if (currentShuffle === solvedWord || currentShuffle === shuffleWord) {
  //     return shuffleStartPageLetters();
  //   }

  //   if (shuffleCount < shuffleLimit) {
  //     setShuffleWord(currentShuffle);
  //     setShuffleCount((shuffleCount) => shuffleCount + 1);
  //   }
  // }

  // useEffect(() => {
  //   shuffleStartPageLetters();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     shuffleStartPageLetters();
  //   }, shuffleDelay);
  // }, [shuffleCount, shuffleWord]);

  // const displayWord = shuffleCount === shuffleLimit ? solvedWord : shuffleWord;
  // const letters = displayWord.split('').map((letter) => (
  //   <span className="letter text-uppercase" key={letter}>{letter}</span>
  // ));

  // <Button
  //   class="letter text-uppercase"
  //   text={letter}
  //   key={letter}
  // />
  return (
    <div className="word-row start-page">
      <div className="game-timer">
        {hasLevelWord
          && (
          <Button
            icon="ri-play-fill ri-2x"
            onClick={() => updateGameStatus(GameStates.active)}
          />
          )}
      </div>
      <GameWord
        word={displayWord}
      />
      <ul className="instructions-list">
        <li>
          <i className={`${Icons.timer_flash} ri-3x`} />
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
