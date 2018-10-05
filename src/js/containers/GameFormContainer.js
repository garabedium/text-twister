import React, { Component } from 'react'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      word:"",
      // guess:"", // use w/onChange
      guess: [],
      removedKeycodes: [],
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

    this.setState({
      word: this.props.word
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

    // keypress fires when a key that produces a character value is pressed:
    if (event.type === "keypress"){
      const charCode = event.charCode
      const char = String.fromCharCode(charCode)

      // Only allow chars that are in the word:
      if (this.props.charCodes.indexOf(charCode) < 0 && charCode !== 13){
        event.preventDefault()
      } else if (charCode !== 13){
        this.setState({
          guess: this.state.guess.concat(char)
        })
      }

    }

    if (event.type === "keydown"){
      // future: keyCode is deprecated
      const keyCode = event.keyCode
      const backspace = 8

      if(keyCode === backspace){
        this.setState({ guess: this.state.guess.concat(this.state.guess.pop()) })
      }
    }


    // Only allow charCodes that belong to the word
    // Don't allow duplicate charCodes
    // debugger;
    // this.setState({
    //   guess: event.target.value
    // })
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