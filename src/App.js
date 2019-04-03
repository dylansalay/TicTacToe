import React, { Component } from 'react';
import './App.css';
import Board from './board.js'

class App extends Component {
  render() {
    return (
      <div>
        <h1 id='header'>Tic-Tac-Toe</h1>
        <div id='board_container'>
          <Board/>
        </div>
      </div>
    )
  }
}

export default App;
