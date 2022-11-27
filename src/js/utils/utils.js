// Take in a word and shuffle the letters via Fisher-Yates algorithm
export function shuffleLetters(string, solvedWord){
  // remove next line:
  // let arr = (string) ? string.split('') : this.state.word.letters.filter(obj => { return !obj.used }).map(obj => { return obj.char })
  const letters = string.split('');
  const original = letters.join('');
  let shuffled = '';

  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }

  shuffled = letters.join('');

  // Don't show the solved word or the same shuffled sequence:
  if (shuffled.length > 1 && (shuffled === solvedWord || shuffled === original)) {
    return shuffleLetters(string)
  }

  return shuffled  
}