import React, { Component } from 'react'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      word:"",
      guess:""
    }
    // Class Methods:
    this.handleGuess = this.handleGuess.bind(this)
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

  // Shuffle word on spacebar press
  handleSpacebarPress(){
    document.body.onkeyup = (e) => {
      return (e.keyCode === 32) ? this.shuffleWord() : false
    }
  }

  handleGuess(event){
    this.setState({
      guess: event.target.value
    })
  }

  render(){

    let word = this.state.word

    return(
      <div>
      Game Container is a game changer: <br/>
      Word: {word}<br/>
        <FormInput
          placeholder="Guess a word..."
          name="guess"
          content={this.state.guess}
          handleChange={this.handleGuess}
          class="form-input"
        /><br/>
        <Button text="Shuffle Letters"
          handleClick={this.shuffleWord}
        />
        <Button text="Submit" />
      </div>
    )
  }

}

export default GameFormContainer