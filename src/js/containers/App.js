import React, { Component } from 'react'
import GameFormContainer from './GameFormContainer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      timerOn: false,
      timerTime: 20,
      timerStart: 20,
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
        "shuffled":"",
        "letters":[],
        "lettersUsed":[],
        "anagrams":[]
      }
    }
    // Methods:
    this.getWords = this.getWords.bind(this)
    this.getWordAnagrams = this.getWordAnagrams.bind(this)
    this.validateWord = this.validateWord.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.updateLevel = this.updateLevel.bind(this)
    this.updateGameState = this.updateGameState.bind(this)
    this.updateShuffledState = this.updateShuffledState.bind(this)
    this.startGame = this.startGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleBackspace = this.handleBackspace.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount(){
    console.log("*** app mounted ***")
    this.getWords()
  }
  componentWillUnmount() {
    // clearInterval(this.startTimer())
  }
  getWords(){
    const url = "/api/levelWord/range/5&6"
    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {
      let newState = Object.assign({},this.state)
      newState.words = response
      newState.word.current = this.selectWord(response)
      newState.word.shuffled = this.shuffleWord(newState.word.current)
      newState.word.letters = newState.word.shuffled.split('')

      this.setState(newState)
    })
    .then(() => {
      console.log("*** get anagrams ***")
      this.getWordAnagrams()
    })
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

      if (response.length >= 1){
        let newState = Object.assign({},this.state)
        let anagrams = newState.word.anagrams.map((a)=>{
          if (a.anagram === word){
            a.solved = true
          }
          return a
        })

        newState.player.score = this.updateScore(word)
        newState.player.levelup = (word.length === 6) ? true : this.state.player.levelup
        newState.player.solved = this.state.player.solved.concat(word)
        newState.word.anagrams = anagrams

        this.setState(newState)

      }
    })
  }

  selectWord(words){
    const array = words ? words : this.state.words
    const selected = array[Math.round( Math.random() * (array.length-1))];
    return selected.word
  }

  // Take in a word and shuffle the letters:
  shuffleWord(string){
    string = (string) ? string : this.state.word.shuffled
    const array = string.split('')
    let counter = array.length
    let shuffled = ''

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter)
      counter--

      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    shuffled = array.join('')
    if (shuffled === this.state.word.current) {
      return this.shuffleWord(string)
    }
    return shuffled

  }

  getWordAnagrams(){
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

    newState.game.active = false
    newState.game.reset = true
    newState.player.level = level
    newState.player.score = this.state.player.score
    newState.timerOn = false

    this.setState(newState)
  }

  startGame(){
    let newState = Object.assign({},this.state)
    newState.game.active = true
    newState.game.started = true
    return this.setState(newState)
  }

  handleKeyPress(event){
    let newState = Object.assign({},this.state)
    const letters = newState.word.letters
    const key = event.key

    if (letters.indexOf(key) > -1 && key !== 'Enter') {
      const foundIndex = letters.indexOf(key)

      // Remove letter from letters, add to lettersUsed
      letters.splice(foundIndex,1)
      newState.word.lettersUsed.push(key)

      return this.setState(newState)
    } else if (key !== 'Enter'){
      event.preventDefault()
    }

  }

  handleBackspace(event){
    let newState = Object.assign({},this.state)
    newState.word.letters.push(newState.word.lettersUsed.pop())
    return this.setState(newState)
  }

  handleClear(){
    let newState = Object.assign({},this.state)
    newState.word.letters = newState.word.letters.concat(newState.word.lettersUsed)
    newState.word.lettersUsed = []
    return this.setState(newState)
  }

  restartGame(event){
    let newState = Object.assign({},this.state)
    const currentWord = this.selectWord()

    newState.word.current = currentWord
    newState.word.shuffled = this.shuffleWord(currentWord)
    newState.word.letters = newState.word.shuffled.split('')
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
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        // this.setState({ timerOn: false });
        this.updateGameState()
      }
    }, 1000);
  };

  updateShuffledState(){
    let newState = Object.assign({},this.state)
    newState.word.shuffled = this.shuffleWord()
    return this.setState(newState)
  }

  replaceLetterUnderscore(word){
    let output = word.split('').map(letter => {
      return "_"
    }).join(' ')
    return output
  }

  render(){
    let loadedWord = this.state.word.shuffled.length > 0
    let score = this.state.player.score
    let anagrams = this.state.word.anagrams.map((a) => {
      let word = (a.solved) ? a.anagram : this.replaceLetterUnderscore(a.anagram);
      return( <li key={a.id}>{word}</li> )
    })

    return(
      <React.Fragment>
      <main className="game">

        <header className="site-header">
          <h1 className="logo">Text Twister JS</h1>
        </header>

        {loadedWord ?
          <GameFormContainer
            word={this.state.word}
            wordCurrent={this.state.word.current}
            shuffleWord={this.shuffleWord}
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
            seconds={this.state.seconds}
            timerTime={this.state.timerTime}
            timerOn={this.state.timerOn}
            timerStart={this.state.timerStart}
          /> : null}

        {this.state.game.started && anagrams.length > 0 ? <ul>{anagrams}</ul> : null}
      </main>
      </React.Fragment>
    )
  }

}

export default App;