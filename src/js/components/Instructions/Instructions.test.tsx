import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { instructionsContent } from '../../utils/constants';
import Instructions from './Instructions';

describe('Instructions componnet', () => {
  it('should render the game instructions', () => {
    const { container } = render(<Instructions />);
    instructionsContent.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
      expect(container.getElementsByClassName(item.icon).length).toBe(1);
    });
  });
});
