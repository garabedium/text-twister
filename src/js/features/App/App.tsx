import React, { useState, useEffect } from 'react';
import '../../../scss/app.scss';
import isTouchDevice from 'is-touch-device';

import {
  gameStates, wordStates, nextwordStates, zipfDefaultMin, zipfDefaultMax,
} from '../../utils/constants';
import AppHeader from '../../components/AppHeader/AppHeader';
import StartPage from '../StartPage/StartPage';
import LevelWordApi from '../../api/services/LevelWordApi';
import GameContainer from '../GameContainer/GameContainer';

import { GameStatus, LevelWord, WordStatus } from '../../utils/types';

function App() {
  // STATE
  /// ////////////////////
  const [gameStatus, setGameStatus] = useState(gameStates.inactive as GameStatus);
  const [levelWords, setLevelWords] = useState<LevelWord[]>([]);

  const currentWord: LevelWord = levelWords
    .filter((word: LevelWord) => word.status === wordStates.current)[0];
  const hasLevelWord = currentWord?.word !== undefined;

  // FUNCTIONS
  /// ////////////////////
  const updateGameStatus = (status: GameStatus) => {
    setGameStatus(status);
  };

  const getLevelWord = async () => {
    const usedWords = levelWords.filter((word: LevelWord) => word.status !== wordStates.next).map((word: LevelWord) => `&exclude=${word.word}`).join('');
    const levelWord = await LevelWordApi.getByRange(zipfDefaultMin, zipfDefaultMax, usedWords).then((response) => response.data[0]);
    // If no levelWords exist, the first one is automatically current:
    levelWord.status = (!levelWords.length) ? wordStates.current : wordStates.next;

    setLevelWords((prevState) => [...prevState, levelWord]);
  };

  const selectNextWord = () => {
    const words: LevelWord[] = levelWords.map((word: LevelWord) => ({
      ...word, status: nextwordStates[word.status] as WordStatus,
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
    if (gameStatus === gameStates.paused) {
      getLevelWord();
    }
  }, [gameStatus]);

  return (
    <>
      <AppHeader />
      <div className="app-container">
        {gameStatus === gameStates.inactive
          && (
            <StartPage
              updateGameStatus={updateGameStatus}
              hasLevelWord={hasLevelWord}
            />
          )}
        {gameStatus !== gameStates.inactive && hasLevelWord
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
