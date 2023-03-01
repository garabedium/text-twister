import React from 'react';
import './Instructions.scss';
import { InstructionsContent } from '../../utils/constants';

function Instructions() {
  const list = InstructionsContent.map((item) => (
    <li key={item.icon}>
      <i className={item.icon} />
      {item.text}
    </li>
  ));
  return <ul className="instructions-list">{list}</ul>;
}

export default Instructions;
