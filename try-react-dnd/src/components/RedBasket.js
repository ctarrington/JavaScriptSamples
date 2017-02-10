import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import ItemTypes from './ItemTypes';
import Apple from './Apple';

const fruitTarget = {
  drop() {
    return { color: 'red' };
  }
};

function collectDrop(connect, monitor) {
  const collected = {
    connectDropTarget: connect.dropTarget(),

  };

  console.log('RedBasket collected', collected);
  return collected;
}

class RedBasket extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      (
        <div className="basket red-basket">
          <div>Drop Fruit Here</div>
          {
            this.props.apples.map((apple, index) => {
              return <Apple type={apple} key={index} moveFruit={this.props.moveFruit.bind(this)} from='red' />
            })
          }
          <div>{JSON.stringify(this.props)}</div>
        </div>
      )
    );
  }


}

const dropTarget = DropTarget(ItemTypes.FRUIT, fruitTarget, collectDrop)(RedBasket);
export default dropTarget;
