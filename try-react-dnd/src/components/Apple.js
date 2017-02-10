import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';


const fruitSource = {
  beginDrag(props) {
    console.log('begin drag')
    return {
      name: props.type,
      from: props.from
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log('Apple dropResult', dropResult, 'item', item);
      props.moveFruit(item.from, dropResult.color, item.name);
    }
  },
};

function collect(connect, monitor) {

  const collected = {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging
  };

  console.log('Apple collected', collected);
  return collected;
}

function collectDrop(connect, monitor) {

  const collected = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };

  console.log('Apple collectDrop collected', collected);
  return collected;
}

const fruitTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
  }
}

class Apple extends Component {
  render() {
    const { connectDragSource } = this.props;

    return (
      connectDragSource(
        <div className="fruit apple">
          Apple {this.props.type}
        </div>
      )
    );
  }
}

const dropTarget = DropTarget(ItemTypes.FRUIT, fruitTarget, collectDrop)(Apple);
export default DragSource(ItemTypes.FRUIT, fruitSource, collect)(dropTarget);
