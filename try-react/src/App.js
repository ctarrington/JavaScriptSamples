import React, { Component } from 'react';
import logo from './logo.svg';
import Greeting from './components/Greeting'
import './App.css';



class App extends Component {
  render() {

    var people = [{name:'Fred'}, {name:'Ted'}, {name:'Sid'}, {name:'Nancy'}];

    var rows = [];

    people.forEach( (person, index) => {
      rows.push(<Greeting person={person} key={index} />);
    });
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {rows}
      </div>
    );
  }
}

export default App;
