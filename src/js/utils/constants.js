export const Notifications = {
  default: { text: 'Press Spacebar to shuffle. Press Enter to submit.' },
  default_mobile: { text: 'Tap letters to use.' },
  points: { text: 'Woohoo! Points! Keep Solving!', icon: 'star' },
  validate_dupe: { text: 'You already solved that word!', icon: 'x' },
  validate_min: { text: 'Words must be at least 3 letters!', icon: 'x' },
  validate_invalid: { text: "That's not in our dictionary!", icon: 'x' },
  solved_level: { text: 'You solved the 6 letter word! Next level solve!', icon: 'x' },
  solved_all: { text: 'You solved all the words! Genius!' },
  game_over: { text: 'Game Over' },
};

export const LevelWordLength = 6;

export const ZipfMin = 4.5;
export const ZipfMax = 7;

export const TimerDev = 150;
export const TimerProd = 60;

export const BaseDate = Date.now();

export const LogoText = 'Text Twister';

export const IsDevEnv = process.env.NODE_ENV;
