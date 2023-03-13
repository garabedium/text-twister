import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen, act,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import {
  apiRoutes, zipfDefaultMin, zipfDefaultMax, playButtonText, notifications, timeDev, gameInputLabel,
} from '../../utils/constants';
import { nockGetRequest, LevelWordsData, AnagramsData } from '../../utils/test-utils';
import App from './App';

describe('App component', () => {
  const playButton = () => screen.getByLabelText(playButtonText);
  const levelWord = LevelWordsData[0].word;
  const levelWordRequest = `${apiRoutes.levelWordRange}/${zipfDefaultMin}&${zipfDefaultMax}`;
  const levelWordRequestExclude = `${levelWordRequest}?&exclude=${levelWord}`;

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
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    render(<App />);

    await waitFor(async () => {
      expect(playButton()).toBeEnabled();
      await user.click(playButton());
    });

    expect(await screen.findByText(notifications.default.text)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime((timeDev + 1) * 1000));
    expect(await screen.findByText(notifications.game_over.text)).toBeInTheDocument();
  });

  it('should prompt the user to continue to the next level when the user solves the current level word', async () => {
    jest.useFakeTimers();
    nockGetRequest(levelWordRequest, [LevelWordsData[0]]);
    nockGetRequest(levelWordRequestExclude, [LevelWordsData[1]]);
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    render(<App />);

    await waitFor(async () => {
      expect(playButton()).toBeEnabled();
      await user.click(playButton());
    });

    await waitFor(async () => {
      const input = screen.getByLabelText(gameInputLabel);
      const submit = screen.getByText('Submit', { selector: 'button' });

      await user.type(input, levelWord);

      expect(input).toHaveValue(levelWord);
      user.click(submit);
      expect(await screen.findByText(notifications.points.text)).toBeInTheDocument();
    });

    act(() => jest.advanceTimersByTime((timeDev + 1) * 1000));
    expect(await screen.findByText(notifications.solved_level.text)).toBeInTheDocument();
    expect(await screen.findByText('Next Level', { selector: 'button' })).toBeInTheDocument();
  });
});
