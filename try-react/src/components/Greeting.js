import React, { Component } from 'react';

class Greeting extends Component {
  render() {
    return (
      <div className="Greeting">
        Hi, {this.props.person.name}, how ya doing? 
      </div>
    );
  }


}

export default Greeting;