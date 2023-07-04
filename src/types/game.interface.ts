import { gameStates, icons } from '../utils/constants.util';
import { LevelWord } from './level-word.interface';
import { Letter } from './letter.interface';

export type GameStatus = keyof typeof gameStates;

export interface GameContainerProps {
  currentWord: LevelWord,
  selectNextWord: () => void,
  isMobileDevice: boolean
}

export interface GameLettersProps {
  gameLetters?: Letter[],
  word?: string,
  updateGameLetters?: (letters: Letter[]) => void
}

export interface GameStatProps {
  icon: keyof typeof icons,
  stat: number,
  label: string
}
