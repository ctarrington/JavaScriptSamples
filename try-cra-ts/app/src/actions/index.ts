let nextCarId = 0;

const addCar = (make: string, model: string) => ({
    id: nextCarId++,
    make,
    model,
    type: 'ADD_CAR',
});

export { addCar };