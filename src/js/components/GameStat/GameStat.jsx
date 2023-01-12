import React from 'react';
import { Icons } from '../../utils/constants';
import './GameStat.scss';

function GameStat(props) {
  const { icon, stat } = props;
  const iconClass = `game-stat-icon ri-3x ${Icons[icon]}`;

  return (
    <div className="game-stat">
      <i className={iconClass} />
      <span>{stat}</span>
    </div>
  );
}

export default GameStat;
