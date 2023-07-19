import React from 'react';
import isTouchDevice from 'is-touch-device';
import { wordStates } from '../../utils/constants.util';
import useLevelWords from '../../hooks/useLevelWords';
import { useGameStatus } from '../../contexts/gameStatusContext';
import { LevelWord } from '../../types/level-word.interface';
import StartPage from '../StartPage/StartPage';
import GameContainer from '../GameContainer/GameContainer';

function GameStart() {
  const { gameStatus, isGameInactive } = useGameStatus();

  const { levelWords, updateLevelWordStatuses } = useLevelWords(gameStatus);
  // todo: abstract currentWord to custom hook...
  const currentWord = levelWords
    .filter((word: LevelWord) => word.status === wordStates.current)[0];
  const hasLevelWord = currentWord?.word !== undefined;

  return (
    <>
      {isGameInactive
        && (
          <StartPage
            hasLevelWord={hasLevelWord}
          />
        )}

      {!isGameInactive && hasLevelWord
        && (
          <GameContainer
            currentWord={currentWord}
            selectNextWord={updateLevelWordStatuses}
            isMobileDevice={isTouchDevice()}
          />
        )}
    </>
  );
}

export default GameStart;
