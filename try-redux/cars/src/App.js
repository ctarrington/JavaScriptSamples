import React, { Component } from 'react';
import './App.css';

import { CarList } from './CarList';
import { CarForm } from './CarForm';

const honda = { make: 'Honda', model: 'Accord', cylinders: 4 };
const subaru = { make: 'Subaru', model: 'Legacy', cylinders: 4 };
const cars = [honda, subaru];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cars };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(car) {
    const cars = this.state.cars;
    cars.push(car);
    this.setState(cars);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cars - React plus Redux</h1>
        </header>
        <CarList cars={this.state.cars} />
        <CarForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
