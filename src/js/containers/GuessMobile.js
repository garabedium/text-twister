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
          { guess.length === 0 ? <span>Tap letters to use.</span> : ''}
          {guess}
        </div>
        <button onClick={this.props.handleBackspace} className={`btn--backspace ${guess.length === 0 ? 'disabled':''}`}><i class="ri-delete-back-2-line ri-2x"></i></button>
      </div>
    )
  }

}

export default GuessMobile;

{/*         handleClick={this.props.startGame} 
        <Button
          icon="ri-close-circle-line ri-2x"
        />
*/}
{/* <React.Fragment>
<h1>Text Twister JS</h1>
<h2>Unscramble words</h2>
<Button
  text="Play"
  handleClick={this.props.removeSplash}
/>
</React.Fragment> */}