import './App.css';
import CarTable from './CarTable.tsx';

import type { Car } from './models';

import { useCallback, useEffect, useState } from 'react';

/* very contrived, but intentionally having external context drive the creation of new data */
function App() {
    const [newCar, setNewCar] = useState<Car | null>(null);
    const [make, setMake] = useState<string>('');

    const clearNewCar = useCallback(() => {
        setNewCar(null);
    }, []);

    useEffect(() => {
        if (make !== '') {
            setNewCar({
                make,
                model: 'enter model',
                name: 'new car' + Math.round(1000 * Math.random()),
                electric: false,
                parents: [],
                price: 0,
            });
        } else {
            setNewCar(null);
        }
    }, [make]);
    return (
        <div>
            <CarTable newCar={newCar} clearNewCar={clearNewCar} />
            <div>
                <h2>New Car</h2>
                <input
                    value={make}
                    placeholder="Make..."
                    onChange={(e) => setMake(e.target.value)}
                />
            </div>
        </div>
    );
}

export default App;
