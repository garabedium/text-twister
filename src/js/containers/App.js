import React, { Component } from 'react'
import GameFormContainer from './GameFormContainer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
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
        "charCodes":[]
      }
    }
    // Methods:
    this.getWords = this.getWords.bind(this)
    this.validateWord = this.validateWord.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.updateLevel = this.updateLevel.bind(this)
    this.updateGameState = this.updateGameState.bind(this)
    this.startGame = this.startGame.bind(this)
    this.convertWordToHash = this.convertWordToHash.bind(this)
    this.convertHashToWord = this.convertHashToWord.bind(this)
  }

  componentDidMount(){
    console.log("*** app mounted ***")
    this.getWords()
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

      const currentWord = this.selectWord(response)
      const currentWordIndex = response.some((item,i) => { if (item.word === currentWord) return i; })
      response.splice(currentWordIndex,1)
      const shuffledWord = this.shuffleWord(currentWord)
      const charCodes = this.convertWordToHash(currentWord)
      const solvedWord = this.convertHashToWord(charCodes)

      this.setState({
        words: this.state.words.concat(response),
        word: {
          current: currentWord,
          shuffled: shuffledWord,
          charCodes: this.state.word.charCodes.concat(charCodes),
          solved: solvedWord
        }
      })
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
        const updatedScore = this.updateScore(word)
        const updatedLevelup = (word.length === 6) ? true : this.state.player.levelup
        const solvedWords = this.state.player.solved.concat(word)

        this.setState({
          player: {
            score: updatedScore,
            level: this.state.player.level,
            levelup: updatedLevelup,
            solved: solvedWords
          }
        })
      }
    })
  }

  selectWord(words){
    const selected = words[Math.round( Math.random() * (words.length-1))];
    return selected.word
  }

  // Take in a word and shuffle the letters:
  shuffleWord(string){
    const array = string.split('')

    // Fisher-Yates algorithm:
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
    return shuffled

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

  updateGameState(state){

    let newState = Object.assign({},this.state)
    const level = (this.state.player.levelup) ? this.updateLevel() : this.state.player.level
    const reset = (!this.state.player.levelup) ? true : false

    newState.game.active = state
    newState.game.reset = reset
    newState.player.level = level

    this.setState(newState)
  }

  startGame(){
    let newState = Object.assign({},this.state)
    newState.game.active = true
    newState.game.started = true
    return this.setState(newState)
  }

  convertWordToHash(string){
    const array = string.split('')
    const charCodes = array.map((char) => {
      return char.charCodeAt()
    })
    return charCodes
  }

  convertHashToWord(array){
    const word = array.map((charCode) => {
      return String.fromCharCode(charCode)
    }).join('')
    return word
  }


  render(){
    let loadedWord = this.state.word.shuffled.length > 0
    let score = this.state.player.score
    let solvedWords = this.state.player.solved.map((word) => {
      return( <li key={word}>{word}</li> )
    })
    return(
      <React.Fragment>

      <div className="game">

        {loadedWord ?
          <GameFormContainer
            word={this.state.word.shuffled}
            shuffleWord={this.shuffleWord}
            validateWord={this.validateWord}
            game={this.state.game}
            player={this.state.player}
            charCodes={this.state.word.charCodes}
            updateGameState={this.updateGameState}
            startGame={this.startGame}
          /> : null}

        {solvedWords.length >= 1 ? <ul className="game-solved-words">{solvedWords}</ul> : null}
      </div>
      </React.Fragment>
    )
  }

}

export default App;
