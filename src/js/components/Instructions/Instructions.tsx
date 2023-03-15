import React from 'react';
import './Instructions.scss';
import { instructionsContent } from '../../utils/constants';

function Instructions() {
  const list = instructionsContent.map((item) => (
    <li key={item.icon}>
      <i className={item.icon} />
      {item.text}
    </li>
  ));
  return <ul className="instructions-list">{list}</ul>;
}

export default Instructions;
