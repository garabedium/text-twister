import React from 'react';

import './StartPage.scss';
import { GameStates, InstructionsContent } from '../../utils/constants';
import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord';
import Instructions from '../../components/Instructions/Instructions';

function StartPage({ updateGameStatus, hasLevelWord }) {
  return (
    <div className="start-page">
      <div className="game-timer">
        {hasLevelWord
          && (
          <Button
            icon="ri-play-fill ri-2x"
            onClick={() => updateGameStatus(GameStates.active)}
          />
          )}
      </div>
      <GameWord
        word="play"
      />
      <Instructions />
    </div>
  );
}

export default StartPage;
