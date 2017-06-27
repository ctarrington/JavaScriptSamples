import React, { Component } from 'react';
import './Greeting.css';

class Greeting extends Component {
  render() {
    const name = this.props.name || '';
    return (
      <div className="greeting">
        Yo yo yo to {name.toUpperCase()}
      </div>
    );
  }
}

export default Greeting;
