import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PlayButtonText, PlayText } from '../../utils/constants';
import StartPage from './StartPage';

describe('StartPage component', () => {
  it('displays a disabled start game button if no level word is present', () => {
    render(<StartPage hasLevelWord={false} updateGameStatus={() => null} />);
    const playButton = screen.getByLabelText(PlayButtonText);
    expect(playButton).toBeDisabled();
  });
  it('displays a start game button if level word is present', () => {
    render(<StartPage hasLevelWord updateGameStatus={() => null} />);
    const playButton = screen.getByLabelText(PlayButtonText);
    expect(playButton).toBeEnabled();
  });
  it('displays the game word: play', () => {
    const { container } = render(<StartPage hasLevelWord updateGameStatus={() => null} />);
    expect(container.getElementsByClassName('word')[0].textContent).toBe(PlayText);
  });
});
