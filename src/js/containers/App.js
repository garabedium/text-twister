import React, { Component } from 'react'
import Anagrams from './Anagrams'
import GameContainer from './GameContainer'
import StartPage from './StartPage'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      timerOn: false,
      timerTime: 999,
      timerStart: 999,
      zipfMin: 5,
      zipfMax: 7,
      levelWordLength: 6,
      isMobile: this.props.isTouchDevice,
      notification: {},
      notifications: {
        "default": {text:"Press Spacebar to shuffle. Press Enter to submit."},
        "default_mobile": {text: "Tap letters to use."},
        "points": {text:"Woohoo! Points! Keep Solving!", icon:"star"},
        "validate_dupe": {text:"You already solved that word!", icon:"x"},
        "validate_min": {text:"Words must be at least 3 letters!", icon:"x"},
        "validate_invalid": {text:"That's not in our dictionary!", icon:"x"},
        "solved_level": {text:"You solved the 6 letter word! Next level solve!", icon:"x"},
        "solved_all": {text:"You solved all the words! Genius!"},
        "game_over": {text:"Game Over"},
      },
      baseDate: Date.now(),
      game: {
        active: false,
        started: false,
        reset: false
      },
      player: {
        score: 0,
        level: 1,
        levelup: false,
        solved: []
      },
      words: [],
      word: {
        "current":"",
        "letters":[],
        "anagrams":[]
      }
    }
    // Methods:
    this.initGame = this.initGame.bind(this)
    this.reactLoaded = this.reactLoaded.bind(this)
    this.getWords = this.getWords.bind(this)
    this.lazyLoadWords = this.lazyLoadWords.bind(this)
    this.getWordAnagrams = this.getWordAnagrams.bind(this)
    this.validateWord = this.validateWord.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.shuffleLetters = this.shuffleLetters.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.updateLevel = this.updateLevel.bind(this)
    this.updateGameState = this.updateGameState.bind(this)
    this.updateShuffledState = this.updateShuffledState.bind(this)
    this.startGame = this.startGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleBackspace = this.handleBackspace.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleLetterClick = this.handleLetterClick.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.setNotification = this.setNotification.bind(this)
  }

  componentDidMount(){
    console.log("*** app mounted ***")
    this.reactLoaded()
    this.initGame()
  }
  
  reactLoaded(){
    setTimeout(() => {
      document.body.classList.add('--react-loaded')
    },250)
  }

  initGame(){  
    this.getWords().then(response => { 
      let newState = Object.assign({},this.state)
      newState.notification = this.state.notifications[(this.state.isMobile) ? "default_mobile":"default"]
      newState.words = response
      newState.word.current = this.selectWord(response)
      // Build the letter objects that will maintain letter 'state':
      newState.word.letters = this.shuffleLetters(newState.word.current).split('').map( (char,i) => {
        return { id: i + 1, char: char, used: false, updatedAt: this.state.baseDate }
      })
      this.setState(newState, this.getWordAnagrams())
    })
  }

  getWords(params){
    console.log("*** get words ***")
    let url = `/api/levelWord/range/${this.state.zipfMin}&${this.state.zipfMax}`

    if (params && params.exclude){
      let query = params.exclude.map(obj => { return `&exclude=${obj.word}`}).join('')
      url += query
    }

    return new Promise((resolve, reject) => {
       fetch(url).then(response => {
        if (response.ok) {
          resolve(response.json()) 
        }
      })
    })
  }

  lazyLoadWords(){
    let usedWords = this.state.words.filter(obj => { return obj.used })
    let availableWords = this.state.words.length - usedWords.length

    if (availableWords <= 2) {
      let params = {}
      params.exclude = usedWords
      this.getWords(params).then(response => {
        let newState = Object.assign({},this.state)
        newState.words = newState.words.concat(response)
        this.setState(newState)
      })
    }
  }

  validateWord(word){
    const url = `/api/word/validate/${word}`

    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {

      // Valid word:
      if (response.length >= 1){
        let newState = Object.assign({},this.state)
        let anagrams = newState.word.anagrams.map((a)=>{
          if (a.anagram === word){
            a.solved = true
          }
          return a
        })

        newState.player.score = this.updateScore(word)
        newState.player.levelup = (word.length === this.state.levelWordLength) ? true : this.state.player.levelup
        newState.notification = (word.length === this.state.levelWordLength) ? this.state.notifications.solved_level : this.state.notifications.points
        newState.player.solved = this.state.player.solved.concat(word)
        newState.word.anagrams = anagrams

        this.setState(newState)
      } else {
        this.setNotification("validate_invalid")
      }
    })
  }

  selectWord(words){
    const array = words ? words : this.state.words
    const filtered = array.filter(obj => { return !obj.used })
    const selected = filtered[Math.round( Math.random() * (filtered.length-1))]
    return selected.word
  }

  // Take in a word and shuffle the letters:
  shuffleLetters(string){

    let arr = (string) ? string.split('') : this.state.word.letters.filter(obj => { return !obj.used }).map( obj => { return obj.char })
    let original = arr.join('')

    let shuffled = ''

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    shuffled = arr.join('')

    // Don't show the solved word or the same shuffled sequence:
    if (shuffled.length > 1 && (shuffled === this.state.word.current || shuffled === original)){
      return this.shuffleLetters(string)
    }

    return shuffled
  }

  getWordAnagrams(){
    console.log("*** get anagrams ***")
    const url = `/api/levelWord/anagrams/${this.state.word.current}`
    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {
      if (response.length >= 1){
        let newState = Object.assign({},this.state)
        newState.word.anagrams = response
        this.setState(newState)
      }
    })
  }

  updateScore(word){
    const wordLength = word.length
    const multiplier = [10,15,20,50]
    let score = this.state.player.score

    switch(wordLength){
      case 3: return score += wordLength * multiplier[0]
      case 4: return score += wordLength * multiplier[1]
      case 5: return score += wordLength * multiplier[2]
      case 6: return score += wordLength * multiplier[3]
    }
  }

  updateLevel(){
    return this.state.player.level += 1
  }

  updateGameState(){
    let newState = Object.assign({},this.state)
    const level = (this.state.player.levelup) ? this.updateLevel() : this.state.player.level

    // Mark current word as used:
    newState.words.filter(obj => {
      if (obj.word === this.state.word.current) {
        return obj.used = true
      }
    })

    newState.game.active = false
    newState.game.reset = true
    newState.player.level = level
    newState.player.score = this.state.player.score
    newState.timerOn = false
    newState.notification = this.state.notifications[(this.state.player.levelup) ? "default":"game_over"]

    this.setState(newState, this.lazyLoadWords())
  }

  startGame(){
    let newState = Object.assign({},this.state)
    newState.game.active = true
    newState.game.started = true
    return this.setState(newState)
  }

  handleKeyPress(event){
    let newState = Object.assign({},this.state)
    const key = event.key
    let found = newState.word.letters.filter( obj => { return key === obj.char && !obj.used })

    if (key !== 'Enter' && found.length > 0){
      found[0].used = true
      found[0].updatedAt = Date.now()
      return this.setState(newState)
    } else if (key !== 'Enter') {
      event.preventDefault()
    }
  }

  // On backspace, find the most recently updated letter
  // reset "used" status and "updatedAt" timestamp
  handleBackspace(event){
    let newState = Object.assign({},this.state)
    const last = newState.word.letters.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b))
    last.used = false
    last.updatedAt = this.state.baseDate
    return this.setState(newState)
  }

  handleClear(){
    let newState = Object.assign({},this.state)
  
    newState.word.letters.map(letter => { 
      letter.used = false
      letter.updatedAt = this.state.baseDate
      return letter
    })

    return this.setState(newState)
  }

  // Remove letter on click or touch:
  handleLetterClick(letter){
    let newState = Object.assign({},this.state)
    let found = newState.word.letters.filter( obj => { return letter.id === obj.id && !obj.used })

    if (found.length > 0){
      found[0].used = true
      found[0].updatedAt = Date.now()
      return this.setState(newState)
    }
  }

  restartGame(event){
    let newState = Object.assign({},this.state)
    const currentWord = this.selectWord()

    newState.word.current = currentWord
    newState.word.letters = this.shuffleLetters(newState.word.current).split('').map( (char,i) => {
      return { id: i + 1, char: char, used: false, updatedAt: this.state.baseDate }
    })
    
    newState.notification = this.state.notifications["default"]
    newState.player.solved = []
    newState.player.level = (this.state.player.levelup) ? this.state.player.level : 0
    newState.player.score = (this.state.player.levelup) ? this.state.player.score : 0    
    newState.player.levelup = false    
    newState.game.active = true
    newState.game.started = true
    newState.game.reset = false
    newState.game.restart = true
    newState.timerTime = this.state.timerStart

    this.getWordAnagrams()

    return this.setState(newState)
  }

  startTimer(){
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1;
      // Timer counts down:
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
      // Time clears:
        clearInterval(this.timer);
        this.updateGameState()
      }
    }, 1000);
  };

  updateShuffledState(){
    let newState = Object.assign({},this.state)
    let shuffled = this.shuffleLetters().split('').map(char => { return { char: char, used: false } })
    let used = this.state.word.letters.filter(obj => { return obj.used }).map(obj => { return { char: obj.char, used: obj.used, updatedAt: obj.updatedAt } })

    let letters = used.concat(shuffled).map( (obj,i) => {
      let updatedAt = obj.updatedAt || this.state.baseDate
      return { id: i + 1, char: obj.char, used: obj.used, updatedAt: updatedAt }
    })

    newState.word.letters = letters
    return this.setState(newState)
  }

  replaceLetterUnderscore(word){
    let output = word.split('').map(letter => {
      return "_"
    }).join(' ')
    return output
  }

  setNotification(notify,delay){
    let newState = Object.assign({},this.state)
    newState.notification = this.state.notifications[notify]
    if (delay){
      setTimeout(() => {
        return this.setState(newState)
      },2500)
    } else {
      return this.setState(newState)
    }
  }

  render(){
    let logoText = "Text Twister".split('').map((char,i)=>{
      return(<span className={`logo-letter ${char === ' ' ? '--space':''}`}>{char}</span>)
    })
    let loadedWord = this.state.word.letters.length > 0
    let score = this.state.player.score
    let gameStarted = this.state.game.started

    return(
      <React.Fragment>

        <header className="site-header">
          <h1 className="logo">{logoText}</h1>
        </header>

      <div className="game-container">

        { !gameStarted && 
          <StartPage
            game={this.state.game}
            shuffleLetters={this.shuffleLetters}
            startGame={this.startGame}
          /> 
        }

        {loadedWord && gameStarted ?
          <GameContainer
            word={this.state.word}
            shuffleLetters={this.shuffleLetters}
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
            notifications={this.state.notifications}
            setNotification={this.setNotification}
            isMobile={this.state.isMobile}
          /> : null}

        <Anagrams 
          game={this.state.game}
          anagrams={this.state.word.anagrams}
        />

      </div>

      </React.Fragment>
    )
  }

}

export default App;