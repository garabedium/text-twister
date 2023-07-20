import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { playButtonText, playText } from '../../utils/constants.util';
import StartPage from './StartPage';
import { StartPageProps } from '../../types/start-page.interface';
import { GameStatusContext } from '../../providers/gameStatusContext';
import { activeGameState, inactiveGameState } from '../../utils/tests.util';
import { GameStatusContextInterface } from '../../types/game.interface';

describe('StartPage component', () => {
  const playButton = () => screen.getByLabelText(playButtonText);

  const renderStartPage = (
    props: StartPageProps,
    providerValues:GameStatusContextInterface = activeGameState,
  ) => render(
    <GameStatusContext.Provider value={providerValues}>
      <StartPage {...props} />
    </GameStatusContext.Provider>,
  );

  it('displays a disabled start game button if no level word is present', () => {
    const props = { hasLevelWord: false };
    renderStartPage(props);
    expect(playButton()).toBeDisabled();
  });

  it('displays a start game button if level word is present', async () => {
    const props = { hasLevelWord: true };
    renderStartPage(props);
    await user.click(playButton());
    expect(activeGameState.updateGameStatus).toHaveBeenCalledTimes(1);
    expect(playButton()).toBeEnabled();
  });

  it('displays the game word: play', () => {
    const props = { hasLevelWord: true };
    const { container } = renderStartPage(props, inactiveGameState);
    expect(container.getElementsByClassName('letters')[0].textContent).toBe(playText);
  });
});
