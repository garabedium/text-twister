import React from 'react';

import './StartPage.scss';
import {
  gameStates, icons, playButtonText, playText,
} from '../../utils/constants';
import Button from '../../components/Button/Button';
import GameLetters from '../../components/GameLetters/GameLetters';
import Instructions from '../../components/Instructions/Instructions';
import { StartPageProps, GameStatus } from '../../utils/types';

function StartPage(props: StartPageProps) {
  const {
    updateGameStatus,
    hasLevelWord,
  } = props;

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
        isGameActive={false}
      />
      <Instructions />
    </div>
  );
}

export default StartPage;
