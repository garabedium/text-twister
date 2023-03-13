export type GameStatus = 'inactive' | 'active' | 'paused' | 'restart';
export type WordStatus = 'current' | 'next' | 'used';

export type LevelWord = {
  id: number,
  word: string,
  zipf_value: number,
  status: WordStatus
}

export type Anagram = {
  id: number,
  anagram: string,
  level_word: string,
  solved: boolean,
}

// // type Notification = {} // should be a string

// type Player = {
//   level: number,
//   levelup: boolean,
//   score: number,
//   solved: [], //// Word array
//   solvedAll: boolean,
// }

// type GameWord = {
//   anagrams: [], // Anagram array
//   current: string,
//   status: 'current','used','next'
//   letters: Letter[] // Letter array,
// }


// type Letter = {
//   id: number,
//   char: string,
//   updatedAt: Date,
//   used: boolean,
// }

// // type Words - Word array
