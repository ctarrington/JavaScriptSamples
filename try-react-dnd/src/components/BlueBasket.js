import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import ItemTypes from './ItemTypes';
import Apple from './Apple';

const fruitTarget = {
  drop() {
    return { color: 'blue' };
  }
};

function collectDrop(connect, monitor) {
  const collected = {
    connectDropTarget: connect.dropTarget(),
  };

  return collected;
}

class BlueBasket extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      (
        <div className="basket blue-basket">
          <div>Drop Fruit Here</div>
          {
            this.props.apples.map((apple, index) => {
              console.log('apple', apple, 'index', index);
              return <Apple type={apple} key={index} moveFruit={this.props.moveFruit.bind(this)} from='blue' />
            })
          }
          <div>{JSON.stringify(this.props)}</div>
        </div>
      )
    );
  }


}

const dropTarget = DropTarget(ItemTypes.FRUIT, fruitTarget, collectDrop)(BlueBasket);
export default dropTarget;
