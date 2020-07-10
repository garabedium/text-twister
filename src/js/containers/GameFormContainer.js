import React, { Component } from 'react'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      notifications: [],
      seconds: this.props.game.time
    }
    // Class Methods:
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.addNotification = this.addNotification.bind(this)
  }
  componentDidMount(){
    console.log("*** gameForm mounted ***")
    this.handleSpacebarPress()
  }

  // Shuffle word on spacebar press:
  handleSpacebarPress(){
    document.body.onkeyup = (event) => {
      return (event.key === " ") ? this.props.updateShuffledState() : false
    }
  }

  // Check if word was already solved:
  isDuplicateWord(){
    const guess = this.props.word.letters.map(obj => { return obj.char  }).join('')
    return this.props.player.solved.indexOf(guess) > -1
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
    let guess = this.props.word.letters.filter( el => { return el.used }).sort((a,b) => { return a.updatedAt - b.updatedAt }).map(el => { return el.char }).join('')
    if (guess.length >= 3){
      if (this.isDuplicateWord()) {
        this.addNotification("You already solved that word!")
      } else {
        this.props.validateWord(guess)
        this.props.handleClear()
      }
    } else {
      return false
    }
  }

  addNotification(text){
    // To do:
    // - create & attach setTimeout to remove notification
    const notification = { text: text }
    return this.setState({ notifications: this.state.notifications.concat(notification) })
  }

  render(){
    const { timerTime, timerStart, timerOn } = this.props;

    let score = this.props.player.score
    let level = this.props.player.level
    const reset = this.props.game.reset
    let displayWordVal = reset ? this.props.word.current.split('') : this.props.word.letters
    let guess = this.props.word.letters.filter( el => { return el.used }).sort((a,b) => { return a.updatedAt - b.updatedAt }).map(el => { return el.char} ).join('')
    const btnRestartText = this.props.player.levelup ? "Next Level" : "Restart"
    const btnRestartIcon = this.props.player.levelup ? "ri-funds-line" : "ri-restart-line"
    const btnRestart = <Button handleClick={this.props.restartGame} class="btn m-auto m-t30" text={btnRestartText} icon={`${btnRestartIcon} ri-lg m-l5`} />

    const displayWord = displayWordVal.map((el,i) => {
      return( <li className={`letter ${el.used ? '--used':''}`} key={el.id ? el.id : i + 1}>{el.char ? el.char : el}</li> )
    })

    let notifications = this.state.notifications.map((item,i) => {
      return (<li key={i}>{item.text}</li>)
    })

    if (this.props.game.active && timerOn === false && (timerTime === timerStart)){
      this.props.startTimer()
    }

    let seconds = timerTime

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

        {notifications.length > 0 && !reset ? <ul id="notifications">{notifications}</ul> : null}

        {reset && btnRestart}

        {this.props.game.started && this.props.game.active && 
          <form onSubmit={this.handleSubmit} className="game-form">
            <div>
            <FormInput
              placeholder="Guess a word..."
              name="guess"
              content={guess}
              handleChange={this.handleInput}
              class="game-form__input"
            />
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