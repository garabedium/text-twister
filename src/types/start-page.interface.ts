import { GameStatus } from './game.interface';

export interface StartPageProps {
  updateGameStatus: (status: GameStatus) => void,
  hasLevelWord: boolean
}
