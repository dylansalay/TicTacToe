import React, { Component } from 'react';

class Board extends Component {

constructor(props){
  super(props)
  this.state = {
    turn: 0,
    statusMessage: "",
    board: Array(9).fill(""),
    xWinCount: 0,
    oWinCount: 0
  }
}

playerTurn(e){
  let id = e.target.id
  let {
    board,
    turn,
    statusMessage,
    xWinCount,
    oWinCount
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
        board[id] = '●'
      } else {
        board[id] = '■'
      }
    }
    if ( board[a] === '■' && board[b] === '■' && board[c] === '■' ) {
      statusMessage = "■ is Winner"
      turn = 10
      xWinCount++
      return combo
    } else if ( board[a] === '●' && board[b] === '●' && board[c] === '●' ) {
      statusMessage = "● is Winner"
      turn = 10
      oWinCount++
      return combo
    } else if ( turn === 9 ) {
      statusMessage = "Stalemate"

    }
  })
  this.setState({
    turn: turn,
    board: board,
    statusMessage: statusMessage,
    xWinCount: xWinCount,
    oWinCount: oWinCount
  })
}

restart(){
  this.setState ({
    turn: 0,
    statusMessage: "",
    board: Array(9).fill("")
  })
}

render() {
  let {
    statusMessage,
    xWinCount,
    oWinCount,
    turn
    } = this.state
  let squares = this.state.board.map((val, index) => {
      function hideButton() {
        if (turn < 9) {
        var button = document.getElementById("button")
        button.style.display = 'none';
        }
      }
    return  (
      <div onClick={this.playerTurn.bind(this)} key={index} id={index} className="grid-item">{val}</div>
    )
  })
  return (
      <div>
        <div className="Board">
          <div className="grid-container">{squares}</div>
        </div>
        <button id="button" onClick={this.restart.bind(this)}>Restart</button>
        <div className="winmsg">
          <div>X wins: {xWinCount}</div>
          <div>O wins:{oWinCount}</div>
          <div>{statusMessage}</div>
        </div>
    </div>
  );}
}

export default Board;
