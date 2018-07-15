import * as React from 'react';
import './App.css';

import { CarForm } from './CarForm';
import { CarList } from './CarList';



class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cars with Redux</h1>
          <CarList />
          <CarForm />
        </header>
      </div>
    );
  }
}

export default App;
