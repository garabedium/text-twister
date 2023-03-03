import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Icons, ScoreLabel, LevelLabel } from '../../utils/constants';
import GameStat from './GameStat';

describe('Register GameStat component', () => {
  it('should render the GameStat score', () => {
    const score = 100;
    const { container } = render(<GameStat icon="score" stat={score} label={ScoreLabel} />);

    expect(screen.getByText(score)).toBeInTheDocument();
    expect(container.getElementsByClassName(Icons.score).length).toBe(1);
    expect(screen.getByLabelText(ScoreLabel)).toBeInTheDocument();
  });
  it('should render the GameStat level', () => {
    const level = 3;
    const { container } = render(<GameStat icon="level" stat={level} label={LevelLabel} />);

    expect(screen.getByText(level)).toBeInTheDocument();
    expect(container.getElementsByClassName(Icons.level).length).toBe(1);
    expect(screen.getByLabelText(LevelLabel)).toBeInTheDocument();
  });
});
