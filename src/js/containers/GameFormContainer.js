import React, { Component } from 'react'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      word:"",
      guess: [],
      charCodes: [],
      charCodesUsed: [],
      duplicate: false
    }
    // Class Methods:
    this.handleChange = this.handleChange.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
  }

  componentDidMount(){
    console.log("*** gameForm mounted ***")
    this.handleSpacebarPress()

    let charCodes
    if (this.state.charCodes.length === 0 && this.state.charCodesUsed.length === 0){
      charCodes = this.props.charCodes
    }

    this.setState({
      word: this.props.word,
      charCodes: this.state.charCodes.concat(charCodes)
    })
  }

  shuffleWord(){
    const shuffled = this.props.shuffleWord(this.state.word)
    return this.setState({ word: shuffled })
  }

  // Shuffle word on spacebar press:
  handleSpacebarPress(){
    document.body.onkeyup = (e) => {
      return (e.keyCode === 32) ? this.shuffleWord() : false
    }
  }

  // Check if word was already solved:
  isDuplicateWord(){
    const guess = this.state.guess.join('')
    return this.props.solved.indexOf(guess) > -1
  }

  handleSubmit(event){
    event.preventDefault()
    const guess = this.state.guess.join('')

    if (this.isDuplicateWord()) {
      this.setState({
        duplicate: true
      })
    } else {
      this.props.checkWord(guess)
      this.handleClear()
    }
  }

  handleKeypress(event){
    // const charCode = event.charCode
    // const char = String.fromCharCode(charCode)

    // if (this.props.charCodes.indexOf(charCode) < 0 && charCode !== 13){
    //   event.preventDefault()
    // } else {
    //   this.setState({
    //     guess: this.state.guess.concat(char)
    //   })
    // }
  }

  handleChange(event){

    if (event.type === "keypress"){

      let charCodes = this.state.charCodes
      const charCode = event.charCode
      const char = String.fromCharCode(charCode)

      // Only allow chars that are in the word:
      if (charCodes.indexOf(charCode) < 0 && charCode !== 13){
        event.preventDefault()
      } else if (charCode !== 13){

        let index = charCodes.indexOf(charCode)
        charCodes.splice(index,1);

        this.setState({
          guess: this.state.guess.concat(char),
          charCodes: charCodes,
          charCodesUsed: this.state.charCodesUsed.concat(charCode)
        })
      }

    }

    if (event.type === "keydown"){
      // future: keyCode is deprecated
      const keyCode = event.keyCode
      const backspace = 8

      if (keyCode === backspace){

        this.setState({ guess: this.state.guess.concat(this.state.guess.pop()) })
      }
    }

  }

  handleClear(){
    this.setState({ guess: [] })
  }

  render(){

    const word = this.state.word
    const duplicate = this.state.duplicate
    let guess = this.state.guess.join('')

    return(
      <div>
      Word: {word}<br/>

        {duplicate ? <h3>You already solved that word</h3> : null}

        <form onSubmit={this.handleSubmit}>
          <FormInput
            placeholder="Guess a word..."
            name="guess"
            content={guess}
            handleChange={this.handleChange}
            class="form-input"
          /><br/>
          <Button text="Shuffle Letters"
            handleClick={this.shuffleWord}
          />
          <Button
            text="Submit"
            handleClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }

}

export default GameFormContainer

// handleKeypress={this.handleKeypress}