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
      this.setState({
        words: this.state.words.concat(filteredWords),
        word: {
          current: currentWord
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


  render(){
    return(
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }

}

export default App;