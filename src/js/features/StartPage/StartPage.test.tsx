import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { playButtonText, playText } from '../../utils/constants';
import StartPage from './StartPage';

describe('StartPage component', () => {
  const playButton = () => screen.getByLabelText(playButtonText);
  it('displays a disabled start game button if no level word is present', () => {
    render(<StartPage hasLevelWord={false} updateGameStatus={() => null} />);
    expect(playButton()).toBeDisabled();
  });
  it('displays a start game button if level word is present', () => {
    render(<StartPage hasLevelWord updateGameStatus={() => null} />);
    expect(playButton()).toBeEnabled();
  });
  it('displays the game word: play', () => {
    const { container } = render(<StartPage hasLevelWord updateGameStatus={() => null} />);
    expect(container.getElementsByClassName('letters')[0].textContent).toBe(playText);
  });
});
