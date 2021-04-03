import React, { Component } from 'react'
import Button from '../components/Button'

class StartPage extends Component {
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
        <h2>Unscramble words</h2>
        <Button
          text="Play"
          handleClick={this.props.removeSplash}
        />
      </React.Fragment>
    )
  }

}

export default StartPage;