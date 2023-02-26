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

export const TimeDev = 30;
export const TimeProd = 60;

export const BaseDate = Date.now();

export const LogoText = 'Text Twister';

export const IsDevEnv = (process.env.NODE_ENV === 'development');
export const IsTestEnv = (process.env.NODE_ENV === 'test');

export const MinimumGuessLength = 3;

export const Icons = {
  score: 'ri-star-fill',
  level: 'ri-funds-line',
  play_fill: 'ri-play-fill',
  timer_flash: 'ri-timer-flash-line',
  funds: 'ri-funds-line',
  warning: 'ri-error-warning-line',
  spacebar: 'ri-space',
  arrow_right: 'ri-arrow-right-line',
};

export const GameStates = {
  inactive: 'inactive', // game hasn't started, still on StartPage component
  active: 'active', // player is playing
  paused: 'paused', // player is between levels
  restart: 'restart', // player restarts from first level
};

export const WordStates = {
  current: 'current',
  next: 'next',
  used: 'used',
};

export const ApiRoutes = {
  baseUrl: IsTestEnv ? 'http://localhost:3000/api' : '/api',
  levelWordRange: '/levelWord/range/4.5&7',
  anagrams: '/levelWord/anagrams',
};
