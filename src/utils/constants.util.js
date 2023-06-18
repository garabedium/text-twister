"use strict";
exports.__esModule = true;
exports.scoreMultiples = exports.instructionsContent = exports.apiRoutes = exports.nextwordStates = exports.wordStates = exports.gameStates = exports.icons = exports.isTestEnv = exports.isDevEnv = exports.gameInputLabel = exports.levelLabel = exports.scoreLabel = exports.backspaceButtonText = exports.playText = exports.playButtonText = exports.logoText = exports.baseDate = exports.minimumGuessLength = exports.timeProd = exports.timeDev = exports.zipfDefaultMax = exports.zipfDefaultMin = exports.levelWordLength = exports.notifications = void 0;
exports.notifications = {
    "default": 'Press Spacebar to shuffle. Press Enter to submit.',
    default_mobile: 'Tap letter to use.',
    points: 'Woohoo! Points! Keep Solving!',
    validate_dupe: 'You already solved that word!',
    validate_min: 'Words must be at least 3 letters!',
    validate_invalid: "That's not in our dictionary!",
    solved_level: 'You solved the 6 letter word! Next level solve!',
    solved_all: 'You solved all the words! Genius!',
    game_over: 'Game Over'
};
exports.levelWordLength = 6;
exports.zipfDefaultMin = 4.5;
exports.zipfDefaultMax = 6.5;
exports.timeDev = 90;
exports.timeProd = 60;
exports.minimumGuessLength = 3;
exports.baseDate = Date.now();
// TODO: I18n localization
exports.logoText = 'Text Twister';
exports.playButtonText = 'Start game';
exports.playText = 'play';
exports.backspaceButtonText = 'Backspace';
exports.scoreLabel = 'Game score';
exports.levelLabel = 'Game level';
exports.gameInputLabel = 'Guess a word...';
exports.isDevEnv = (process.env.NODE_ENV === 'development');
exports.isTestEnv = (process.env.NODE_ENV === 'test');
exports.icons = {
    score: 'ri-star-fill',
    level: 'ri-funds-line',
    play_fill: 'ri-play-fill',
    timer_flash: 'ri-timer-flash-line',
    funds: 'ri-funds-line',
    warning: 'ri-error-warning-line',
    spacebar: 'ri-space',
    arrow_right: 'ri-arrow-right-line',
    "delete": 'ri-delete-back-2-line'
};
exports.gameStates = {
    inactive: 'inactive',
    active: 'active',
    paused: 'paused',
    restart: 'restart'
};
// Available states for a Level Word:
exports.wordStates = {
    current: 'current',
    next: 'next',
    used: 'used'
};
// Update word status based on current status
// Left side is current status, right side is updated status
exports.nextwordStates = {
    current: 'used',
    next: 'current',
    used: 'used'
};
exports.apiRoutes = {
    baseUrl: exports.isTestEnv ? 'http://localhost:3000/api' : '/api',
    levelWordRange: '/level-words/zipf-range',
    anagrams: '/anagrams'
};
exports.instructionsContent = [
    { text: 'Solve words before time runs out', icon: "".concat(exports.icons.timer_flash, " ri-3x") },
    { text: 'Solve the 6 letter word to go to the next level', icon: "".concat(exports.icons.funds, " ri-3x") },
    { text: 'Words must be a minimum of 3 letters', icon: "".concat(exports.icons.warning, " ri-3x") },
    { text: 'Spacebar to shuffle words', icon: "".concat(exports.icons.spacebar, " ri-3x") },
    { text: 'Enter to solve word', icon: "".concat(exports.icons.arrow_right, " ri-3x") },
];
exports.scoreMultiples = {
    3: 10,
    4: 15,
    5: 20,
    6: 50
};
