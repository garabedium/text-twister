import React, { Component } from 'react'
import Button from '../components/Button'

class StartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solvedWord:"play",
      shuffleWord:"",
      shuffleCount: 0,
      shuffleLimit: 5
    }
    // Methods
    this.shuffleStartPageLetters = this.shuffleStartPageLetters.bind(this)    
  }

  componentDidMount() {
    console.log("*** start page mounted ***")
    this.shuffleStartPageLetters()
  }

  // Shuffle "play" letters a few times:
  shuffleStartPageLetters(){
    const { shuffleCount, shuffleLimit, shuffleWord, solvedWord } = this.state
    let currentShuffle = this.props.shuffleLetters(this.state.solvedWord)
    let newState = Object.assign({},this.state)

    if (currentShuffle === solvedWord || currentShuffle === shuffleWord){
      return this.shuffleStartPageLetters()
    }

    if (shuffleCount < shuffleLimit){
      newState.shuffleWord = currentShuffle
      newState.shuffleCount += 1

      this.setState(newState, ()=>{
        setTimeout(() => {
          this.shuffleStartPageLetters()
        },1000)      
      })
    }

  }  

  render() {
    console.log(this.state.shuffleCount)
    var displayWord = this.state.shuffleCount === this.state.shuffleLimit ? this.state.solvedWord : this.state.shuffleWord
    var letters = displayWord.split('').map( letter => {
      return(
        <Button
          class={`letter letter text-uppercase ${this.state.shuffleCount < 5 ? '--animate-letter-fade':'--animate-letter-fade-last'}`}
          text={letter}
          key={letter}
        />  
      )
    })

    return (
      <React.Fragment>
        <div class="game-row start-page">
          <div class="game-timer">
            <Button
              icon="ri-play-fill ri-2x"
              handleClick={this.props.startGame}
            />
          </div>
          <div class="word">
            {letters}
          </div>
          <ul class="instructions-list">
            <li><i class="ri-timer-flash-line ri-2x"></i> Solve words before time runs out</li>
            <li><i class="ri-funds-line ri-2x"></i> Solve the 6 letter word and move on up</li>
            <li><i class="ri-error-warning-line ri-2x"></i> Words must be a minimum of 3 letters</li>
          </ul>          
        </div>
      </React.Fragment>
    )
  }

}

export default StartPage;