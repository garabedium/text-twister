import React, { Component } from 'react'
import Button from '../components/Button'

class StartPage extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log("*** start page mounted ***")
  }

  render(){

    return(
      <React.Fragment>
        <div>start me up
        </div>
        <Button
          icon="ri-play-fill ri-2x"
          handleClick={this.props.startGame}
        />        
      </React.Fragment>
    )
  }

}

export default StartPage;