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
  updatedAt: Date,
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

// type Player = {
//   level: number,
//   levelup: boolean,
//   score: number,
//   solved: [], //// Word array
//   solvedAll: boolean,
// }
