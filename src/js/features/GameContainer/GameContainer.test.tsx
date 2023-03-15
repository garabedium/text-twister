import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  gameStates, notifications, apiRoutes, gameInputLabel, backspaceButtonText,
} from '../../utils/constants';
import { LevelWordsData, AnagramsData, nockGetRequest } from '../../utils/test-utils';
import GameContainer from './GameContainer';
import { GameStatus, LevelWord } from '../../utils/types';

describe('GameContainer component', () => {
  const levelWord = LevelWordsData[0].word;
  let mobileDevice = false;

  const renderGameContainer = () => render(
    <GameContainer
      gameStatus={gameStates.active as GameStatus}
      currentWord={LevelWordsData[0] as LevelWord}
      selectNextWord={jest.fn()}
      updateGameStatus={jest.fn()}
      isMobileDevice={mobileDevice}
    />,
  );

  it('should display the game controls', () => {
    renderGameContainer();
    const shuffleBtn = screen.getByText('Shuffle', { selector: 'button' });
    const submitBtn = screen.getByText('Submit', { selector: 'button' });
    expect(shuffleBtn).toBeEnabled();
    expect(submitBtn).toBeDisabled();
  });

  it('should display the default notification', () => {
    renderGameContainer();
    const defaultNotification = screen.getByText(notifications.default);
    expect(defaultNotification).toBeInTheDocument();
  });

  it('should fetch the level word anagrams', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    const { container } = renderGameContainer();

    await waitFor(() => {
      const anagrams = container.getElementsByClassName('anagram');
      expect(anagrams.length).toEqual(AnagramsData.length);
    });
  });

  it('should not display the solved level word to the user', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
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
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    renderGameContainer();

    const guess = 'real';

    await waitFor(() => {
      const input = screen.getByLabelText(gameInputLabel);
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
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    renderGameContainer();

    const letterButton = screen.getByText(levelWord[0], { selector: 'button' });

    user.click(letterButton);
    await act(async () => user.click(letterButton));
    expect(letterButton).toBeDisabled();
  });

  it('should display a notification if the user submits a guess that does not meet the minimum required length', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    renderGameContainer();

    const guess = levelWord.substring(0, 2);

    await waitFor(() => {
      const input = screen.getByLabelText(gameInputLabel);
      user.type(input, levelWord.substring(0, 1));
      user.type(input, levelWord.substring(1, 2));
      user.keyboard('{enter}');

      expect(input).toHaveValue(guess);
      expect(screen.getByText(notifications.validate_min)).toBeInTheDocument();
    });
  });

  it('should display a notification if the user submits an invalid word', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    renderGameContainer();

    const guess = 'lly';

    await waitFor(async () => {
      const input = screen.getByLabelText(gameInputLabel);
      const submit = screen.getByText('Submit', { selector: 'button' });

      await user.type(input, guess);
      expect(input).toHaveValue(guess);
      user.click(submit);

      expect(screen.getByText(notifications.validate_invalid)).toBeVisible();
    });
  });

  it('should display a notification if the user solves a valid word', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    renderGameContainer();

    const guess = 'are';

    await waitFor(async () => {
      const input = screen.getByLabelText(gameInputLabel);
      const submit = screen.getByText('Submit', { selector: 'button' });

      await user.type(input, guess);

      expect(input).toHaveValue(guess);
      user.click(submit);
      expect(screen.getByText(notifications.points)).toBeInTheDocument();
    });
  });

  it('should hide the input on a mobile device and display a backspace button', async () => {
    nockGetRequest(`${apiRoutes.anagrams}/${levelWord}`, AnagramsData);
    mobileDevice = true;
    renderGameContainer();

    const guess = 'are';

    await waitFor(async () => {
      const input = screen.queryByLabelText(gameInputLabel);
      const backspace = screen.getByLabelText(backspaceButtonText);
      expect(input).not.toBeInTheDocument();
      expect(backspace).toBeInTheDocument();

      user.click(screen.getByText(guess[0], { selector: 'button' }));
      user.click(screen.getByText(guess[1], { selector: 'button' }));
      user.click(screen.getByText(guess[2], { selector: 'button' }));

      expect(screen.getByText(guess)).toBeInTheDocument();

      user.click(backspace);
      expect(await screen.findByText(guess.substring(0, 2))).toBeInTheDocument();
    });
  });
});
