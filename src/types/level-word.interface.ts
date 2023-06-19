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
