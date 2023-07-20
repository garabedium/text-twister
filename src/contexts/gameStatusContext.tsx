import React, {
  createContext, useState, useContext, useMemo, useCallback,
} from 'react';
import { gameStates } from '../utils/constants.util';
import {
  GameStatus,
  GameStatusContextInterface,
  GameStatusProviderProps,
} from '../types/game.interface';

export const GameStatusContext = createContext<GameStatusContextInterface | undefined>(undefined);

function GameStatusProvider(props: GameStatusProviderProps) {
  const { children } = props;
  const [gameStatus, setGameStatus] = useState<GameStatus>(gameStates.inactive);
  const isGameInactive = (gameStatus === gameStates.inactive);
  const isGameActive = (gameStatus === gameStates.active);
  const isGamePaused = (gameStatus === gameStates.paused);

  const updateGameStatus = useCallback((status: GameStatus) => {
    if (status) {
      setGameStatus(status);
    }
  }, []);

  const value = useMemo(() => ({
    gameStatus, isGameInactive, isGamePaused, isGameActive, updateGameStatus,
  }), [gameStatus, isGameInactive, isGamePaused, isGameActive, updateGameStatus]);

  return (
    <GameStatusContext.Provider value={value}>
      {children}
    </GameStatusContext.Provider>
  );
}

function useGameStatus() {
  const context = useContext(GameStatusContext);

  if (context === undefined) {
    throw new Error('Incorrect provider...');
  }
  return context;
}

export { GameStatusProvider, useGameStatus };
