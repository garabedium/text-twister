import React, { Component } from 'react'
import FormInput from '../components/FormInput'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      word:"",
      guess:""
    }
    // Class Methods:
    this.handleGuess = this.handleGuess.bind(this)
  }

  componentWillMount(){
    console.log("*** gameForm mounted ***")
    console.log(this.props);
    // this.setState({
    //   word: this.props.test.letters
    // })
  }

  handleGuess(event){
    this.setState({
      guess: event.target.value
    })
  }
  render(){
    // console.log(this.state.word)
    return(
      <div>
      Game Container is a game changer: <br/>
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