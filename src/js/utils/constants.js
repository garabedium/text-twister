export const Notifications = {
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

export const LevelWordLength = 6;

export const ZipfDefaultMin = 4.5;
export const ZipfDefaultMax = 6.5;

export const TimeDev = 10;
export const TimeProd = 60;

export const BaseDate = Date.now();

// TODO: I18n localization
export const LogoText = 'Text Twister';
export const PlayButtonText = 'Start game';
export const PlayText = 'play';
export const BackspaceButtonText = 'Backspace';
export const ScoreLabel = 'Game score';
export const LevelLabel = 'Game level';
export const GameInputLabel = 'Guess a word...';

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
  delete: 'ri-delete-back-2-line',
};

export const GameStates = {
  inactive: 'inactive', // game hasn't started yet
  active: 'active', // player is playing
  paused: 'paused', // player is between levels
  restart: 'restart', // player restarts from first level
};

// Available states for a Level Word:
export const WordStates = {
  current: 'current',
  next: 'next',
  used: 'used',
};

// Update word status based on current status
// Left side is current status, right side is updated status
export const NextWordStates = {
  current: 'used',
  next: 'current',
  used: 'used',
};

export const ApiRoutes = {
  baseUrl: IsTestEnv ? 'http://localhost:3000/api' : '/api',
  levelWordRange: '/levelWord/range',
  anagrams: '/levelWord/anagrams',
};

export const InstructionsContent = [
  { text: 'Solve words before time runs out', icon: `${Icons.timer_flash} ri-3x` },
  { text: 'Solve the 6 letter word to go to the next level', icon: `${Icons.funds} ri-3x` },
  { text: 'Words must be a minimum of 3 letters', icon: `${Icons.warning} ri-3x` },
  { text: 'Spacebar to shuffle words', icon: `${Icons.spacebar} ri-3x` },
  { text: 'Enter to solve word', icon: `${Icons.arrow_right} ri-3x` },
];
