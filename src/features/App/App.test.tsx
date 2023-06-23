import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen, act,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import {
  apiRoutes, playButtonText, notifications, timeDev, gameInputLabel,
  wordStates,
} from '../../utils/constants.util';
import { LevelWord } from '../../types/level-word.interface';
import { nockGetRequest, levelWordsData, anagramsData } from '../../utils/tests.util';
import App from './App';
import { buildLevelWordZipfQuery } from '../../utils/methods.util';

describe('App component', () => {
  const playButton = () => screen.getByLabelText(playButtonText);
  const levelWord = levelWordsData[0].word;
  const usedLevelWords = levelWordsData.filter((word) => word.status !== wordStates.next);
  const levelWordRequest = (excludedWords = [] as LevelWord[]) => `${apiRoutes.levelWordRange}${buildLevelWordZipfQuery(excludedWords)}`;

  it('should load the play button', async () => {
    nockGetRequest(levelWordRequest(), levelWordsData[0]);
    render(<App />);

    expect(playButton()).toBeDisabled();

    await waitFor(() => {
      expect(playButton()).toBeEnabled();
    });
  });

  it('should not load the play button', async () => {
    nockGetRequest(levelWordRequest(), {
      id: 9, word: '', zipf_value: 4, status: 'current',
    });
    render(<App />);

    await waitFor(() => {
      expect(playButton()).toBeDisabled();
    });
  });

  it('should show a Game Over notification if the user does not solve the level word', async () => {
    jest.useFakeTimers();
    nockGetRequest(levelWordRequest(), levelWordsData[0]);
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, anagramsData);
    render(<App />);

    await waitFor(async () => {
      expect(playButton()).toBeEnabled();
      await user.click(playButton());
    });

    expect(await screen.findByText(notifications.default)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime((timeDev + 1) * 1000));
    expect(await screen.findByText(notifications.game_over)).toBeInTheDocument();
  });

  it('should prompt the user to continue to the next level when the user solves the current level word', async () => {
    jest.useFakeTimers();
    nockGetRequest(levelWordRequest(), levelWordsData[0]);
    nockGetRequest(levelWordRequest(usedLevelWords), levelWordsData[1]);
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, anagramsData);
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

      await user.click(submit);
      expect(await screen.findByText(notifications.points)).toBeInTheDocument();
    });

    act(() => jest.advanceTimersByTime((timeDev + 1) * 1000));
    expect(await screen.findByText(notifications.solved_level)).toBeInTheDocument();
    expect(await screen.findByText('Next Level', { selector: 'button' })).toBeInTheDocument();
  });
});
