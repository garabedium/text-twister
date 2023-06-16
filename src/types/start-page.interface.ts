import { GameStatus } from './game.interface';

export type StartPageProps = {
  updateGameStatus: (status: GameStatus) => void,
  hasLevelWord: boolean
};
