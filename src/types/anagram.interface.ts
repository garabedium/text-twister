export interface BaseAnagram {
  id: number,
  anagram: string,
  level_word: string,
}

export interface Anagram extends BaseAnagram {
  solved: boolean
}
