import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';
import { logoText } from '../../utils/constants';

describe('Register component', () => {
  it('should render the AppHeader component', () => {
    render(<AppHeader />);
    const logo = screen.getByText(logoText);
    expect(logo).toBeInTheDocument();
  });
});
