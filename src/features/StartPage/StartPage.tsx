import React from 'react';

import './StartPage.scss';
import {
  gameStates, icons, playButtonText, playText,
} from '../../utils/constants.util';
import Button from '../../components/Button/Button';
import GameLetters from '../../components/GameLetters/GameLetters';
import Instructions from '../../components/Instructions/Instructions';
import { GameStatus } from '../../types/game.interface';
import { StartPageProps } from '../../types/start-page.interface';
import { useGameStatus } from '../../contexts/gameStatusContext';

function StartPage(props: StartPageProps) {
  const { hasLevelWord } = props;
  const { updateGameStatus } = useGameStatus();

  return (
    <div className="start-page">
      <div className="game-timer">
        <Button
          icon={`${icons.play_fill} ri-2x`}
          onClick={() => updateGameStatus(gameStates.active as GameStatus)}
          disabled={!hasLevelWord}
          aria-label={playButtonText}
        />
      </div>
      <GameLetters
        word={playText}
      />
      <Instructions />
    </div>
  );
}

export default StartPage;
