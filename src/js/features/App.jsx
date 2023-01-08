import React, { Component } from 'react';

import '../../scss/app.scss';
import { shuffleLetters } from '../utils/utils';
import {
  BaseDate,
  Notifications,
  ZipfMin,
  ZipfMax,
  TimerDev,
  TimerProd,
  LevelWordLength,
  IsDevEnv,
} from '../utils/constants';

import Anagrams from '../components/Anagrams/Anagrams';
import GameContainer from './GameContainer/GameContainer';
import StartPage from './StartPage/StartPage';
import AppHeader from '../components/AppHeader/AppHeader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerTime: IsDevEnv ? TimerDev : TimerProd,
      timerStart: IsDevEnv ? TimerDev : TimerProd,
      isMobile: this.props.isTouchDevice,
      notification: {},
      game: {
        active: false,
        started: false,
        reset: false,
      },
      player: {
        score: 0,
        level: 1,
        levelup: false,
        solved: [],
        solvedAll: false,
      },
      words: [],
      word: {
        current: '',
        letters: [],
        anagrams: [],
      },
    };
    // Methods:
    this.initGame = this.initGame.bind(this);
    this.reactLoaded = this.reactLoaded.bind(this);
    this.getWords = this.getWords.bind(this);
    this.lazyLoadWords = this.lazyLoadWords.bind(this);
    this.getWordAnagrams = this.getWordAnagrams.bind(this);
    this.validateWord = this.validateWord.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.updateShuffledState = this.updateShuffledState.bind(this);
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setNotification = this.setNotification.bind(this);
  }

  componentDidMount() {
    console.log('*** app mounted ***');
    this.reactLoaded();
    this.initGame();
  }

  reactLoaded() {
    setTimeout(() => {
      document.body.classList.add('--react-loaded');
    }, 250);
  }

  initGame() {
    this.getWords().then((response) => {
      const newState = { ...this.state };
      newState.notification = Notifications[(this.state.isMobile) ? 'default_mobile' : 'default'];
      newState.words = response;
      newState.word.current = this.selectWord(response);
      const shuffledWord = shuffleLetters(newState.word.current, this.state.word.current).split('');
      // Build the letter objects that will maintain letter 'state':
      newState.word.letters = shuffledWord.map((char, i) => ({
        id: i + 1, char, used: false, updatedAt: BaseDate,
      }));
      this.setState(newState, this.getWordAnagrams());
    });
  }

  getWords(params) {
    console.log('*** get words ***');
    let url = `/api/levelWord/range/${ZipfMin}&${ZipfMax}`;

    if (params && params.exclude) {
      const query = params.exclude.map((obj) => `&exclude=${obj.word}`).join('');
      url += query;
    }

    return new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        if (response.ok) {
          resolve(response.json());
        }
      });
    });
  }

  lazyLoadWords() {
    const usedWords = this.state.words.filter((obj) => obj.used);
    const availableWords = this.state.words.length - usedWords.length;

    if (availableWords <= 2) {
      const params = {};
      params.exclude = usedWords;
      this.getWords(params).then((response) => {
        const newState = { ...this.state };
        newState.words = newState.words.concat(response);
        this.setState(newState);
      });
    }
  }

  validateWord(word) {
    const url = `/api/word/validate/${word}`;

    fetch(url).then((response) => {
      if (response.ok) {
        return response;
      }
    })
      .then((response) => response.json())
      .then((response) => {
        // Valid word:
        if (response.length) {
          const newState = { ...this.state };

          const anagrams = newState.word.anagrams.map((a) => {
            if (a.anagram === word) {
              a.solved = true;
            }

            return a;
          });

          newState.player.score = this.updateScore(word);
          newState.player.levelup = (word.length === LevelWordLength) ? true : this.state.player.levelup;
          newState.player.solved = this.state.player.solved.concat(word);
          newState.player.solvedAll = newState.player.solved.length === this.state.word.anagrams.length;
          newState.word.anagrams = anagrams;
          newState.notification = newState.player.solvedAll ? Notifications.solved_all : Notifications.points;

          if (newState.player.solvedAll) {
            newState.game.active = false;
            newState.game.reset = true;
            newState.timerOn = false;
            newState.timerTime = 0;
          }

          this.setState(newState);
        } else {
          this.setNotification('validate_invalid');
        }
      });
  }

  selectWord(words) {
    const array = words || this.state.words;
    const filtered = array.filter((obj) => !obj.used);
    const selected = filtered[Math.round(Math.random() * (filtered.length - 1))];
    return selected.word;
  }

  getWordAnagrams() {
    console.log('*** get anagrams ***');
    const url = `/api/levelWord/anagrams/${this.state.word.current}`;
    fetch(url).then((response) => {
      if (response.ok) {
        return response;
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length >= 1) {
          const newState = { ...this.state };
          newState.word.anagrams = response;
          this.setState(newState);
        }
      });
  }

  updateScore(word) {
    const wordLength = word.length;
    const multiplier = [10, 15, 20, 50];
    let { score } = this.state.player;

    switch (wordLength) {
      case 3: return score += wordLength * multiplier[0];
      case 4: return score += wordLength * multiplier[1];
      case 5: return score += wordLength * multiplier[2];
      case 6: return score += wordLength * multiplier[3];
    }
  }

  updateLevel() {
    return this.state.player.level += 1;
  }

  updateGameState() {
    const newState = { ...this.state };
    let notificationKey = this.state.player.levelup ? 'solved_level' : 'game_over';

    if (this.state.player.solvedAll) {
      notificationKey = 'solved_all';
    }

    // Mark current word as used:
    newState.words.filter((obj) => {
      if (obj.word === this.state.word.current) {
        return obj.used = true;
      }
    });

    newState.game.active = false;
    newState.game.reset = true;
    newState.player.level = this.state.player.level;
    newState.player.score = this.state.player.score;
    newState.player.solvedAll = false;
    newState.timerOn = false;
    newState.notification = Notifications[notificationKey];

    this.setState(newState, this.lazyLoadWords());
  }

  startGame() {
    const newState = { ...this.state };
    newState.game.active = true;
    newState.game.started = true;
    return this.setState(newState);
  }

  handleKeyPress(event) {
    const newState = { ...this.state };
    const { key } = event;
    const found = newState.word.letters.filter((obj) => key === obj.char && !obj.used);

    if (key !== 'Enter' && found.length) {
      found[0].used = true;
      found[0].updatedAt = Date.now();
      return this.setState(newState);
    } if (key !== 'Enter') {
      event.preventDefault();
    }
  }

  // On backspace, find the most recently updated letter
  // reset "used" status and "updatedAt" timestamp
  handleBackspace(event) {
    const newState = { ...this.state };
    const last = newState.word.letters.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
    last.used = false;
    last.updatedAt = BaseDate;
    return this.setState(newState);
  }

  handleClear() {
    const newState = { ...this.state };

    newState.word.letters.map((letter) => {
      letter.used = false;
      letter.updatedAt = BaseDate;
      return letter;
    });

    return this.setState(newState);
  }

  // Remove letter on click or touch:
  handleLetterClick(letter) {
    const newState = { ...this.state };
    const found = newState.word.letters.filter((obj) => letter.id === obj.id && !obj.used);

    if (found.length > 0) {
      found[0].used = true;
      found[0].updatedAt = Date.now();
      return this.setState(newState);
    }
  }

  restartGame(event) {
    const newState = { ...this.state };
    const currentWord = this.selectWord();
    const shuffledWord = shuffleLetters(currentWord, '').split('');

    newState.word.current = currentWord;

    newState.word.letters = shuffledWord.map((char, i) => ({
      id: i + 1, char, used: false, updatedAt: BaseDate,
    }));

    newState.notification = Notifications.default;
    newState.player.solved = [];
    newState.player.level = (this.state.player.levelup) ? this.updateLevel() : this.state.player.level;
    newState.player.score = (this.state.player.levelup) ? this.state.player.score : 0;
    newState.player.levelup = false;
    newState.game.active = true;
    newState.game.started = true;
    newState.game.reset = false;
    newState.game.restart = true;
    newState.timerTime = this.state.timerStart;

    this.getWordAnagrams();

    return this.setState(newState);
  }

  startTimer() {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1;
      // Timer counts down:
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
      // Time clears:
        clearInterval(this.timer);
        this.updateGameState();
      }
    }, 1000);
  }

  // Shuffle any unused letters
  updateShuffledState() {
    const newState = { ...this.state };
    const unusedLetters = this.state.word.letters.filter((letter) => !letter.used).map((unusedLetter) => unusedLetter.char).join('');
    const shuffled = shuffleLetters(unusedLetters).split('').map((char) => ({ char, used: false }));
    const usedLetters = this.state.word.letters.filter((letter) => letter.used)
      .map((usedLetter) => ({ ...usedLetter, updatedAt: usedLetter.updatedAt }));

    const letters = usedLetters.concat(shuffled).map((obj, i) => {
      const updatedAt = obj.updatedAt || BaseDate;
      return {
        id: i + 1, char: obj.char, used: obj.used, updatedAt,
      };
    });

    newState.word.letters = letters;
    return this.setState(newState);
  }

  setNotification(notify, delay) {
    const newState = { ...this.state };
    newState.notification = Notifications[notify];
    if (delay) {
      setTimeout(() => this.setState(newState), 2500);
    } else {
      return this.setState(newState);
    }
  }

  render() {
    const loadedWord = this.state.word.letters.length > 0;
    const gameStarted = this.state.game.started;

    return (
      <>

        <AppHeader />

        <div className="app-container">
          {!gameStarted
          && (
          <StartPage
            startGame={this.startGame}
          />
          )}

          {loadedWord && gameStarted
            ? (
              <GameContainer
                word={this.state.word}
                validateWord={this.validateWord}
                game={this.state.game}
                player={this.state.player}
                updateGameState={this.updateGameState}
                updateShuffledState={this.updateShuffledState}
                startTimer={this.startTimer}
                startGame={this.startGame}
                restartGame={this.restartGame}
                handleKeyPress={this.handleKeyPress}
                handleBackspace={this.handleBackspace}
                handleClear={this.handleClear}
                handleLetterClick={this.handleLetterClick}
                seconds={this.state.seconds}
                timerTime={this.state.timerTime}
                timerOn={this.state.timerOn}
                timerStart={this.state.timerStart}
                notification={this.state.notification}
                notifications={Notifications}
                setNotification={this.setNotification}
                isMobile={this.state.isMobile}
              />
            ) : null}

          <Anagrams
            game={this.state.game}
            anagrams={this.state.word.anagrams}
          />

        </div>

      </>
    );
  }
}

export default App;
