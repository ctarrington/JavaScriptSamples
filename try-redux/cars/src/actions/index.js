let nextCarId = 0;

const addCar = (make, model) => ({
  type: 'ADD_CAR',
  id: nextCarId++,
  make,
  model,
});

export { addCar };
