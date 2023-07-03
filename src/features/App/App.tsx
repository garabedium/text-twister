import React, { useState } from 'react';
import '../../scss/app.scss';
// import isTouchDevice from 'is-touch-device';

// import {
//   gameStates, wordStates,
// } from '../../utils/constants.util';
import AppHeader from '../../components/AppHeader/AppHeader';
import GameStart from '../GameStart/GameStart';
// import StartPage from '../StartPage/StartPage';
// import GameContainer from '../GameContainer/GameContainer';
// import { GameStatus } from '../../types/game.interface';
// import { LevelWord } from '../../types/level-word.interface';
// import useLevelWords from '../../hooks/useLevelWords';
import { GameStatusProvider } from '../../contexts/GameStatusContext';

function App() {
  // STATE
  /// ////////////////////
  // const [gameStatus, setGameStatus] = useState(gameStates.inactive as GameStatus);
  // const isGameInactive = (gameStatus === gameStates.inactive);

  // const { levelWords, updateLevelWordStatuses } = useLevelWords(gameStatus);
  // const currentWord = levelWords
  //   .filter((word: LevelWord) => word.status === wordStates.current)[0];
  // const hasLevelWord = currentWord?.word !== undefined;

  // FUNCTIONS
  /// ////////////////////
  // const updateGameStatus = (status: GameStatus) => {
  //   setGameStatus(status);
  // };

  // const loadBodyClass = () => {
  //   setTimeout(() => {
  //     document.body.classList.add('--react-loaded');
  //   }, 250);
  // };

  // if (isGameInactive) {
  //   loadBodyClass();
  // }

  return (
    <>
      <AppHeader />
      <div className="app-container">
        <GameStart />
        {/* {isGameInactive
          && (
            <StartPage
              updateGameStatus={updateGameStatus}
              hasLevelWord={hasLevelWord}
            />
          )}
        {!isGameInactive && hasLevelWord
          && (
            <GameContainer
              gameStatus={gameStatus}
              currentWord={currentWord}
              updateGameStatus={updateGameStatus}
              selectNextWord={updateLevelWordStatuses}
              isMobileDevice={isTouchDevice()}
            />
          )} */}
      </div>
    </>
  );
}

export default App;
