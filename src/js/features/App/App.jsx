import React, { useState, useEffect } from 'react';
import '../../../scss/app.scss';
import isTouchDevice from 'is-touch-device';

import {
  GameStates, WordStates, NextWordStates, ZipfDefaultMin, ZipfDefaultMax,
} from '../../utils/constants';
import AppHeader from '../../components/AppHeader/AppHeader';
import StartPage from '../StartPage/StartPage';
import LevelWordApi from '../../api/services/LevelWordApi';
import GameContainer from '../GameContainer/GameContainer';

function App() {
  // STATE
  /// ////////////////////
  const [gameStatus, setGameStatus] = useState(GameStates.inactive);
  const [levelWords, setLevelWords] = useState([]);

  const currentWord = levelWords.filter((word) => word.status === WordStates.current)[0];
  const hasLevelWord = currentWord?.word;

  // FUNCTIONS
  /// ////////////////////
  const updateGameStatus = (status) => {
    setGameStatus(status);
  };

  const getLevelWord = async () => {
    const usedWords = levelWords.filter((word) => word.status !== WordStates.next).map((word) => `&exclude=${word.word}`).join('');
    const levelWord = await LevelWordApi.getByRange(ZipfDefaultMin, ZipfDefaultMax, usedWords)
      .then((response) => response.data[0]);
    // If no levelWords exist, the first one is automatically current:
    levelWord.status = (!levelWords.length) ? WordStates.current : WordStates.next;

    setLevelWords((prevState) => [...prevState, levelWord]);
  };

  const selectNextWord = () => {
    const words = levelWords.map((word) => ({
      ...word, status: NextWordStates[word.status],
    }));
    setLevelWords(words);
  };

  // EFFECTS
  /// ////////////////////
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('--react-loaded');
    }, 250);

    getLevelWord();
  }, []);

  useEffect(() => {
    if (gameStatus === GameStates.paused) {
      getLevelWord();
    }
  }, [gameStatus]);

  return (
    <>
      <AppHeader />
      <div className="app-container">
        {gameStatus === GameStates.inactive
          && (
            <StartPage
              updateGameStatus={updateGameStatus}
              hasLevelWord={hasLevelWord}
            />
          )}
        {gameStatus !== GameStates.inactive && hasLevelWord
          && (
            <GameContainer
              gameStatus={gameStatus}
              currentWord={currentWord}
              selectNextWord={selectNextWord}
              updateGameStatus={updateGameStatus}
              isMobileDevice={isTouchDevice()}
            />
          )}
      </div>
    </>
  );
}

export default App;
