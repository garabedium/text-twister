import React, { Component } from 'react'
import Button from '../components/Button'

class SplashPage extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log("*** splash page mounted ***")
  }

  render(){

    return(
      <React.Fragment>
        <h1>Text Twister JS</h1>
        <h2>How to Play</h2>
        - Solve as many words as you can before time runs out.
        - Word must be a minimum of three letters.
        - Solve the six letter word and move on to the next level.
        <h2>Game Controls</h2>
        - space_bar Spacebar: scramble letters
        - keyboard_return Enter / Return: solve word
        <Button
          text="Start Game"
          handleClick={this.props.startTimer}
        />
      </React.Fragment>
    )
  }

}

export default SplashPage;
