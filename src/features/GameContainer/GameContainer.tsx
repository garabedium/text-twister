import React, { useState, useEffect } from 'react';
import './GameContainer.scss';

import GameStat from '../../components/GameStat/GameStat';
import Timer from '../../components/Timer/Timer';
import GameLetters from '../../components/GameLetters/GameLetters';
import GameForm from '../../components/GameForm/GameForm';
import Anagrams from '../../components/Anagrams/Anagrams';
import Notification from '../../components/Notification/Notification';
import {
  icons, gameStates, levelWordLength, minimumGuessLength,
  baseDate, scoreLabel, levelLabel,
} from '../../utils/constants.util';
import { shuffleLetters, calcWordScore } from '../../utils/methods.util';
import Button from '../../components/Button/Button';
import { GameContainerProps } from '../../types/game.interface';
import { Letter } from '../../types/letter.interface';
import { NotificationKey } from '../../types/notification.interface';
import useAnagrams from '../../hooks/useAnagrams';
import { useGameStatus } from '../../contexts/gameStatusContext';

function GameContainer(props: GameContainerProps) {
  const {
    currentWord,
    selectNextWord,
    isMobileDevice,
  } = props;

  const { gameStatus, updateGameStatus, isGameActive } = useGameStatus();
  const defaultNotification = isMobileDevice ? 'default_mobile' : 'default';

  const [player, setPlayer] = useState({
    score: 0,
    level: 1,
    levelUp: false,
  });

  const [gameLetters, setGameLetters] = useState<Letter[]>([]);
  const { word: levelWordText } = currentWord;
  const { anagrams, isValidAnagram, updateSolvedWord } = useAnagrams(levelWordText);
  const [notification, setNotification] = useState<NotificationKey>(defaultNotification);

  const { score, level, levelUp } = player;
  // TODO: move to useAnagrams custom hook:
  const hasAnagrams = Object.keys(anagrams).length && anagrams[levelWordText] !== undefined;
  const restartButtonText = player.levelUp ? 'Next Level' : 'New Game';
  const usedLetters = gameLetters.filter((letter) => letter.used);
  const unusedLetters = gameLetters.filter((letter) => !letter.used);

  // FUNCTIONS
  /// ////////////////////
  const updateGameLetters = (letters: Letter[]) => {
    setGameLetters(letters);
  };

  const updateGameNotification = (notificationKey: NotificationKey) => {
    setNotification(notificationKey);
  };

  const restartGame = () => {
    selectNextWord();

    const playerState = {
      score: levelUp ? score : 0,
      level: levelUp ? level + 1 : 1,
      levelUp: false,
    };

    setPlayer(playerState);
    updateGameStatus(gameStates.active);
    updateGameNotification(defaultNotification);
  };

  const validateWord = (word: string) => {
    if (isValidAnagram(word)) {
      const playerState = {
        score: calcWordScore(word.length, score),
        levelUp: (word.length === levelWordLength || levelUp) ? true : levelUp,
      };

      updateGameNotification('points');
      setPlayer((prevState) => ({ ...prevState, ...playerState }));
      updateSolvedWord(word);
    } else {
      updateGameNotification('validate_invalid');
    }
  };

  const shuffleUnusedLetters = () => {
    const unused = unusedLetters.map((letter) => letter.char).join('');
    const shuffled = shuffleLetters(unused, levelWordText) as string[];
    const shuffledLetters = shuffled.map((char: string) => ({ char, used: false })) as Letter[];

    const used = usedLetters.map((letter) => ({ ...letter, updatedAt: letter.updatedAt }));

    const letters = used.concat(shuffledLetters).map((obj, i) => {
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

  // EFFECTS
  /// ////////////////////

  // When levelWord changes, set game letters:
  useEffect(() => {
    // Only shuffle when the game is active (not paused):
    if (gameStatus !== gameStates.paused) {
      const shuffled = shuffleLetters(levelWordText) as string[];
      const letters = shuffled.map((char: string, i: number) => ({
        id: i + 1, char, used: false, updatedAt: baseDate,
      })) as Letter[];
      setGameLetters(letters);
    }
  }, [gameStatus, levelWordText]);

  // When gameStatus changes, update Notification:
  useEffect(() => {
    if (gameStatus === gameStates.paused) {
      const pauseNotification = (levelUp) ? 'solved_level' : 'game_over';
      updateGameNotification(pauseNotification);
    }
  }, [gameStatus, levelUp]);

  return (
    <>
      <div className="game-container">

        <div className="game-stats">
          <GameStat icon="score" stat={score} label={scoreLabel} />
          <GameStat icon="level" stat={level} label={levelLabel} />
        </div>

        <Timer
          restartGame={restartGame}
        />

        <GameLetters
          word={levelWordText}
          gameLetters={gameLetters}
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

        <Notification name={notification} />

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
