import React from 'react';

import './StartPage.scss';
import {
  GameStates, Icons, PlayButtonText, PlayText,
} from '../../utils/constants';
import Button from '../../components/Button/Button';
import GameLettersDisplay from '../../components/GameLettersDisplay/GameLettersDisplay';
import Instructions from '../../components/Instructions/Instructions';

function StartPage({ updateGameStatus, hasLevelWord }) {
  return (
    <div className="start-page">
      <div className="game-timer">
        <Button
          icon={`${Icons.play_fill} ri-2x`}
          onClick={() => updateGameStatus(GameStates.active)}
          disabled={!hasLevelWord}
          aria-label={PlayButtonText}
        />
      </div>
      <GameLettersDisplay
        word={PlayText}
      />
      <Instructions />
    </div>
  );
}

export default StartPage;
