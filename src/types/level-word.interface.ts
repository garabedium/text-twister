import { wordStates } from '../utils/constants.util';

export type LevelWordStatus = keyof typeof wordStates;

export interface BaseLevelWord {
  id: number,
  word: string,
  zipf_value: number,
}

export interface LevelWord extends BaseLevelWord {
  status: LevelWordStatus,
}

export interface AddLevelWordAction {
  type: 'added',
  payload: LevelWord
}

export interface UpdateLevelWordStatusesAction {
  type: 'status_updated',
}

export type LevelWordsReducerAction = (
  AddLevelWordAction | UpdateLevelWordStatusesAction
);
