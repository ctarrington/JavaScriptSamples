import * as React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
    cars: state.cars,
});

const renderCars = (cars: any) => {
    return cars.map((car: any) => (<div key={car.id}>{car.make} {car.model}</div>));
};

const unconnected = (props: any) => {
    const { cars } = props;
    return <div className="carlist">{renderCars(cars)}</div>;
};

const CarList = connect(mapStateToProps)(unconnected);

export { CarList };