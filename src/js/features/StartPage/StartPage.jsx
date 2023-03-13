import React from 'react';

import './StartPage.scss';
import {
  gameStates, icons, playButtonText, playText,
} from '../../utils/constants';
import Button from '../../components/Button/Button';
import GameLettersDisplay from '../../components/GameLettersDisplay/GameLettersDisplay';
import Instructions from '../../components/Instructions/Instructions';

function StartPage({ updateGameStatus, hasLevelWord }) {
  return (
    <div className="start-page">
      <div className="game-timer">
        <Button
          icon={`${icons.play_fill} ri-2x`}
          onClick={() => updateGameStatus(gameStates.active)}
          disabled={!hasLevelWord}
          aria-label={playButtonText}
        />
      </div>
      <GameLettersDisplay
        word={playText}
      />
      <Instructions />
    </div>
  );
}

export default StartPage;
