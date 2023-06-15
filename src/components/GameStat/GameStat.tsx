import React from 'react';
import { icons } from '../../utils/constants.util';
import { GameStatProps } from '../../utils/types.util';
import './GameStat.scss';

function GameStat(props: GameStatProps) {
  const { icon, stat, label } = props;

  const iconClass = `game-stat-icon ri-3x ${icons[icon]}`;

  return (
    <div className="game-stat">
      <i className={iconClass} role="img" aria-label={label} />
      <span>{stat}</span>
    </div>
  );
}

export default GameStat;
