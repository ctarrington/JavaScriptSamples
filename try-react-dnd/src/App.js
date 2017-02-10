import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

import BlueBasket from './components/BlueBasket';
import RedBasket from './components/RedBasket';


class App extends Component {
  constructor() {
    super();

    this.state = {
      baskets: {
        red: {
          apples: ['Red Delicious'],
          oranges: ['Navel']
        },
        blue: {
          apples: ['Golden Delicious'],
          oranges: []
        }
      }
    };
  }

  add (baskets, color, item) {
    baskets[color].apples.push(item);
  }

  remove(baskets, color, item) {
    const position = baskets[color].apples.indexOf(item);
    baskets[color].apples.splice(position, 1);
  }

  moveFruit(from, to, item) {
    console.log('move fruit', 'from', from, 'to', to, 'item', item);
    const newBaskets = this.state.baskets;

    this.remove(newBaskets, from, item);
    this.add(newBaskets, to, item);
    this.setState({ baskets: newBaskets });
  }

  render() {

    console.log('state', this.state);

    return (
      <div className="App">
        <div className="baskets">
          <BlueBasket apples={this.state.baskets.blue.apples} oranges={this.state.baskets.blue.oranges} moveFruit={this.moveFruit.bind(this)} />
          <RedBasket apples={this.state.baskets.red.apples} oranges={this.state.baskets.red.oranges} moveFruit={this.moveFruit.bind(this)} />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
