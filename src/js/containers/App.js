import React, { Component } from 'react'
import GameFormContainer from './GameFormContainer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      game: {
        active: false,
        paused: false
      },
      player: {
        score: 0,
        level: 1,
        solved: []
      },
      words: [],
      word: {
        "current":"",
        "shuffled":"",
        "removed":[],
        "charCodes":[],
        "charCodesRemoved":[],
        "solved":""
      }
    }
    // Methods:
    this.getWords = this.getWords.bind(this)
    this.checkWord = this.checkWord.bind(this)
    this.filterWords = this.filterWords.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.convertWordToHash = this.convertWordToHash.bind(this)
    this.convertHashToWord = this.convertHashToWord.bind(this)
  }

  componentDidMount(){
    console.log("*** app mounted ***")
    this.getWords()
  }

  getWords(){
    const url = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=9999&minDictionaryCount=5&minLength=6&maxLength=6&limit=10&api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61'

    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {

      const filteredWords = this.filterWords(response)
      const currentWord = this.selectWord(filteredWords)
      const shuffledWord = this.shuffleWord(currentWord)
      const charCodes = this.convertWordToHash(currentWord)
      const solvedWord = this.convertHashToWord(charCodes)

      this.setState({
        words: this.state.words.concat(filteredWords),
        word: {
          current: currentWord,
          shuffled: shuffledWord,
          charCodes: this.state.word.charCodes.concat(charCodes),
          solved: solvedWord
        }
      })
    })
  }

  checkWord(word){
    const url = `http://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61`

    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {
      if (response.length >= 1){
        let updatedScore = this.updateScore(word)
        this.setState({
          player: { score: updatedScore }
        })
      }
    })
  }

  filterWords(array){
    const filteredWords = array.filter((item) => {
      return (item.word.search(/^[a-z]+$/) >= 0)
    })
      return filteredWords
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

  // Update score:
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

    return(
      <div>
        <h1>Hello World</h1>
        Game is: {this.state.game.active ? "on" : "off"}<br/>
        Score: {score}
        {loadedWord ?
          <GameFormContainer
            word={this.state.word.shuffled}
            shuffleWord={this.shuffleWord}
            checkWord={this.checkWord}
          /> : null}
      </div>
    )
  }

}

export default App;