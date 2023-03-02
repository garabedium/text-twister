import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import {
  ApiRoutes, ZipfDefaultMin, ZipfDefaultMax, PlayButtonText,
} from '../../utils/constants';
import { nockGetRequest } from '../../utils/test-utils';
import App from './App';

describe('App component', () => {
  const playButton = () => screen.getByLabelText(PlayButtonText);
  const levelWordRequest = `${ApiRoutes.levelWordRange}/${ZipfDefaultMin}&${ZipfDefaultMax}`;

  it('should load the play button', async () => {
    nockGetRequest(levelWordRequest, [{ word: 'texter' }]);
    render(<App />);

    expect(playButton()).toBeDisabled();

    await waitFor(() => {
      expect(playButton()).toBeEnabled();
    });
  });

  it('should not load the play button', async () => {
    nockGetRequest(levelWordRequest, [{ word: '' }]);
    render(<App />);

    await waitFor(() => {
      expect(playButton()).toBeDisabled();
    });
  });
});
