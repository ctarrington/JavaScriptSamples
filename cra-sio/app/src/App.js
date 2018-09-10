import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      averageTemperature: 0
    };
  }

  componentDidMount() {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log('got connection');
    });

    socket.on('data', (data) => {
      console.log('data', data);

      const total = data.reduce((sum, current) => {
        return sum + current.temperature;
      }, 0);
      this.setState({averageTemperature: total / data.length});

    });
  }

  render() {
    return (
      <div>
        Average temperature: {this.state.averageTemperature}
      </div>
    );
  }
}

export default App;
