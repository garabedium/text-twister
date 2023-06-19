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

// export interface AnagramProps {
// }
