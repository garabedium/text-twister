import {
  notifications, scoreMultiples, icons, wordStates, gameStates,
} from './constants';

export type GameStatus = keyof typeof gameStates;
export type LevelWordStatus = keyof typeof wordStates;

export type LevelWord = {
  id: number,
  word: string,
  zipf_value: number,
  status: LevelWordStatus
};

export type Anagram = {
  id: number,
  anagram: string,
  level_word: string,
  solved: boolean,
};

export type Letter = {
  id: number,
  char: string,
  updatedAt: number,
  used: boolean,
};

export type AnagramsType = {
  [key: string]: { [key: string]: Anagram }
};

export type NotificationKey = keyof typeof notifications;

export type NotificationProps = {
  name: NotificationKey;
};

export type GameContainerProps = {
  gameStatus: GameStatus,
  currentWord: LevelWord,
  updateGameStatus: (status: GameStatus) => void,
  selectNextWord: () => void,
  isMobileDevice: boolean,
};

export type ButtonProps = {
  className?: string,
  text?: string,
  icon?: string
};

export type TextInputProps = {
  className?: string,
};

export type TimerProps = {
  gameStatus: GameStatus,
  updateGameStatus: (status: GameStatus) => void,
  restartGame: () => void,
};

export type StartPageProps = {
  updateGameStatus: (status: GameStatus) => void,
  hasLevelWord: boolean
};

export type GuessMobileProps = {
  userGuess: string,
  handleBackspace: () => void;
};

export type AnagramsProps = {
  gameStatus: GameStatus,
  anagrams: AnagramsType,
  levelWordText: string,
};

export type GameFormProps = {
  levelWordText: string,
  gameLetters: Letter[],
  updateGameLetters: (letters: Letter[]) => void,
  updateGameNotification: (notification: NotificationKey) => void,
  usedLetters: Letter[],
  shuffleUnusedLetters: () => void,
  validateWord: (word: string) => void,
  anagrams: AnagramsType,
  handleClear: () => void,
  isMobileDevice: boolean,
};

export type GameLettersProps = {
  isGameActive: boolean,
  gameLetters?: Letter[],
  word?: string,
  updateGameLetters?: (letters: Letter[]) => void,
};

export type GameStatProps = {
  icon: keyof typeof icons,
  stat: number,
  label: string,
};

export type TimerInterval = ReturnType<typeof setInterval> | undefined;

export type ShuffleLetters = () => ShuffleLetters | string;

export type ScoreWordLengthKey = keyof typeof scoreMultiples;

export type ApiResponse<T> = Promise<T>;