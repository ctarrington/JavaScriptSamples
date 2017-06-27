import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './greetings/Greeting'
import Warning from './warnings/Warning'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Greeting name="Fred" />
        <Warning message="This is a test of the silly warning system." />

      </div>
    );
  }
}

export default App;
