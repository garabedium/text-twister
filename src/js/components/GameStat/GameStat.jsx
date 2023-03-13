import React from 'react';
import { icons } from '../../utils/constants';
import './GameStat.scss';

function GameStat({ icon, stat, label }) {
  const iconClass = `game-stat-icon ri-3x ${icons[icon]}`;

  return (
    <div className="game-stat">
      <i className={iconClass} role="img" aria-label={label} />
      <span>{stat}</span>
    </div>
  );
}

export default GameStat;
