import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { notifications } from '../../utils/constants';
import Notification from './Notification';

describe('Register Notification component', () => {
  it('should render the Notification text', () => {
    render(<Notification name="default" />);
    expect(screen.getByText(notifications.default)).toBeInTheDocument();
  });
});
