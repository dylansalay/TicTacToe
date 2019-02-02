import React, { Component } from 'react';
import './App.css';
import Board from './board.js'

class App extends Component {
  render() {
    return (
      <div>
        <header className='Header'>Tic Tac Toe</header>
        <div className="App"><Board/></div>
      </div>
    )
  }
}

export default App;
