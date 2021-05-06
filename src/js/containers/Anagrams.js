import React, { Component } from 'react'

class Anagrams extends Component {
  constructor(props){
    super(props)
    this.state = {}

    // Methods:
    this.chunkAnagrams = this.chunkAnagrams.bind(this)    
  }

  componentDidMount(){
    console.log("*** anagrams mounted ***")
  }

  // Split anagrams into columns for UI purposes:
  chunkAnagrams(array,chunkSize){
    let result = [];
    while(array.length) {
      result.push(array.splice(0,chunkSize))
    }
    return result
  }

  render(){
    let anagrams = this.props.anagrams.map((a) => {
      // Show the solved anagram if users solves, or game round ends:
      let showSolved = (a.solved || this.props.game.reset)

      // Split word into individual chars:
      let word = a.anagram.split('').map((char,i) => { 
        return (
        <span
          key={i}
          className="char">
          {(showSolved) ? char : "-"}
        </span>
        ) 
      })

      // Return word in list element:
      return( 
        <li 
        className={`anagram ${showSolved ? '--show':''} ${a.solved ? '--solved':''}`} 
        key={a.id}>
          {word}
        </li> 
      )
    })

    let anagramsCols = this.chunkAnagrams(anagrams,4).map((col,i) => {
      return (<ul key={i} className="anagram-column">{col}</ul>)
    })

    let showAnagrams = this.props.game.started && anagramsCols.length

    return(
      <React.Fragment>

        { showAnagrams && <div className="anagrams-container">{anagramsCols}</div>}

      </React.Fragment>
    )
  }

}

export default Anagrams;