import React, { Component } from 'react';
import './App.css';

import { CarList } from './CarList';
import { CarForm } from './CarForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cars - React plus Redux</h1>
        </header>
        <CarList />
        <CarForm />
      </div>
    );
  }
}

export default App;
