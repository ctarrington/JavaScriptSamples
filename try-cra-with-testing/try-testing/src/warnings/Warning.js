import React, { Component } from 'react';
import './Warning.css';

class Warning extends Component {
  render() {
    return (
      <div className="warning">
        Warning: {this.props.message}
      </div>
    );
  }
}

export default Warning;
