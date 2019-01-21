import React, { Component } from 'react';

class Board extends Component {




// add "player 1" and "player 2" areas on the left and right of the game board, have some kind of indicator that highlights whose turn it is (by selecting their side/section and making it glow or something). this section should also record how many total wins each player has. maybe first to 10 wins the game?

constructor(props){
  super(props)
  // need to write method to designate between players turns (X,O)
  this.state = {
    turn: 1,
    winMessage: "",
    //whoseTurn: "X",
    board: [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
  }
}


playerTurn(e){
  let {board, turn, winMessage} = this.state

  //Update board with player position
  let id = e.target.id

  if (turn > 10){
    return
  }
  if(board[id] === " "){
    turn++
    if(turn % 2 === 0){
      board[id] = 'X'
      // whoseTurn = "X"
    } else {
      board[id] = 'O'
      // whoseTurn = "O"
    }
  }

  //Check for winner
  //Set up winning possibilities
  let winningArr = [[0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [2,4,6]]
  //Iterate over winning combinations?
  let winner = winningArr.filter((combo, index, array )=>{

    let [a, b, c] = combo
    if ( board[a] === 'X' && board[b] === 'X' && board[c] === 'X' ) {
      winMessage = "X is Winner"
      turn = turn + 5
      return combo
    } else if ( board[a] === 'O' && board[b] === 'O' && board[c] === 'O' ) {
      winMessage = "O is Winner"
      turn = turn + 5
      return combo
      // make the below line call a function, that contains .map and is defined earlier in code
    } else if ( board[1] !== " " && board[2] !== " " && board[3] !== " " && board[4] !== " " && board[5] !== " " && board[6] !== " " && board[7] !== " " && board[8] !== " " && board[9] !== " " ) {
      winMessage = "Stalemate!"
    }
  })

  this.setState({turn: turn, board: board, winMessage: winMessage})
}

restart(){
  this.setState ({
    turn: 1,
    winMessage: ' ',
    board: [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
  })
}

render() {
  let {winMessage} = this.state
  let squares = this.state.board.map((val, index) => {

    return  (
      <div onClick={this.playerTurn.bind(this)} key={index} id={index} className="grid-item">{val}</div>

    )
  })
  return (
<div>
    <div className="Board">
      <div className="grid-container">
        {squares}
      </div>
    </div>
    <button onClick={this.restart.bind(this)}>Restart</button>
    <div>{winMessage}</div>
</div>
  );
}





//create 3x3 grid container with grid items

// <div class="grid-container">
//   <div onClick={this.playerTurn.bind(this)} id = '0' class="grid-item">{this.state.square[0]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '1' class="grid- item">{this.state.square[1]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '2' class="grid-item">{this.state.square[2]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '3' class="grid-item">{this.state.square[3]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '4' class="grid-item">{this.state.square[4]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '5' class="grid-item">{this.state.square[5]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '6' class="grid-item">{this.state.square[6]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '7' class="grid-item">{this.state.square[7]}</div>
//   <div onClick={this.playerTurn.bind(this)} id = '8' class="grid-item">{this.state.square[8]}</div>
// </div>
// )}
}



export default Board;
