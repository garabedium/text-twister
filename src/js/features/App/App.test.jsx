import React from 'react';
import '@testing-library/jest-dom';
import nock from 'nock';
import { render, waitFor } from '@testing-library/react';
import { Icons, ApiRoutes } from '../../utils/constants';
import App from './App';

describe('App component', () => {
  it('should render the game instructions', async () => {
    const { container } = render(<App />);
    const icons = [
      Icons.timer_flash, Icons.funds, Icons.warning, Icons.spacebar, Icons.arrow_right,
    ];

    icons.forEach((icon) => {
      expect(container.getElementsByClassName(icon).length).toBe(1);
    });
  });
  // it('should load the play button', async () => {
  //   nock(ApiRoutes.baseUrl)
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //       'access-control-allow-credentials': 'true',
  //     })
  //     .get(ApiRoutes.levelWordRange)
  //     .reply(200, [{ word: 'texter' }]);

  //   render(<App />);

  //   await waitFor(() => {
  //     // TODO: add aria-label to button, check for button label:
  //     expect(document.getElementsByClassName(Icons.play_fill).length).toBe(1);
  //   });
  // });
});
