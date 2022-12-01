import React, { Component } from 'react';

import './GameForm.scss';

import GuessMobile from '../GuessMobile/GuessMobile.jsx';
import Button from '../../components/Button/Button';
import GameWord from '../../components/GameWord/GameWord.jsx';
import GameStat from '../../components/GameStat/GameStat.jsx';
import GameTimer from '../../components/GameTimer/GameTimer.jsx';
import Notification from '../../components/Notification/Notification.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';
class GameContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      seconds: this.props.game.time
    }
    // Class Methods:
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.getGuess = this.getGuess.bind(this)
    this.onInputClick = this.onInputClick.bind(this)
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
    this.handleLetterClickAndFocus = this.handleLetterClickAndFocus.bind(this)
  }

  componentDidMount(){
    console.log("*** gameForm mounted ***")
    this.handleSpacebarPress()
  }

  handleLetterClickAndFocus(letter){
    this.props.handleLetterClick(letter)
    if (!this.props.isMobile){
      this.focusTextInput()
    }
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: "current" accesses the DOM node
    this.textInput.current.focus();
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
    if (event.type == "keydown" && event.key == "Backspace") {
      return this.props.handleBackspace(event)
    }
    // Prevent cursor from moving left within the guess input
    if (event.type == "keydown" && event.key == "ArrowLeft"){
      event.preventDefault()
    }
  }

  handleSubmit(event){
    event.preventDefault()
    let guess = this.getGuess()
    // If guess meets minimum word length:
    if (guess.length >= 3){
      if (this.isDuplicateWord()) {
        console.log("duplicate word")
        this.props.handleClear()
        this.props.setNotification("validate_dupe")
      } else {
        this.props.validateWord(guess)
        this.props.handleClear()
      }
    } else {
      this.props.setNotification("validate_min")
    }
  }

  // Guess = used letters, sorted by timestamp, returned as string
  getGuess(){
    let guess = this.props.word.letters.filter( el => { return el.used }).sort((a,b) => { return a.updatedAt - b.updatedAt }).map(el => { return el.char }).join('')
    return guess
  }

  onInputClick(e){
    const inputValueLength = e.currentTarget.value.length
    e.currentTarget.setSelectionRange(inputValueLength, inputValueLength)
  }

  render(){
    const { timerTime, timerStart, timerOn } = this.props;

    let score = this.props.player.score
    let level = this.props.player.level
    let notification = this.props.notification.text
    const reset = this.props.game.reset
    const isMobile = this.props.isMobile

    // Show solved word when game is over, else, show letters:
    let displayWordVal = reset ? this.props.word.current.split('') : this.props.word.letters

    let guess = this.getGuess()
    const btnRestartText = this.props.player.levelup ? "Next Level" : "New Game"

    const displayWord = displayWordVal.map((el,i) => {
      var letterText = el.char ? el.char : el
      var letterKey = el.id ? el.id : i + 1
      var letterClass = `letter ${el.used ? '--used':''}`
      return(
        <Button 
          class={letterClass} 
          handleClick={() => !el.used ? this.handleLetterClickAndFocus(el) : false} 
          key={letterKey}
          text={letterText}
        />  
      )
    })

    if (this.props.game.active && timerOn === false && (timerTime === timerStart)){
      this.props.startTimer()
    }

    let seconds = timerTime

    return(
      <React.Fragment>

        { this.props.game.started && 
          <div className="game-stats">
            <GameStat icon="score" stat={score} />
            <GameStat icon="level" stat={level} />
          </div>
        }

        <div className={`word-row ${reset ? '--reset':''}`}>

          <div className="game-timer">
            { this.props.game.started && <GameTimer seconds={seconds}/> }
          </div>

          {this.props.game.started && <GameWord word={displayWord} />}
        </div>
        
        {reset && 
          <Notification text={notification} />
        }

        {reset && 
          <Button 
            handleClick={this.props.restartGame} 
            class="btn m-auto m-t15" 
            text={btnRestartText} 
            icon={`ri-play-fill ri-lg m-l5`} />}

        {this.props.game.started && this.props.game.active && 
          <form 
            onSubmit={this.handleSubmit} 
            className="game-form"
          >
            {isMobile ? 
              <GuessMobile
                guess={guess}
                handleBackspace={this.props.handleBackspace}
              /> : 
              <TextInput
                placeholder="Guess a word..."
                name="guess"
                content={guess}
                handleChange={this.handleInput}
                class="game-guess"
                onClick={this.onInputClick}
                inputRef={this.textInput}
              /> 
            }

            <Notification text={notification} />

            <div className="buttons">
              <Button
                text="Shuffle"
                handleClick={this.props.updateShuffledState}
                class="btn--secondary"
                icon="ri-space m-l5"
              />
              <Button
                text="Submit"
                handleClick={this.handleSubmit}
                class={`btn--secondary ${guess.length < 3 ? 'disabled':''}`}
                icon="ri-arrow-right-line m-l5"
              />
            </div>
          </form>
        }

      </React.Fragment>
    )
  }

}

export default GameContainer