import React from 'react';
import { createRoot } from 'react-dom/client';
import isTouchDevice from 'is-touch-device';
import App from './features/App';

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
  <App
    isTouchDevice={isTouchDevice()}
  />,
);
