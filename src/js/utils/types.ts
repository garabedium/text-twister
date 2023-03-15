export type GameStatus = 'inactive' | 'active' | 'paused' | 'restart';
export type WordStatus = 'current' | 'next' | 'used';

export type LevelWord = {
  id: number,
  word: string,
  zipf_value: number,
  status: WordStatus
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

export type NotificationProps = {
  text: string
};

export type GameContainerProps = {
  gameStatus: GameStatus,
  currentWord: LevelWord,
  updateGameStatus: (status: GameStatus) => void,
  selectNextWord: () => LevelWord[],
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
  updateGameNotification: (notification: NotificationType) => void,
  usedLetters: Letter[],
  shuffleUnusedLetters: () => void,
  validateWord: (word: string) => void,
  anagrams: AnagramsType,
  handleClear: () => void,
  isMobileDevice: boolean,
};

export type GameLettersDisplayProps = {
  isGameActive: boolean,
  gameLetters?: Letter[],
  word?: string,
  updateGameLetters?: (letters: Letter[]) => void,
};

export type IconKeys = {
  score: string,
  level: string,
  play_fill: string,
  timer_flash: string,
  funds: string,
  warning: string,
  spacebar: string,
  arrow_right: string,
  delete: string,
};

export type GameStatProps = {
  icon: keyof IconKeys,
  stat: number,
  label: string,
};

export type TimerInterval = ReturnType<typeof setInterval> | undefined;

// type Player = {
//   level: number,
//   levelup: boolean,
//   score: number,
//   solved: [], //// Word array
//   solvedAll: boolean,
// }
