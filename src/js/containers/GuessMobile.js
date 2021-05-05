import React, { Component } from 'react'
import Button from '../components/Button'

class GuessMobile extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log("*** guess mobile ***")
  }

  render(){
    let guess = this.props.guess;
    return(
      <div className="mobile-guess">
        <div className="mobile-letters">
          {guess}
        </div>
        <button onClick={this.props.handleBackspace} className={`btn--backspace ${guess.length === 0 ? 'disabled':''}`}><i className="ri-delete-back-2-line ri-2x"></i></button>
      </div>
    )
  }

}

export default GuessMobile;