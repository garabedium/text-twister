import React from 'react';
import './GameStat.scss';

function GameStat(props) {
  const { icon, stat } = props;
  const icons = {
    score: 'ri-star-fill',
    level: 'ri-funds-line',
  };
  const iconClass = `game-stat-icon ri-3x ${icons[icon]}`;

  return (
    <div className="game-stat">
      <i className={iconClass} />
      <span>{stat}</span>
    </div>
  );
}

export default GameStat;
