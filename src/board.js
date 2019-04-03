import React, { Component } from 'react';

class Board extends Component {
  constructor(props){
    super(props)
      this.state = {
        board: Array(9).fill(""),
        turn: 0,
        xWinCount: 0,
        oWinCount: 0,
        statusMessage: ""
      }
    }



  playerTurn(e){
    let id = e.target.id
    let {
      board,
      turn,
      xWinCount,
      oWinCount,
      statusMessage
      } = this.state
    let winningArr = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]]
    let winner = winningArr.filter((combo) => {
      let [a, b, c] = combo
      if (turn >= 10){
      return
    }
    if(board[id] === ""){
      turn++
      if(turn % 2 === 0){
        board[id] = 'o'
      } else {
        board[id] = 'x'
      }
    }
    if ( board[a] === 'x' && board[b] === 'x' && board[c] === 'x' ) {
      statusMessage = "X wins!"
      turn = 10
      xWinCount++
      return combo
    } else if ( board[a] === 'o' && board[b] === 'o' && board[c] === 'o' ) {
      statusMessage = "O Wins!"
      turn = 10
      oWinCount++
      return combo
    } else if ( turn === 9 ) {
      statusMessage = "Draw!"
    }
  })
  this.setState({
    board: board,
    turn: turn,
    xWinCount: xWinCount,
    oWinCount: oWinCount,
    statusMessage: statusMessage
  })
}

  restart(){
    this.setState ({
      board: Array(9).fill(""),
      turn: 0,
      statusMessage: ""
    })
  }

  render() {
    let {
      board,
      turn,
      xWinCount,
      oWinCount,
      statusMessage
      } = this.state
    let squares = this.state.board.map((val, index) => {
        // if (turn < 9) {
        //   var button = document.getElementById("button")
        //     button.style.display = 'none;';
        // }
      return  (
        <div onClick={this.playerTurn.bind(this)} key={index} id={index} className="grid_item">{val}</div>
      )
    })
    return (
      <div id="contents_container">
        <div id="main_container">
          <div id="score_container">
            <p id="x_name">Player X:<br></br><span id="x_score">{xWinCount}</span></p>
          </div>
          <div id="board_container">
            <div className="grid_container">{squares}</div>
          </div>
          <div id="score_container">
            <p id="o_name">Player O:<br></br><span id="o_score">{oWinCount}</span></p>
          </div>
        </div>
        <div id="button_container">
        <button id="restart" onClick={this.restart.bind(this)}>Restart</button>
        </div>
        <div id="status">{statusMessage}</div>
      </div>
    );
  }
}

export default Board;
