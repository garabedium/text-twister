import React, {
  useState, useEffect,
} from 'react';
import '../../../scss/app.scss';
import isTouchDevice from 'is-touch-device';

import {
  gameStates, wordStates, nextwordStates, zipfDefaultMin, zipfDefaultMax,
} from '../../utils/constants';
import AppHeader from '../../components/AppHeader/AppHeader';
import StartPage from '../StartPage/StartPage';
import LevelWordApi from '../../api/services/LevelWordApi';
import GameContainer from '../GameContainer/GameContainer';

import { GameStatus, LevelWord, LevelWordStatus } from '../../utils/types';

function App() {
  // STATE
  /// ////////////////////
  const [gameStatus, setGameStatus] = useState(gameStates.inactive as GameStatus);
  const [levelWords, setLevelWords] = useState<LevelWord[]>([]);

  const currentWord: LevelWord = levelWords
    .filter((word: LevelWord) => word.status === wordStates.current)[0];
  const hasLevelWord = currentWord?.word !== undefined;
  const usedLevelWords = levelWords.filter((word: LevelWord) => word.status !== wordStates.next);

  // FUNCTIONS
  /// ////////////////////
  const updateGameStatus = (status: GameStatus) => {
    setGameStatus(status);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLevelWord = async () => {
    const excludedWords = usedLevelWords.map((word: LevelWord) => `&exclude=${word.word}`).join('');
    const levelWord = await LevelWordApi.getByRange(zipfDefaultMin, zipfDefaultMax, excludedWords);

    // If no levelWords exist, the first one is automatically current:
    const status = (!levelWords.length) ? wordStates.current : wordStates.next;
    levelWord.status = status as LevelWordStatus;

    setLevelWords((prevState) => [...prevState, levelWord]);
  };

  const selectNextWord = () => {
    const words: LevelWord[] = levelWords.map((word: LevelWord) => ({
      ...word, status: nextwordStates[word.status] as LevelWordStatus,
    }));
    setLevelWords(words);
  };

  const loadBodyClass = () => {
    setTimeout(() => {
      document.body.classList.add('--react-loaded');
    }, 250);
  };

  // EFFECTS
  /// ////////////////////

  useEffect(() => {
    if (gameStatus === gameStates.inactive) {
      loadBodyClass();
    }
    if (
      gameStatus === gameStates.paused
      || gameStatus === gameStates.inactive
    ) {
      getLevelWord();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
