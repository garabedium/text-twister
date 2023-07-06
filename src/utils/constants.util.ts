export const notifications = {
  default: 'Press Spacebar to shuffle. Press Enter to submit.',
  default_mobile: 'Tap letter to use.',
  points: 'Woohoo! Points! Keep Solving!',
  validate_dupe: 'You already solved that word!',
  validate_min: 'Words must be at least 3 letters!',
  validate_invalid: "That's not in our dictionary!",
  solved_level: 'You solved the 6 letter word! Next level solve!',
  solved_all: 'You solved all the words! Genius!',
  game_over: 'Game Over',
} as const;

export const levelWordLength = 6 as const;

export const zipfDefaultMin = 4.5 as const;
export const zipfDefaultMax = 6.5 as const;

export const timeDev = 10 as const;
export const timeProd = 60 as const;

export const minimumGuessLength = 3 as const;

export const baseDate = Date.now();

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
} as const;

export const gameStates = {
  inactive: 'inactive', // game hasn't started yet
  active: 'active', // player is playing
  paused: 'paused', // player is between levels
  restart: 'restart', // player restarts from first level
} as const;

// Available states for a Level Word:
export const wordStates = {
  current: 'current',
  next: 'next',
  used: 'used',
} as const;

// Update word status based on current status
// Left side is current status, right side is updated status
export const nextwordStates = {
  current: 'used',
  next: 'current',
  used: 'used',
} as const;

export const apiRoutes = {
  baseUrl: isTestEnv ? 'http://localhost:3000/api' : '/api',
  levelWordRange: '/levelWord/zipf-range',
  anagrams: '/levelWord/anagrams',
} as const;

export const instructionsContent = [
  { text: 'Solve words before time runs out', icon: `${icons.timer_flash} ri-3x` },
  { text: 'Solve the 6 letter word to go to the next level', icon: `${icons.funds} ri-3x` },
  { text: 'Words must be a minimum of 3 letters', icon: `${icons.warning} ri-3x` },
  { text: 'Spacebar to shuffle words', icon: `${icons.spacebar} ri-3x` },
  { text: 'Enter to solve word', icon: `${icons.arrow_right} ri-3x` },
] as const;

export const scoreMultiples = {
  3: 10,
  4: 15,
  5: 20,
  6: 50,
} as const;
