import React from 'react';

import './StartPage.scss';
import { GameStates, InstructionsContent } from '../../utils/constants';
import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord';

function Instructions() {
  const list = InstructionsContent.map((item) => (
    <li key={item.icon}>
      <i className={item.icon} />
      {item.text}
    </li>
  ));
  return <ul className="instructions-list">{list}</ul>;
}

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
