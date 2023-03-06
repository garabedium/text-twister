import React, { useState, useEffect, useCallback } from 'react';
import isTouchDevice from 'is-touch-device';

import './GameContainer.scss';

import GameStat from '../../components/GameStat/GameStat';
import Timer from '../../components/Timer/Timer';
import GameLettersDisplay from '../../components/GameLettersDisplay/GameLettersDisplay';
import GameForm from '../../components/GameForm/GameForm';
import Anagrams from '../../components/Anagrams/Anagrams';
import Notification from '../../components/Notification/Notification';
import {
  Icons, GameStates, LevelWordLength, MinimumGuessLength,
  Notifications, BaseDate, ScoreLabel, LevelLabel,
} from '../../utils/constants';
import { shuffleLetters, calcWordScore } from '../../utils/utils';
import Button from '../../components/Button/Button';
import LevelWordApi from '../../api/services/LevelWordApi';

function GameContainer({
  gameStatus,
  updateGameStatus,
  currentWord,
  selectNextWord,
}) {
  const isMobileDevice = isTouchDevice();
  const defaultNotification = Notifications[isMobileDevice ? 'default_mobile' : 'default'];

  const [player, setPlayer] = useState({
    score: 0,
    level: 1,
    levelUp: false,
  });

  const [gameLetters, setGameLetters] = useState([]);
  const [anagrams, setAnagrams] = useState({});
  const [notification, setNotification] = useState(defaultNotification);

  const { score, level, levelUp } = player;
  const { word: levelWordText } = currentWord;
  const hasAnagrams = Object.keys(anagrams).length && anagrams[levelWordText] !== undefined;
  const isGameActive = (gameStatus === GameStates.active);
  const restartButtonText = player.levelUp ? 'Next Level' : 'New Game';
  const usedLetters = gameLetters.filter((letter) => letter.used);
  const unusedLetters = gameLetters.filter((letter) => !letter.used);

  // FUNCTIONS
  /// ////////////////////
  const updateGameLetters = (letters) => {
    setGameLetters(letters);
  };

  const updateGameNotification = (gameNotification) => {
    setNotification(gameNotification);
  };

  const restartGame = () => {
    selectNextWord();

    const playerState = {
      score: levelUp ? score : 0,
      level: levelUp ? level + 1 : 1,
      levelUp: false,
    };

    setPlayer(playerState);
    updateGameStatus(GameStates.active);
    updateGameNotification(defaultNotification);
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
      updateGameNotification(Notifications.points);
      setPlayer((prevState) => ({ ...prevState, ...playerState }));
      setAnagrams((prevState) => ({ ...prevState, ...anagramsState }));
    } else {
      updateGameNotification(Notifications.validate_invalid);
    }
  };

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

    updateGameLetters(letters);
  };

  const handleClear = () => {
    const letters = gameLetters.map((letter) => ({ ...letter, used: false, updatedAt: BaseDate }));
    updateGameLetters(letters);
  };

  const getAnagrams = async () => {
    const result = await LevelWordApi.getAnagrams(levelWordText).then((response) => response.data);
    const anagramsHash = { [levelWordText]: {} };

    result.forEach((anagram) => {
      anagramsHash[levelWordText] = { ...anagramsHash[levelWordText], [anagram.anagram]: anagram };
    });

    setAnagrams((prevState) => ({ ...prevState, ...anagramsHash }));
  };

  // EFFECTS
  /// ////////////////////

  // Effects when levelWord changes
  useEffect(() => {
    // Don't shuffle the letters if when game state changes to paused:
    if (gameStatus !== GameStates.paused) {
      const letters = shuffleLetters(levelWordText).split('').map((char, index) => ({
        id: index + 1, char, used: false, updatedAt: BaseDate,
      }));
      setGameLetters(letters);
    }
    // Fetch anagrams for current level word
    getAnagrams();
  }, [levelWordText]);

  // Effects when gameStatus changes
  useEffect(() => {
    if (gameStatus === GameStates.paused) {
      const pauseNotification = (levelUp) ? Notifications.solved_level : Notifications.game_over;
      updateGameNotification(pauseNotification);
    }
  }, [gameStatus]);

  return (
    <>
      <div className="game-container">

        <div className="game-stats">
          <GameStat icon="score" stat={score} label={ScoreLabel} />
          <GameStat icon="level" stat={level} label={LevelLabel} />
        </div>

        <Timer
          gameStatus={gameStatus}
          updateGameStatus={updateGameStatus}
          restartGame={restartGame}
        />

        <GameLettersDisplay
          word={levelWordText}
          gameLetters={gameLetters}
          isGameActive={isGameActive}
          updateGameLetters={updateGameLetters}
        />

        {hasAnagrams && isGameActive ? (
          <GameForm
            levelWordText={levelWordText}
            gameLetters={gameLetters}
            usedLetters={usedLetters}
            unusedLetters={unusedLetters}
            updateGameLetters={updateGameLetters}
            updateGameNotification={updateGameNotification}
            shuffleUnusedLetters={shuffleUnusedLetters}
            validateWord={validateWord}
            anagrams={anagrams}
            handleClear={handleClear}
            isMobileDevice={isMobileDevice}
          />
        ) : null}

        <Notification text={notification.text} />

        <div className="game-controls">
          {isGameActive ? (
            <>
              <Button
                text="Shuffle"
                onClick={() => shuffleUnusedLetters()}
                className="btn--secondary"
                icon={`${Icons.spacebar} m-l5`}
                disabled={unusedLetters.length < MinimumGuessLength}
              />
              <Button
                text="Submit"
                className="btn--secondary"
                icon={`${Icons.arrow_right} m-l5`}
                form="game-form"
                type="submit"
                disabled={usedLetters.length < MinimumGuessLength}
              />
            </>
          ) : (
            <Button
              onClick={() => restartGame()}
              className="btn m-auto"
              text={restartButtonText}
              icon="ri-play-fill ri-lg m-l5"
            />
          )}
        </div>

      </div>

      {hasAnagrams ? (
        <Anagrams
          gameStatus={gameStatus}
          anagrams={anagrams}
          levelWordText={levelWordText}
        />
      ) : null}
    </>
  );
}

export default GameContainer;
