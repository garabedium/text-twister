import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './containers/App'
import isTouchDevice from 'is-touch-device';

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
  <App
    isTouchDevice={isTouchDevice()}
    isDevEnv={process.env.NODE_ENV === "development"}
    nodeEnv={process.env.NODE_ENV} 
  />  
);