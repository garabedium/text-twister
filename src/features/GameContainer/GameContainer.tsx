import React, { useState, useEffect, useCallback } from 'react';
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
import { shuffleLetters, calcWordScore, anagramsByLevelWord } from '../../utils/methods.util';
import Button from '../../components/Button/Button';
import AnagramService from '../../services/anagram.service';
import { Anagram, AnagramsHashMap } from '../../types/anagram.interface';
import { GameStatus, GameContainerProps } from '../../types/game.interface';
import { Letter } from '../../types/letter.interface';
import { NotificationKey } from '../../types/notification.interface';

function GameContainer(props: GameContainerProps) {
  const {
    gameStatus,
    currentWord,
    updateGameStatus,
    selectNextWord,
    isMobileDevice,
  } = props;

  const defaultNotification = isMobileDevice ? 'default_mobile' : 'default';

  const [player, setPlayer] = useState({
    score: 0,
    level: 1,
    levelUp: false,
  });

  const [gameLetters, setGameLetters] = useState<Letter[]>([]);
  const [anagrams, setAnagrams] = useState<AnagramsHashMap>({});
  const [notification, setNotification] = useState<NotificationKey>(defaultNotification);

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
      updateGameNotification('points');
      setPlayer((prevState) => ({ ...prevState, ...playerState }));
      setAnagrams((prevState) => ({ ...prevState, ...anagramsState }));
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

  const getAnagrams = useCallback(async (): Promise<void> => {
    if (levelWordText) {
      const result: Anagram[] | void = await AnagramService.getAllByLevelWord(levelWordText);

      if (result?.length) {
        const anagramsHash = anagramsByLevelWord(result, levelWordText);
        setAnagrams((prevState) => ({ ...prevState, ...anagramsHash }));
      }
    }
  }, [levelWordText]);

  // EFFECTS
  /// ////////////////////

  // When levelWord changes, set game letters and fetch anagrams:
  useEffect(() => {
    // Only shuffle when the game is active (not paused):
    if (gameStatus !== gameStates.paused) {
      const shuffled = shuffleLetters(levelWordText) as string[];
      const letters = shuffled.map((char: string, i: number) => ({
        id: i + 1, char, used: false, updatedAt: baseDate,
      })) as Letter[];
      setGameLetters(letters);
    }
    // Promises resolved in service layer
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAnagrams();
  }, [gameStatus, levelWordText, getAnagrams]);

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
          gameStatus={gameStatus}
          updateGameStatus={updateGameStatus}
          restartGame={restartGame}
        />

        <GameLetters
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
