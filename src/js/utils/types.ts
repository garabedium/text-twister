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

export type NotificationType = {
  text: string,
  icon?: string,
};

export type ButtonProps = {
  className?: string,
  text?: string,
  icon?: string
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

// type Player = {
//   level: number,
//   levelup: boolean,
//   score: number,
//   solved: [], //// Word array
//   solvedAll: boolean,
// }
