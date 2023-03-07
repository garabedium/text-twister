import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  GameStates, Notifications, ApiRoutes, GameInputLabel,
} from '../../utils/constants';
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
      const anagrams = container.getElementsByClassName('anagram');
      expect(anagrams.length).toEqual(AnagramsData.length);
    });
  });

  it('should not display the solved level word to the user', async () => {
    nockGetRequest(`${ApiRoutes.anagrams}/${LevelWordsData[0].word}`, AnagramsData);
    const { container } = renderGameContainer();
    const { word } = LevelWordsData[0];
    const letters = container.getElementsByClassName('letters')[0].textContent;
    expect(letters).not.toEqual(word);

    const shuffleBtn = screen.getByText('Shuffle', { selector: 'button' });
    await act(async () => user.click(shuffleBtn));
    const shuffledLetters = container.getElementsByClassName('letters')[0].textContent;
    expect(shuffledLetters).not.toEqual(letters);
  });

  it('should disable unused letters that the user types', async () => {
    nockGetRequest(`${ApiRoutes.anagrams}/${LevelWordsData[0].word}`, AnagramsData);
    renderGameContainer();

    const guess = 'real';

    await waitFor(() => {
      const input = screen.getByLabelText(GameInputLabel);
      user.type(input, guess);
      expect(input).toHaveValue(guess);

      const letters = document.getElementsByClassName('letter --used');

      for (let index = 0; index < letters.length; index += 1) {
        const testId = letters[index].getAttribute('data-testid');
        expect(screen.getByTestId(testId)).toBeDisabled();
      }
    });
  });

  it('should disable an unused letter that the user clicks', async () => {
    nockGetRequest(`${ApiRoutes.anagrams}/${LevelWordsData[0].word}`, AnagramsData);
    renderGameContainer();

    const letterButton = screen.getByText(LevelWordsData[0].word[0], { selector: 'button' });

    user.click(letterButton);
    await act(async () => user.click(letterButton));
    expect(letterButton).toBeDisabled();
  });
});
