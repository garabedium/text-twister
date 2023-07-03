import React, { useState } from 'react';

const GameStatusContext = React.createContext();

function GameStatusProvider({ children }) {
  const [gameStatus, setGameStatus] = useState('inactive');
  const value = { gameStatus, setGameStatus}
  return <GameStatusContext.Provider value={value}>{children}</GameStatusContext.Provider>
}

function useGameStatus() {
  const context = React.useContext(GameStatusContext)
  if (context === undefined){
    throw new Error("Incorrect provider..."); 
  }
  return context;
}

export {GameStatusProvider, useGameStatus}