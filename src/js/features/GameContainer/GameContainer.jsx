import React, { useState, useEffect, useCallback } from 'react';

import GameStat from '../../components/GameStat/GameStat';
import Timer from '../../components/Timer/Timer';
import GameWord from '../../components/GameWord/GameWord';
import GameForm from '../../components/GameForm/GameForm';
import Anagrams from '../../components/Anagrams/Anagrams';
import { Icons, GameStates, LevelWordLength } from '../../utils/constants';
import Button from '../../components/Button/Button';
import LevelWordApi from '../../api/services/LevelWordApi';
import { calcWordScore } from '../../utils/utils';

function GameContainer({
  gameStatus,
  updateGameStatus,
  currentWord,
  updateUsedLetters,
  gameLetters,
  usedLetters,
  unusedLetters,
  shuffleUnusedLetters,
  selectNextWord,
  handleClear,
}) {
  const [player, setPlayer] = useState({
    score: 0,
    level: 1,
    levelUp: false,
  });

  const [anagrams, setAnagrams] = useState({});

  const { score, level, levelUp } = player;
  const { word: levelWordText } = currentWord;
  const hasAnagrams = Object.keys(anagrams).length && anagrams[levelWordText] !== undefined;

  const restartGame = () => {
    selectNextWord();

    // update player score, level
    const playerState = {
      score: levelUp ? score : 0,
      level: levelUp ? level + 1 : 1,
      levelUp: false,
    };

    setPlayer(playerState);

    updateGameStatus(GameStates.active);
    // set notification
    // console.log('restart game...');
  };

  const validateWord = (word) => {
    const isValid = anagrams[levelWordText][word] !== undefined;
    if (isValid) {
      const playerState = {
        score: calcWordScore(word.length, score),
        levelUp: (word.length === LevelWordLength || levelUp) ? true : levelUp,
      };

      const anagramsState = {
        [levelWordText]: {
          ...anagrams[levelWordText],
          [word]: { ...anagrams[levelWordText][word], solved: true },
        },
      };

      setPlayer((prevState) => ({ ...prevState, ...playerState }));
      setAnagrams((prevState) => ({ ...prevState, ...anagramsState }));
    }
  };

  const getAnagrams = async () => {
    const result = await LevelWordApi.getAnagrams(levelWordText).then((response) => response.data);
    const anagramsHash = { [levelWordText]: {} };

    result.forEach((anagram) => {
      anagramsHash[levelWordText] = { ...anagramsHash[levelWordText], [anagram.anagram]: anagram };
    });

    setAnagrams((prevState) => ({ ...prevState, ...anagramsHash }));
  };

  const DisplayWord = useCallback(() => (
    (gameStatus === GameStates.paused) ? (
      <GameWord
        word={levelWordText}
      />
    ) : (
      <GameWord
        gameLetters={gameLetters}
      />
    )
  ), [gameStatus, levelWordText, gameLetters]);

  useEffect(() => {
    getAnagrams();
  }, [levelWordText]);

  return (
    <>
      <div className="game-stats">
        <GameStat icon="score" stat={score} />
        <GameStat icon="level" stat={level} />
      </div>
      <div className="word-row">
        <Timer
          gameStatus={gameStatus}
          updateGameStatus={updateGameStatus}
          restartGame={restartGame}
        />
        <DisplayWord />
      </div>
      {/* <Notification /> */}
      {hasAnagrams ? (
        <GameForm
          levelWordText={levelWordText}
          gameLetters={gameLetters}
          usedLetters={usedLetters}
          unusedLetters={unusedLetters}
          updateUsedLetters={updateUsedLetters}
          shuffleUnusedLetters={shuffleUnusedLetters}
          validateWord={validateWord}
          anagrams={anagrams}
          handleClear={handleClear}
        />
      ) : null}
      {/* TODO: disable Shuffle if unusedCount is < 3 */}
      <div className="buttons">
        <Button
          text="Shuffle"
          handleClick={shuffleUnusedLetters}
          cssClass="btn--secondary"
          icon={`${Icons.space} m-l5`}
        />
        <Button
          text="Submit"
          cssClass="btn--secondary"
          icon={`${Icons.arrow_right} m-l5`}
          form="game-form"
          type="submit"
        />
      </div>

      {hasAnagrams ? (
        <Anagrams
          gameStatus={gameStatus}
          anagrams={anagrams}
          levelWordText={levelWordText}
        />
      ) : null}
    </>
    // Notification
    // Reset Button
  );
}

export default GameContainer;
