import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ResetGame } from '../../utils/test-utils';
import { Icons } from '../../utils/constants';
import Timer from './Timer';

describe('Timer component', () => {
  it('should display a reset button when the game is reset', () => {
    const { container } = render(
      <Timer game={ResetGame} updateGameState={jest.fn()} />,
    );
    expect(container.getElementsByClassName(Icons.play_fill).length).toBe(1);
  });
});
