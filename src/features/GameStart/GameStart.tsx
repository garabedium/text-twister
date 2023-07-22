import React from 'react';
import isTouchDevice from 'is-touch-device';
import useLevelWords from '../../hooks/useLevelWords';
import { useGameStatus } from '../../providers/gameStatusContext';
import StartPage from '../StartPage/StartPage';
import GameContainer from '../GameContainer/GameContainer';

function GameStart() {
  const { gameStatus, isGameInactive } = useGameStatus();
  const {
    currentWord,
    hasLevelWord,
    updateLevelWordStatuses,
  } = useLevelWords(gameStatus);

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
