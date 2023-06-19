import { Letter } from './letter.interface';
import { AnagramsHashMap } from './anagram.interface';
import { NotificationKey } from './notification.interface';

export interface GameFormProps {
  levelWordText: string,
  gameLetters: Letter[],
  updateGameLetters: (letters: Letter[]) => void,
  updateGameNotification: (notification: NotificationKey) => void,
  usedLetters: Letter[],
  shuffleUnusedLetters: () => void,
  validateWord: (word: string) => void,
  anagrams: AnagramsHashMap,
  handleClear: () => void,
  isMobileDevice: boolean,
}
