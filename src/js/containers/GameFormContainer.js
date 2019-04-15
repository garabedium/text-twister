import React, { Component } from 'react'
import SplashPage from './SplashPage'
import Modal from '../components/Modal'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

class GameFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      word:"",
      guess: [],
      charCodes: [],
      charCodesUsed: [],
      notifications: [],
      seconds: 10
    }
    // Class Methods:
    this.handleChange = this.handleChange.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.shuffleWord = this.shuffleWord.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount(){
    console.log("*** gameForm mounted ***")
    this.handleSpacebarPress()

    let charCodes
    if (this.state.charCodes.length === 0 && this.state.charCodesUsed.length === 0){
      charCodes = this.props.charCodes
    }

    this.setState({
      word: this.props.word,
      charCodes: this.state.charCodes.concat(charCodes)
    })
  }

  startTimer(){
    let timer

    if (this.state.seconds > 0){
      timer = setInterval(() => countDown(), 1000);
    }

    let countDown = () => {
      let seconds = this.state.seconds - 1
      this.setState({ seconds: seconds })
      if (seconds === 0){
        clearInterval(timer)
        this.props.updateGameState(false)
      }
    }
  }

  shuffleWord(){
    const shuffled = this.props.shuffleWord(this.state.word)
    return this.setState({ word: shuffled })
  }

  // Shuffle word on spacebar press:
  handleSpacebarPress(){
    document.body.onkeyup = (e) => {
      return (e.keyCode === 32) ? this.shuffleWord() : false
    }
  }

  // Check if word was already solved:
  isDuplicateWord(){
    const guess = this.state.guess.join('')
    return this.props.player.solved.indexOf(guess) > -1
  }

  concatCharCodes(){
    return charCodes.concat(charCodesUsed)
  }

  handleSubmit(event){
    event.preventDefault()
    const guess = this.state.guess.join('')

    if (guess.length >= 3){
      if (this.isDuplicateWord()) {
        this.addNotification("You already solved that word!")
      } else {
        this.props.checkWord(guess)
        this.handleClear()
      }
    } else {
      return false
    }
  }

  handleKeypress(event){
    // const charCode = event.charCode
    // const char = String.fromCharCode(charCode)

    // if (this.props.charCodes.indexOf(charCode) < 0 && charCode !== 13){
    //   event.preventDefault()
    // } else {
    //   this.setState({
    //     guess: this.state.guess.concat(char)
    //   })
    // }
  }

  handleChange(event){

    if (event.type === "keypress"){

      let charCodes = this.state.charCodes
      const charCode = event.charCode
      const char = String.fromCharCode(charCode)
      const keyEnter = 13

      // Only allow chars that are in the word:
      if (charCodes.indexOf(charCode) < 0 && charCode !== keyEnter){
        event.preventDefault()
      } else if (charCode !== keyEnter){

        const index = charCodes.indexOf(charCode)
        charCodes.splice(index,1);

        this.setState({
          guess: this.state.guess.concat(char),
          charCodes: charCodes,
          charCodesUsed: this.state.charCodesUsed.concat(charCode)
        })
      }

    }

    if (event.type === "keydown"){
      // future: keyCode is deprecated
      const keyCode = event.keyCode
      const keyBackspace = 8
      let charCodesUsed = this.state.charCodesUsed

      if (keyCode === keyBackspace && this.state.charCodesUsed.length >= 1){
        const lastChar = this.state.guess.pop().charCodeAt()
        charCodesUsed.splice(-1)

        this.setState({
          charCodes: this.state.charCodes.concat(lastChar),
          charCodesUsed: charCodesUsed
        })
      }
    }

  }

  handleClear(){
    const charCodes = this.state.charCodes.concat(this.state.charCodesUsed)
    this.setState({
      guess: [],
      charCodes: charCodes,
      charCodesUsed: []
    })
  }

  addNotification(text){
    // To do:
    // - create & attach setTimeout to remove notification
    const notification = { text: text }
    return this.setState({ notifications: this.state.notifications.concat(notification) })
  }

  render(){

    let score = this.props.player.score
    let level = this.props.player.level

    const word = this.state.word.split('').map((char,i) => {
      return( <li className="word__letter" key={i}>{char}</li> )
    })

    let guess = this.state.guess.join('')

    let notifications = this.state.notifications.map((item,i) => {
      return (<li key={i}>{item.text}</li>)
    })

    if (this.props.game.active && this.state.seconds === 10){
      this.startTimer()
    }

    return(
      <React.Fragment>
        <header className="site-header">
          <h1 className="logo">Text Twister JS</h1>
        </header>
        <div className="word-row">
          {this.props.game.started ? <div className="game-points">
            <span className="game-points__title">Points:</span>
            <span className="game-points__score">{score}</span>
          </div> : null}
          <div className="game-timer">
            {this.props.game.started ? <span>{this.state.seconds}</span> : 
              <Button
                text=">"
                handleClick={this.props.startGame}
              />
            }
          </div>
          {this.props.game.started ? <div className="game-level">
            <span className="game-level__title">Level:</span>
            <span className="">{level}</span>
          </div> : null}
          {this.props.game.started && <ul className="word">{word}</ul>}
          {!this.props.game.started && <div className="word">Play the game.</div>}
        </div>

        {notifications.length >= 1 ? <ul>{notifications}</ul> : null}

        {this.props.game.started && 
          <form onSubmit={this.handleSubmit} className="game-form">
            <FormInput
              placeholder="Guess a word..."
              name="guess"
              content={guess}
              handleChange={this.handleChange}
              class="game-form__input"
            />
            <Button
              text="Shuffle"
              handleClick={this.shuffleWord}
              class="game-form__button game-form__button--shuffle"
            />
            <Button
              text="Submit"
              handleClick={this.handleSubmit}
              class="game-form__button game-form__button--submit"
            />
          </form>
        }
      </React.Fragment>
    )
  }

}

export default GameFormContainer

// handleKeypress={this.handleKeypress}

// {this.props.game.splash ?
//   <Modal
//     class="modal"
//     content={<SplashPage removeSplash={this.props.removeSplash} />}
//   /> : null
//   }