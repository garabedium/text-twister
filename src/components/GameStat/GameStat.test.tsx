import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { icons, scoreLabel, levelLabel } from '../../utils/constants.util';
import GameStat from './GameStat';

describe('Register GameStat component', () => {
  it('should render the GameStat score', () => {
    const score = 100;
    const { container } = render(<GameStat icon="score" stat={score} label={scoreLabel} />);

    expect(screen.getByText(score)).toBeInTheDocument();
    expect(container.getElementsByClassName(icons.score).length).toBe(1);
    expect(screen.getByLabelText(scoreLabel)).toBeInTheDocument();
  });
  it('should render the GameStat level', () => {
    const level = 3;
    const { container } = render(<GameStat icon="level" stat={level} label={levelLabel} />);

    expect(screen.getByText(level)).toBeInTheDocument();
    expect(container.getElementsByClassName(icons.level).length).toBe(1);
    expect(screen.getByLabelText(levelLabel)).toBeInTheDocument();
  });
});
