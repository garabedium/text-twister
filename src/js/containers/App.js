import React, { Component } from 'react'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: {
        score: 0,
        level: 1,
        solved: []
      },
      words: [],
      word: {
        "current":"",
        "letters":[],
        "removed":[],
        "charCodes":[],
        "charCodesRemoved":[]
      }
    }
    // Methods:
    this.getWords = this.getWords.bind(this)
    this.filterWords = this.filterWords.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
  }

  componentDidMount(){
    console.log("*** mounted ***")
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

      this.setState({
        words: this.state.words.concat(filteredWords),
        word: {
          current: currentWord,
          letters: shuffledWord
        }
      })
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


  render(){
    return(
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }

}

export default App;