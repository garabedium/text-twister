export interface BaseLevelWord {
  id: number,
  word: string,
  zipf_value: number,
}

export interface LevelWord extends BaseLevelWord {
  status: string,
}
