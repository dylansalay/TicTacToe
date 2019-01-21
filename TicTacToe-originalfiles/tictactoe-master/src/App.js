import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board.js'

class App extends Component {
  render() {
    return (
<div>

  <div className="App">TIC TAC TOE
    <Board/>
  </div>
</div>


    );
  }
}

export default App;
