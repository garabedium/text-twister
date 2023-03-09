import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen, act, findByLabelText,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import {
  ApiRoutes, ZipfDefaultMin, ZipfDefaultMax, PlayButtonText, Notifications, TimeDev,
} from '../../utils/constants';
import { nockGetRequest, LevelWordsData, AnagramsData } from '../../utils/test-utils';
import App from './App';

describe('App component', () => {
  const playButton = () => screen.getByLabelText(PlayButtonText);
  const levelWordRequest = `${ApiRoutes.levelWordRange}/${ZipfDefaultMin}&${ZipfDefaultMax}`;

  it('should load the play button', async () => {
    nockGetRequest(levelWordRequest, LevelWordsData);
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

  it('should show a Game Over notification if the user does not solve the level word', async () => {
    jest.useFakeTimers();

    nockGetRequest(levelWordRequest, LevelWordsData);
    nockGetRequest(`${ApiRoutes.anagrams}/${LevelWordsData[0].word}`, AnagramsData);

    render(<App />);

    await waitFor(async () => {
      expect(playButton()).toBeEnabled();
      await user.click(playButton());
    });

    await waitFor(() => {
      expect(screen.getByText(Notifications.default.text)).toBeInTheDocument();
    });

    act(() => jest.advanceTimersByTime((TimeDev + 1) * 1000));

    await waitFor(() => {
      expect(screen.getByText(Notifications.game_over.text)).toBeInTheDocument();
    });
  });
});
