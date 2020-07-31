import React, { Component } from 'react'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      seconds: this.props.game.time
    }
    // Class Methods:
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.delaySetNotification = this.delaySetNotification.bind(this)
    this.getGuess = this.getGuess.bind(this)
  }
  componentDidMount(){
    console.log("*** gameForm mounted ***")
    this.handleSpacebarPress()
    // this.setNotification()
  }

  // Shuffle word on spacebar press:
  handleSpacebarPress(){
    document.body.onkeyup = (event) => {
      return (event.key === " ") ? this.props.updateShuffledState() : false
    }
  }

  // Check if word was already solved:
  isDuplicateWord(){
    return this.props.player.solved.indexOf(this.getGuess()) > -1
  }

  handleInput(event){
    if (event.type === "keypress") {
      return this.props.handleKeyPress(event)
    }
    if (event.type == "keydown" && event.key == 'Backspace') {
      return this.props.handleBackspace(event)
    }
  }

  handleSubmit(event){
    event.preventDefault()
    let guess = this.getGuess()
    if (guess.length >= 3){
      if (this.isDuplicateWord()) {
        console.log("duplicate word")
        this.props.setNotification({text:"You already solved that word!", icon:"x"})
      } else {
        this.props.validateWord(guess)
        this.props.handleClear()
      }
    } else {
      this.props.setNotification({text:"Words must be at least 3 letters!", icon:"x"})
    }
  }

  delaySetNotification(){
    setTimeout(() => {
      this.props.setNotification({text:"Default!",default:true, icon:"x"})
    },2500)
  }

  getGuess(){
    // Filter by used letters, sort by timestamp, map + return result:
    return this.props.word.letters.filter( el => { return el.used }).sort((a,b) => { return a.updatedAt - b.updatedAt }).map(el => { return el.char }).join('')
  }

  render(){
    const { timerTime, timerStart, timerOn } = this.props;

    let score = this.props.player.score
    let level = this.props.player.level
    const reset = this.props.game.reset
    let displayWordVal = reset ? this.props.word.current.split('') : this.props.word.letters
    let guess = this.getGuess()
    const btnRestartText = this.props.player.levelup ? "Next Level" : "Restart"
    const btnRestartIcon = this.props.player.levelup ? "ri-funds-line" : "ri-restart-line"
    const btnRestart = <Button handleClick={this.props.restartGame} class="btn m-auto m-t30" text={btnRestartText} icon={`${btnRestartIcon} ri-lg m-l5`} />

    const displayWord = displayWordVal.map((el,i) => {
      return( <li className={`letter ${el.used ? '--used':''}`} key={el.id ? el.id : i + 1}>{el.char ? el.char : el}</li> )
    })

    if (this.props.game.active && timerOn === false && (timerTime === timerStart)){
      this.props.startTimer()
    }

    let seconds = timerTime

    let notification = this.props.notification.text
    if (!this.props.notification.default) {
      this.delaySetNotification();
    }

    return(
      <React.Fragment>
        
        <div className={`game-row ${reset ? '--reset':''}`}>
          {this.props.game.started ? <div className="game-points">
            <span className="game-points__title"><i class="ri-star-fill ri-2x"></i></span>
            <span className="game-points__score">{score}</span>
          </div> : null}
          <div className="game-timer">
            {this.props.game.started ? <span>{seconds}</span> : 
              <Button
                icon="ri-play-fill ri-2x"
                handleClick={this.props.startGame}
              />
            }
          </div>
          {this.props.game.started ? <div className="game-level">
            <span className="game-points__title"><i class="ri-funds-line ri-2x"></i></span>
            <span className="">{level}</span>
          </div> : null}
          {this.props.game.started && <ul className="word">{displayWord}</ul>}
          {!this.props.game.started && <div className="word">Play the game.</div>}
        </div>

        {reset && btnRestart}

        {this.props.game.started && this.props.game.active && 
          <form onSubmit={this.handleSubmit} className="game-form">

            <FormInput
              placeholder="Guess a word..."
              name="guess"
              content={guess}
              handleChange={this.handleInput}
              class="game-form__input"
            />

            <div className="notify">
              { notification }
            </div>

            <Button
              text="Shuffle"
              handleClick={this.props.updateShuffledState}
              class="btn--secondary"
              icon="ri-space m-l5"
            />
            <Button
              text="Submit"
              handleClick={this.handleSubmit}
              class="btn--secondary"
              icon="ri-arrow-right-line m-l5"
            />
          </form>
        }
      </React.Fragment>
    )
  }

}

export default GameFormContainer
// {notifications.length > 0 && !reset ? <ul id="notifications">{notifications}</ul> : null}