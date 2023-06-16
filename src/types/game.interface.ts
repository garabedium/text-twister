import { gameStates, icons } from '../utils/constants.util';
import { LevelWord } from './level-word.interface';
import { Letter } from './letter.interface';

export type GameStatus = keyof typeof gameStates;

export interface GameContainerProps {
  gameStatus: GameStatus,
  currentWord: LevelWord,
  updateGameStatus: (status: GameStatus) => void,
  selectNextWord: () => void,
  isMobileDevice: boolean,
}

export interface GameLettersProps {
  isGameActive: boolean,
  gameLetters?: Letter[],
  word?: string,
  updateGameLetters?: (letters: Letter[]) => void,
}

export interface GameStatProps {
  icon: keyof typeof icons,
  stat: number,
  label: string,
}
