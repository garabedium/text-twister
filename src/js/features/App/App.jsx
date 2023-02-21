import React, { useState, useEffect } from 'react';
import '../../../scss/app.scss';

import { GameStates, WordStates, BaseDate } from '../../utils/constants';
import { shuffleLetters } from '../../utils/utils';
import AppHeader from '../../components/AppHeader/AppHeader';
import StartPage from '../StartPage/StartPage';
import LevelWordApi from '../../api/services/LevelWordApi';
import GameContainer from '../GameContainer/GameContainer';

function App() {
  const [gameStatus, setGameStatus] = useState(GameStates.inactive);
  const [levelWords, setLevelWords] = useState([]);
  const [gameLetters, setGameLetters] = useState([]);

  const currentWord = levelWords.filter((word) => word.status === WordStates.current)[0];
  const usedLetters = gameLetters.filter((letter) => letter.used);
  const unusedLetters = gameLetters.filter((letter) => !letter.used);
  const hasLevelWord = currentWord?.word;

  // updates gameLetters:
  const updateUsedLetters = (letters) => {
    setGameLetters(letters);
  };

  const updateGameStatus = (input) => {
    setGameStatus(input);
  };

  const getLevelWord = async () => {
    // TODO: params - zipfMin, zipfMax, exclude (array)
    const levelWord = await LevelWordApi.getByRange().then((response) => response.data[0]);
    // eventually set current bool when user solves level word

    // If no levelWords exist, the first one is automatically current:
    levelWord.status = (!levelWords.length) ? WordStates.current : WordStates.next;

    setLevelWords((prevState) => [...prevState, levelWord]);
  };

  const selectNextWord = () => {
    const words = levelWords.map((word) => {
      if (word.status === 'current') {
        word.status = 'used'
      } else if (word.status === 'next'){
        word.status = 'current'
      }
      return word
    });
    setLevelWords(words);
  }

  // Shuffle the unused letters:
  // TODO: only run the shuffle if unused.length > 2
  const shuffleUnusedLetters = () => {
    const unused = unusedLetters.map((letter) => letter.char).join('');
    const shuffled = shuffleLetters(unused).split('').map((char) => ({ char, used: false }));
    const used = usedLetters.map((letter) => ({ ...letter, updatedAt: letter.updatedAt }));

    const letters = used.concat(shuffled).map((obj, i) => {
      const updatedAt = obj.updatedAt || BaseDate;
      return {
        id: i + 1, char: obj.char, used: obj.used, updatedAt,
      };
    });

    updateUsedLetters(letters);
  };

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('--react-loaded');
    }, 100);

    getLevelWord();
  }, []);

  useEffect(() => {
    // Don't shuffle the letters if when game state changes to paused:
    if (currentWord?.word && gameStatus !== GameStates.paused) {
      const letters = shuffleLetters(currentWord.word).split('').map((char, index) => ({
        id: index + 1, char, used: false, updatedAt: BaseDate,
      }));
      setGameLetters(letters);
    }
  }, [levelWords.length, currentWord]);

  useEffect(() => {
    if (gameStatus === GameStates.paused){
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
        {/* move anagrams up. only load the game container  */}
        {gameStatus !== GameStates.inactive && hasLevelWord
          && (
            <GameContainer
              levelWords={levelWords}
              gameStatus={gameStatus}
              currentWord={currentWord}
              gameLetters={gameLetters}
              usedLetters={usedLetters}
              unusedLetters={unusedLetters}
              updateGameStatus={updateGameStatus}
              updateUsedLetters={updateUsedLetters}
              shuffleUnusedLetters={shuffleUnusedLetters}
              selectNextWord={selectNextWord}
            />
          )}
      </div>
    </>
  );
}

export default App;
