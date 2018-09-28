import React, { Component } from 'react'
import FormInput from '../components/FormInput'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      guess:""
    }
    // Class Methods:
    this.handleGuess = this.handleGuess.bind(this)
  }

  handleGuess(event){
    this.setState({
      guess: event.target.value
    })
  }

  render(){
    return(
      <div>
      Game Container is a game changer:
        <FormInput
          placeholder="Guess a word..."
          name="guess"
          content={this.state.guess}
          handleChange={this.handleGuess}
          class="form-input"
        />
      </div>
    )
  }

}

export default GameFormContainer