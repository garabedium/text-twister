import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { GameStates, Notifications, ApiRoutes } from '../../utils/constants';
import { LevelWordsData, AnagramsData, nockGetRequest } from '../../utils/test-utils';
import GameContainer from './GameContainer';

describe('GameContainer component', () => {
  const renderGameContainer = () => render(<GameContainer
    gameStatus={GameStates.active}
    currentWord={LevelWordsData[0]}
    selectNextWord={() => null}
    updateGameStatus={() => null}
  />);

  it('should display the game controls', () => {
    renderGameContainer();
    const shuffleBtn = screen.getByText('Shuffle', { selector: 'button' });
    const submitBtn = screen.getByText('Submit', { selector: 'button' });
    expect(shuffleBtn).toBeEnabled();
    expect(submitBtn).toBeDisabled();
  });

  it('should display the default notification', () => {
    renderGameContainer();
    const defaultNotification = screen.getByText(Notifications.default.text);
    expect(defaultNotification).toBeInTheDocument();
  });

  it('should fetch the level word anagrams', async () => {
    nockGetRequest(`${ApiRoutes.anagrams}/${LevelWordsData[0].word}`, AnagramsData);
    const { container } = renderGameContainer();

    await waitFor(() => {
      const anagramsCount = container.getElementsByClassName('anagram');
      expect(anagramsCount.length).toEqual(AnagramsData.length);
    });
  });
});
