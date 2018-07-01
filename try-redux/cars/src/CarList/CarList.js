import React from 'react';
import { connect } from 'react-redux';

import { Car } from '../Car';

const mapStateToProps = state => ({
  cars: state.cars,
});

const renderCars = cars => {
  return cars.map((car, index) => <Car key={car.id} car={car} />);
};

const unconnected = ({ cars }) => {
  return <div className="carlist">{renderCars(cars)}</div>;
};

const CarList = connect(mapStateToProps)(unconnected);

export { CarList };
