import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BackspaceButtonText } from '../../utils/constants';
import GuessMobile from './GuessMobile';

describe('GuessMobile component', () => {
  it("displays the user's guess text", () => {
    const userGuessText = 'mobile';
    const { container } = render(
      <GuessMobile userGuess={userGuessText} handleBackspace={() => null} />,
    );
    const text = container.getElementsByClassName('mobile-letters')[0].textContent;
    const backspaceButton = screen.getByLabelText(BackspaceButtonText);
    expect(text).toBe(userGuessText);
    expect(backspaceButton).toBeEnabled();
  });
  it('disables the backspace button if no guess text is present', () => {
    render(<GuessMobile userGuess="" handleBackspace={() => null} />);
    const backspaceButton = screen.getByLabelText(BackspaceButtonText);
    expect(backspaceButton).toBeDisabled();
  });
});
