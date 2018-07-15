const cars = (state = [{ make: 'Honda', model: 'Pilot', id: 0 }], action: any) => {
    switch (action.type) {
        case 'ADD_CAR':
            return [
                ...state,
                {
                    id: action.id,
                    make: action.make,
                    model: action.model,
                },
            ];
        default:
            return state;
    }
};

export default cars;