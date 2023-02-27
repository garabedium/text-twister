import React from 'react';

import './StartPage.scss';
import { GameStates, Icons } from '../../utils/constants';

import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord';

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
      <ul className="instructions-list">
        <li>
          <i className={`${Icons.timer_flash} ri-3x`} />
          {' '}
          Solve words before time runs out
        </li>
        <li>
          <i className="ri-funds-line ri-3x" />
          {' '}
          Solve the 6 letter word and move on up
        </li>
        <li>
          <i className="ri-error-warning-line ri-3x" />
          {' '}
          Words must be a minimum of 3 letters
        </li>
        <li>
          <i className="ri-space ri-3x" />
          {' '}
          Spacebar to shuffle words
        </li>
        <li>
          <i className="ri-arrow-right-line ri-3x" />
          {' '}
          Enter to solve word
        </li>
      </ul>
    </div>
  );
}

export default StartPage;
