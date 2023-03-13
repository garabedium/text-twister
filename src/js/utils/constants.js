export const notifications = {
  default: { text: 'Press Spacebar to shuffle. Press Enter to submit.' },
  default_mobile: { text: 'Tap letter to use.' },
  points: { text: 'Woohoo! Points! Keep Solving!', icon: 'star' },
  validate_dupe: { text: 'You already solved that word!', icon: 'x' },
  validate_min: { text: 'Words must be at least 3 letters!', icon: 'x' },
  validate_invalid: { text: "That's not in our dictionary!", icon: 'x' },
  solved_level: { text: 'You solved the 6 letter word! Next level solve!', icon: 'x' },
  solved_all: { text: 'You solved all the words! Genius!' },
  game_over: { text: 'Game Over' },
};

export const levelWordLength = 6;

export const zipfDefaultMin = 4.5;
export const zipfDefaultMax = 6.5;

export const timeDev = 30;
export const timeProd = 60;

export const baseDate = new Date(Date.now());

// TODO: I18n localization
export const logoText = 'Text Twister';
export const playButtonText = 'Start game';
export const playText = 'play';
export const backspaceButtonText = 'Backspace';
export const scoreLabel = 'Game score';
export const levelLabel = 'Game level';
export const gameInputLabel = 'Guess a word...';

export const isDevEnv = (process.env.NODE_ENV === 'development');
export const isTestEnv = (process.env.NODE_ENV === 'test');

export const minimumGuessLength = 3;

export const icons = {
  score: 'ri-star-fill',
  level: 'ri-funds-line',
  play_fill: 'ri-play-fill',
  timer_flash: 'ri-timer-flash-line',
  funds: 'ri-funds-line',
  warning: 'ri-error-warning-line',
  spacebar: 'ri-space',
  arrow_right: 'ri-arrow-right-line',
  delete: 'ri-delete-back-2-line',
};

export const gameStates = {
  inactive: 'inactive', // game hasn't started yet
  active: 'active', // player is playing
  paused: 'paused', // player is between levels
  restart: 'restart', // player restarts from first level
};

// Available states for a Level Word:
export const wordStates = {
  current: 'current',
  next: 'next',
  used: 'used',
};

// Update word status based on current status
// Left side is current status, right side is updated status
export const nextwordStates = {
  current: 'used',
  next: 'current',
  used: 'used',
};

export const apiRoutes = {
  baseUrl: isTestEnv ? 'http://localhost:3000/api' : '/api',
  levelWordRange: '/levelWord/range',
  anagrams: '/levelWord/anagrams',
};

export const instructionsContent = [
  { text: 'Solve words before time runs out', icon: `${icons.timer_flash} ri-3x` },
  { text: 'Solve the 6 letter word to go to the next level', icon: `${icons.funds} ri-3x` },
  { text: 'Words must be a minimum of 3 letters', icon: `${icons.warning} ri-3x` },
  { text: 'Spacebar to shuffle words', icon: `${icons.spacebar} ri-3x` },
  { text: 'Enter to solve word', icon: `${icons.arrow_right} ri-3x` },
];
