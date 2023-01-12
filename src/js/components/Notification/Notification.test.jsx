import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Notification from './Notification';

describe('Register Notification component', () => {
  it('should render the Notification text', () => {
    const text = 'Lorem ipsum dolum';
    render(<Notification text={text} />);
    const notification = screen.getByText(text);
    expect(notification).toBeInTheDocument();
  });
});
