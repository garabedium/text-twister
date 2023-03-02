import React from 'react';
import { Icons } from '../../utils/constants';
import './GameStat.scss';

function GameStat({ icon, stat, label }) {
  const iconClass = `game-stat-icon ri-3x ${Icons[icon]}`;

  return (
    <div className="game-stat">
      <i className={iconClass} role="img" aria-label={label} />
      <span>{stat}</span>
    </div>
  );
}

export default GameStat;
