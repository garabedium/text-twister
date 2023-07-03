import { GameStatus } from './game.interface';

export interface BaseAnagram {
  id: number,
  anagram: string,
  level_word: string
}

export interface Anagram extends BaseAnagram {
  solved: boolean
}

export interface AnagramsHashMap {
  [key: string]: {
    [key: string]: Anagram
  }
}

export interface AnagramsProps {
  gameStatus: GameStatus,
  anagrams: AnagramsHashMap,
  levelWordText: string,
}

export interface AddAnagramsAction {
  type: 'added',
  payload: AnagramsHashMap
}

export interface UpdateSolvedAnagramAction {
  type: 'solved_updated',
  payload: AnagramsHashMap
}

// export interface UpdateAnagramsAction {
//   type: 'status_updated',
// }

// export type AnagramsReducerState = (AnagramsHashMap | Record<string, never>);

export type AnagramsReducerAction = (
  AddAnagramsAction | UpdateSolvedAnagramAction
);
