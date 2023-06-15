export interface BaseLevelWord {
  id: number,
  word: string,
  zipf_value: number,
}

export interface LevelWord extends BaseLevelWord {
  status: string,
}

export type LevelWordRequestZipfRange = {
  zipf: {
    gte: string,
    lte: string
  },
  exclude?: string,
};

export type EmptyObjectRecord = object;
