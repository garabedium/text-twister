import React, { useEffect } from 'react';
import '../../scss/app.scss';
import GameStart from '../GameStart/GameStart';
import { GameStatusProvider } from '../../providers/gameStatusContext';
import AppHeader from '../../components/AppHeader/AppHeader';

function App() {
  const loadBodyClass = () => {
    setTimeout(() => {
      document.body.classList.add('--react-loaded');
    }, 250);
  };

  useEffect(() => {
    loadBodyClass();
  }, []);

  return (
    <>
      <AppHeader />
      <div className="app-container">
        <GameStatusProvider>
          <GameStart />
        </GameStatusProvider>
      </div>
    </>
  );
}

export default App;
