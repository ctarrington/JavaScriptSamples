import React from 'react';

const Car = props => {
  const { make, model } = props.car;
  return (
    <div className="car">
      {' '}
      {make} {model}
    </div>
  );
};

export { Car };
