import React from 'react';

import { Car } from '../Car';

const renderCars = cars => {
  return cars.map((car, index) => <Car key={index} car={car} />);
};

const CarList = props => {
  return <div className="carlist">{renderCars(props.cars)}</div>;
};

export { CarList };
