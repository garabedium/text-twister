import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Icons } from '../../utils/constants';
import GameStat from './GameStat';

describe('Register GameStat component', () => {
  it('should render the GameStat score', () => {
    const value = 100;
    const { container } = render(<GameStat icon="score" stat={value} />);
    const score = screen.getByText(value);
    expect(score).toBeInTheDocument();
    expect(container.getElementsByClassName(Icons.score).length).toBe(1);
  });
  it('should render the GameStat level', () => {
    const value = 3;
    const { container } = render(<GameStat icon="level" stat={value} />);
    const level = screen.getByText(value);
    expect(level).toBeInTheDocument();
    expect(container.getElementsByClassName(Icons.level).length).toBe(1);
  });
});
