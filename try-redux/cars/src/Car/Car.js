import React from 'react';

const Car = props => {
  const { id, make, model } = props.car;
  return (
    <div className="car">
      {' '}
      {id} {make} {model}
    </div>
  );
};

export { Car };
