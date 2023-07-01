import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import '../../scss/app.scss';
import isTouchDevice from 'is-touch-device';

import {
  gameStates, wordStates, nextwordStates,
} from '../../utils/constants.util';
import AppHeader from '../../components/AppHeader/AppHeader';
import StartPage from '../StartPage/StartPage';
import LevelWordService from '../../services/level-word.service';
import GameContainer from '../GameContainer/GameContainer';
import { GameStatus } from '../../types/game.interface';
import { LevelWord, LevelWordStatus } from '../../types/level-word.interface';
import { buildLevelWordZipfQuery } from '../../utils/methods.util';
// import useGetLevelWord from '../../hooks/useGetLevelWord';
import useLevelWords from '../../hooks/useLevelWords';
import Button from '../../components/Button/Button';
// async function getWord(query) {
//   const word = await LevelWordService.getByZipfRange(query);
//   return word;
// }

function App() {
  // STATE
  /// ////////////////////
  const [gameStatus, setGameStatus] = useState(gameStates.inactive as GameStatus);
  // const [{ data }, doFetch] = useGetLevelWord();

  // const currentWord: LevelWord = levelWords
  //   .filter((word: LevelWord) => word.status === wordStates.current)[0];
  // const hasLevelWord = currentWord?.word !== undefined;
  // const usedLevelWords = levelWords.filter((word: LevelWord) => word.status !== wordStates.next);
  // const isGameInactive = gameStatus === gameStates.inactive;
  // const isGamePaused = gameStatus === gameStates.paused;

  // const [levelWords, setLevelWords] = useState<LevelWord[]>([]);
  const [levelWords] = useLevelWords(gameStatus);
  // console.log(levelWords);
  /* REQUIREMENTS
    custom hook that fetches a word under two conditions:
    1.) gameStatus is inactive (happens once)
      - Fetch word
      - Set word status to 'current', based on levelWords.length
      - Push word to state
    2.) gameStatus is paused (happens in between games)
      - Build query based on filteredLevelWords data
      - Fetch word
      - Set word status to 'next'
      - Push word to state
  */

  // FUNCTIONS
  /// ////////////////////
  const updateGameStatus = (status: GameStatus) => {
    setGameStatus(status);
  };

  // Results in infinite loop
  // new word is fetched
  // dep array changes in length
  // new is word fetched etc...

  // const getLevelWord = useCallback(async () => {
  // const query = buildLevelWordZipfQuery(usedLevelWords);
  // const levelWord = await LevelWordService.getByZipfRange(query);
  // // // If no levelWords exist, the first one is automatically current:
  // const status = (!levelWords.length) ? wordStates.current : wordStates.next;
  // levelWord.status = status;
  // setLevelWords((prevState) => [...prevState, levelWord]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [levelWords.length, usedLevelWords]);

  // Fetches twice:
  // const getLevelWord = useCallback(
  //   async () => {
  //     const query = buildLevelWordZipfQuery([]);
  //     const levelWord = await LevelWordService.getByZipfRange(query);
  //     levelWord.status = (!hasLevelWord) ? wordStates.current : wordStates.next;
  //     setLevelWords((prevState) => [...prevState, levelWord]);
  //   },
  //   [hasLevelWord],
  // );

  // Fetches twice:
  // currentWord is undefined
  //
  // const getLevelWord = useCallback(async () => {
  //   const query = buildLevelWordZipfQuery();
  //   const levelWord = await LevelWordService.getByZipfRange(query);
  //   // console.log(currentWordRef.current);
  //   // levelWord.status = (currentWordRef.current === 0) ? wordStates.current : wordStates.next;
  //   // levelWord.status = wordStates.current;
  //   setLevelWords((prevState) => [...prevState, levelWord]);
  // }, []);

  // const getLevelWord = useCallback(async () => {
  //   const query = buildLevelWordZipfQuery([]);
  //   const levelWord = await LevelWordService.getByZipfRange(query);
  //   if (levelWord) {
  //     // levelWord.status = wordStatus as LevelWordStatus;
  //     setLevelWords((prevState) => [...prevState, levelWord]);
  //     // setLevelWords([...levelWords, levelWord]);
  //   }
  // }, []);

  // const selectNextWord = () => {
  //   const words: LevelWord[] = levelWords.map((word: LevelWord) => ({
  //     ...word, status: nextwordStates[word.status] as LevelWordStatus,
  //   }));
  //   setLevelWords(words);
  // };

  // const loadBodyClass = () => {
  //   setTimeout(() => {
  //     document.body.classList.add('--react-loaded');
  //   }, 250);
  // };

  // if (isGameInactive) {
  //   loadBodyClass();
  // }

  // EFFECTS
  /// ////////////////////

  // Some custom hook
  // pass dependencies
  // if one of those dependencies is true

  // useEffect(() => {
  //   // Fetch new level word on App init (gameInactive), and every time game pauses
  //   if (isGamePaused || isGameInactive) {
  //     // ruins the purity of the function:
  //     // const status = !levelWords.length ? wordStates.current : wordStates.next;
  //     // getLevelWord().then(() => {}).catch(() => {});
  //     const query = buildLevelWordZipfQuery([]);
  //     const levelWord = doFetch(query);
  //     setLevelWords(levelWord);
  //   }
  // }, [isGamePaused, isGameInactive]);

  // useEffect(() => {
  //   // if levelWords.length is 1
  //   // set status of levelWord = current, else next
  //   // update object in array
  //   // const updateLevelWordStatus = () => {
  //   // }
  //   if (levelWords.length > 0) {
  //     const status = levelWords.length === 1 ? wordStates.current : wordStates.next;
  //     const updatedLevelWords = [...levelWords];
  //     const record = updatedLevelWords.at(-1);
  //     if (record) {
  //       record.status = status;
  //     }
  //     // setLevelWords((prevState) => ([...prevState, updatedLevelWords]));
  //   }
  //   // const levelWord = levelWords[0].status = status;
  // }, [levelWords]);

  // useEffect(() => {
  //   console.log(levelWords);
  // }, [levelWords]);

  return (
    <>
      <AppHeader />
      <div className="app-container">
        {/* {isGameInactive
          && (
            <StartPage
              updateGameStatus={updateGameStatus}
              hasLevelWord={hasLevelWord}
            />
          )} */}
        {/* {!isGameInactive && hasLevelWord
          && (
            <GameContainer
              gameStatus={gameStatus}
              currentWord={currentWord}
              selectNextWord={selectNextWord}
              updateGameStatus={updateGameStatus}
              isMobileDevice={isTouchDevice()}
            />
          )} */}
        <Button
          text="Press me hard"
          onClick={() => updateGameStatus(gameStates.paused as GameStatus)}
        />
      </div>
    </>
  );
}

export default App;
