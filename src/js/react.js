import '../scss/app.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import isTouchDevice from 'is-touch-device';

ReactDOM.render(
  <App 
  isTouchDevice={ isTouchDevice() }
  isDevEnv={ process.env.NODE_ENV === "development" }
  nodeEnv={process.env.NODE_ENV} />,
  document.getElementById('game-root')
)