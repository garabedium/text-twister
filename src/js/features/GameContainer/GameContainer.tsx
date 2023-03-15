import React, { useState, useEffect } from 'react';
import './GameContainer.scss';

import GameStat from '../../components/GameStat/GameStat';
import Timer from '../../components/Timer/Timer';
import GameLettersDisplay from '../../components/GameLettersDisplay/GameLettersDisplay';
import GameForm from '../../components/GameForm/GameForm';
import Anagrams from '../../components/Anagrams/Anagrams';
import Notification from '../../components/Notification/Notification';
import {
  icons, gameStates, levelWordLength, minimumGuessLength,
  notifications, baseDate, scoreLabel, levelLabel,
} from '../../utils/constants';
import { shuffleLetters, calcWordScore } from '../../utils/utils';
import Button from '../../components/Button/Button';
import LevelWordApi from '../../api/services/LevelWordApi';
import {
  AnagramsType, Anagram, GameStatus, GameContainerProps, Letter, NotificationType,
} from '../../utils/types';

function GameContainer(props: GameContainerProps) {
  const {
    gameStatus,
    currentWord,
    updateGameStatus,
    selectNextWord,
    isMobileDevice,
  } = props;

  const defaultNotification = notifications[isMobileDevice ? 'default_mobile' : 'default'];

  const [player, setPlayer] = useState({
    score: 0,
    level: 1,
    levelUp: false,
  });

  const [gameLetters, setGameLetters] = useState<Letter[]>([]);
  const [anagrams, setAnagrams] = useState<AnagramsType>({});
  const [notification, setNotification] = useState<String>(defaultNotification);

  const { score, level, levelUp } = player;
  const { word: levelWordText } = currentWord;
  const hasAnagrams = Object.keys(anagrams).length && anagrams[levelWordText] !== undefined;
  const isGameActive = (gameStatus === gameStates.active);
  const restartButtonText = player.levelUp ? 'Next Level' : 'New Game';
  const usedLetters = gameLetters.filter((letter) => letter.used);
  const unusedLetters = gameLetters.filter((letter) => !letter.used);

  // FUNCTIONS
  /// ////////////////////
  const updateGameLetters = (letters: Letter[]) => {
    setGameLetters(letters);
  };

  const updateGameNotification = (gameNotification: NotificationType) => {
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
    updateGameStatus(gameStates.active as GameStatus);
    updateGameNotification(defaultNotification);
  };

  const validateWord = (word: string) => {
    const isValid = anagrams[levelWordText][word] !== undefined;
    if (isValid) {
      const playerState = {
        score: calcWordScore(word.length, score),
        levelUp: (word.length === levelWordLength || levelUp) ? true : levelUp,
      };

      const anagramsState = {
        [levelWordText]: {
          ...anagrams[levelWordText],
          [word]: { ...anagrams[levelWordText][word], solved: true },
        },
      };
      updateGameNotification(notifications.points);
      setPlayer((prevState) => ({ ...prevState, ...playerState }));
      setAnagrams((prevState) => ({ ...prevState, ...anagramsState }));
    } else {
      updateGameNotification(notifications.validate_invalid);
    }
  };

  const shuffleUnusedLetters = () => {
    const unused = unusedLetters.map((letter) => letter.char).join('');
    const shuffled = shuffleLetters(unused).split('').map((char: string) => ({ char, used: false }));
    const used = usedLetters.map((letter) => ({ ...letter, updatedAt: letter.updatedAt }));

    const letters = used.concat(shuffled).map((obj, i) => {
      const updatedAt = obj.updatedAt || baseDate;
      return {
        id: i + 1, char: obj.char, used: obj.used, updatedAt,
      };
    });

    updateGameLetters(letters);
  };

  const handleClear = () => {
    const letters = gameLetters.map((letter) => ({ ...letter, used: false, updatedAt: baseDate }));
    updateGameLetters(letters);
  };

  const getAnagrams = async () => {
    const result = await LevelWordApi.getAnagrams(levelWordText).then((response) => response.data);
    const anagramsHash = { [levelWordText]: {} };

    result.forEach((anagram: Anagram) => {
      anagramsHash[levelWordText] = { ...anagramsHash[levelWordText], [anagram.anagram]: anagram };
    });

    setAnagrams((prevState) => ({ ...prevState, ...anagramsHash }));
  };

  // EFFECTS
  /// ////////////////////

  // Effects when levelWord changes
  useEffect(() => {
    // Don't shuffle the letters if when game state changes to paused:
    if (gameStatus !== gameStates.paused) {
      const letters = shuffleLetters(levelWordText).split('').map((char: string, i: number) => ({
        id: i + 1, char, used: false, updatedAt: baseDate,
      }));
      setGameLetters(letters);
    }
    // Fetch anagrams for current level word
    getAnagrams();
  }, [levelWordText]);

  // Effects when gameStatus changes
  useEffect(() => {
    if (gameStatus === gameStates.paused) {
      const pauseNotification = (levelUp) ? notifications.solved_level : notifications.game_over;
      updateGameNotification(pauseNotification);
    }
  }, [gameStatus]);

  return (
    <>
      <div className="game-container">

        <div className="game-stats">
          <GameStat icon="score" stat={score} label={scoreLabel} />
          <GameStat icon="level" stat={level} label={levelLabel} />
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
            updateGameLetters={updateGameLetters}
            updateGameNotification={updateGameNotification}
            shuffleUnusedLetters={shuffleUnusedLetters}
            validateWord={validateWord}
            anagrams={anagrams}
            handleClear={handleClear}
            isMobileDevice={isMobileDevice}
          />
        ) : null}

        <Notification text={notification} />

        <div className="game-controls">
          {isGameActive ? (
            <>
              <Button
                text="Shuffle"
                onClick={() => shuffleUnusedLetters()}
                className="btn--secondary"
                icon={`${icons.spacebar} m-l5`}
                disabled={unusedLetters.length < minimumGuessLength}
              />
              <Button
                text="Submit"
                className="btn--secondary"
                icon={`${icons.arrow_right} m-l5`}
                form="game-form"
                type="submit"
                disabled={usedLetters.length < minimumGuessLength}
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
