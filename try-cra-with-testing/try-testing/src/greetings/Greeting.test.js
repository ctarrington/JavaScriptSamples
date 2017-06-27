import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './Greeting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Greeting name="Ted"/>, div);
});

it('renders empty name without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Greeting />, div);
});
