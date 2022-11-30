import React from 'react';
import { useState, useEffect } from 'react';

import './StartPage.scss';
import { shuffleLetters } from '../../utils/utils.js'

import Button from '../../components/Button';
import GameWord from '../../components/GameWord/GameWord.jsx';

function StartPage(props) {

  const solvedWord = "play";
  const shuffleLimit = 5;
  const shuffleDelay = 1000;

  const [shuffleWord, setShuffleWord] = useState('');
  const [shuffleCount, setShuffleCount] = useState(0);

  useEffect(() => {
    shuffleStartPageLetters();
  }, []);

  useEffect(() => {
      setTimeout(() => {
        shuffleStartPageLetters();
      }, shuffleDelay);
  }, [shuffleCount, shuffleWord]);

  // Shuffle "play" letters a few times:
  function shuffleStartPageLetters() {
    const currentShuffle = shuffleLetters(solvedWord,'');

    if (currentShuffle === solvedWord || currentShuffle === shuffleWord){
      return shuffleStartPageLetters();
    }

    if (shuffleCount < shuffleLimit){
      setShuffleWord(currentShuffle);
      setShuffleCount((shuffleCount) => shuffleCount + 1);
    }

  }

  // render() {

    const displayWord = shuffleCount === shuffleLimit ? solvedWord : shuffleWord;
    const letters = displayWord.split('').map( letter => {
      return(
        <Button
          class={`letter letter text-uppercase ${shuffleCount < 5 ? '--animate-letter-fade':'--animate-letter-fade-last'}`}
          text={letter}
          key={letter}
        />  
      )
    })

    return (
      <React.Fragment>
        <div className="word-row start-page">
          <div className="game-timer">
            <Button
              icon="ri-play-fill ri-2x"
              handleClick={props.startGame}
            />
          </div>
          <GameWord word={letters} />
          {/* <div className="word">
            {letters}
          </div> */}
          <ul className="instructions-list">
            <li><i className="ri-timer-flash-line ri-3x"></i> Solve words before time runs out</li>
            <li><i className="ri-funds-line ri-3x"></i> Solve the 6 letter word and move on up</li>
            <li><i className="ri-error-warning-line ri-3x"></i> Words must be a minimum of 3 letters</li>
            <li><i className="ri-space ri-3x"></i> Spacebar to shuffle words</li>
            <li><i className="ri-arrow-right-line ri-3x"></i> Enter to solve word</li>
          </ul>          
        </div>
      </React.Fragment>
    )

}

export default StartPage;