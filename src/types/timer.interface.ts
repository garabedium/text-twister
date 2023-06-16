import { GameStatus } from './game.interface';

export type TimerProps = {
  gameStatus: GameStatus,
  updateGameStatus: (status: GameStatus) => void,
  restartGame: () => void,
};

export type TimerInterval = ReturnType<typeof setInterval> | undefined;
