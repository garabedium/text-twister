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
    this.getWord = this.getWord.bind(this)
    this.filterWords = this.filterWords.bind(this)
  }

  componentDidMount(){
    console.log("*** mounted ***")
    this.getWord()
  }

  getWord(){
    const url = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=9999&minDictionaryCount=5&minLength=6&maxLength=6&limit=10&api_key=c5d2a89c760005c52147b0391090c56c56e325c46ef140d61'

    fetch(url).then(response => {
      if (response.ok) {
        return response
      }
    })
    .then(response => response.json())
    .then(response => {
      let words = this.filterWords(response)
      return words
      // control.selectWord();
    })
    .then(words => {
      console.log(words);
    })
  }

  filterWords(words){
    let filteredWords = words.filter((item) => {
      return (item.word.search(/^[a-z]+$/) >= 0)
    })
      return filteredWords
  }


  render(){
    return(
      <h1>Hello World</h1>
    )
  }

}

export default App;