import React, { Component } from 'react';

class Board extends Component {
  constructor(props){
    super(props)
      this.state = { // Set initial state
        board: Array(9).fill(""), // Start with a blank game board
        turn: 0, // No turns have occurred yet
        xWinCount: 0, // No wins have occurred yet
        oWinCount: 0, // No wins have occurred yet
        statusMessage: "" // No status message to display yet
      }
    }

  // This function contains most of the game's logic
  playerTurn(e){

    let id = e.target.id // Recognize which game tile is clicked for event

    let { // Deconstruction of this.state objects to be manipulated in playerTurn() function
      board,
      turn,
      xWinCount,
      oWinCount,
      statusMessage
      } = this.state

    let winningArr = [ // Define which array index combinations would constitute a "win"
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]]

    let winner = winningArr.filter((combo) => { // Look for winning array combinations on game board
      let [a, b, c] = combo // Create variable
      if (turn >= 10){ // Detect if the game board has been filled without a win occurring, and stop the game if so
        return
      }

      // Determine which player's move it is, and render the game tile accordingly
      if(board[id] === ""){ // Only allow this to occur with unclicked tiles (prevents multiple events on the same tile)
        turn++ // Advance the game's turn counter
        if(turn % 2 === 0){ // Recognize when it is Player O's turn
          board[id] = 'o' // Place an 'O' on corresponding game tile
        } else { // Recognize when it is Player X's turn
          board[id] = 'x' // Place an 'X' on corresponding game tile
        }
      }

      // Detect if a winning array combo has been satisfied by Player X
      if ( board[a] === 'x' && board[b] === 'x' && board[c] === 'x' ) {
        statusMessage = "X wins!" // Render message declaring Player X as winner
        turn = 10 // Prevent additional turns
        xWinCount++ // Add a win to Player X's counter
        return combo // Stop game

      // Do the same for Player O
      } else if ( board[a] === 'o' && board[b] === 'o' && board[c] === 'o' ) {
        statusMessage = "O Wins!"
        turn = 10
        oWinCount++
        return combo

      // Declare a stalemate
      } else if ( turn === 9 ) {
        statusMessage = "Draw!"
        return
      }
    })

    // Update current state
    this.setState({
      board: board,
      turn: turn,
      xWinCount: xWinCount,
      oWinCount: oWinCount,
      statusMessage: statusMessage
    })
  }

  // This resets the game board by creating a new blank array, setting the turn counter back to zero, and clearing the status message
  restart(){
    this.setState ({
      board: Array(9).fill(""),
      turn: 0,
      statusMessage: ""
    })
  }

  // Contents to be displayed on screen
  render() {
    let {
      board,
      turn,
      xWinCount,
      oWinCount,
      statusMessage
      } = this.state
    let squares = this.state.board.map((val, index) => {
      return  (
        <div onClick={this.playerTurn.bind(this)} key={index} id={index} className="grid_item">{val}</div>
      )
    })
    return (
      <div id="contents_container">
        <div id="main_container">
          <div id="x_score_container">
            <p id="x_name">Player X:<br></br><span id="x_score">{xWinCount}</span></p>
          </div>
          <div id="board_container">
            <div className="grid_container">{squares}</div>
          </div>
          <div id="o_score_container">
            <p id="o_name">Player O:<br></br><span id="o_score">{oWinCount}</span></p>
          </div>
        </div>
        <div id="bottom_container">
          <div id="button_container">
            <button id="restart" onClick={this.restart.bind(this)}>Restart</button>
          </div>
          <div id="status">{statusMessage}</div>
        </div>
      </div>
    );
  }
}

export default Board;
