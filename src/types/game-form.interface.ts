import { Letter } from './letter.interface';
import { NotificationKey } from './notification.interface';
import { AnagramsHashMap } from './anagram.interface';

export type GameFormProps = {
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
};
