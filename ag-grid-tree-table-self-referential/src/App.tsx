import './App.css';
import CarTable from './CarTable.tsx';
import { useCallback, useState } from 'react';
import type { Car, Child } from './models.ts';

const defaultRowData = [
    { id: '1', name: 'Top' },
    {
        id: '2',
        name: 'Compact Cars',
        parentId: '1',
    },
    {
        id: '3',
        name: 'car3',
        make: 'Toyota',
        model: 'Coralla',
        parentId: '2',
    },
    { id: '4', name: 'Bottom' },
    {
        id: '5',
        name: 'Other Cars',
        parentId: '4',
    },
    {
        id: '6',
        name: 'car6',
        make: 'Dodge',
        model: 'Dart',
        parentId: '5',
    },
];

function App() {
    const [maxId, setMaxId] = useState<number>(4);
    const [rowData, setRowData] = useState<Child[]>(defaultRowData);
    const createCar = useCallback(() => {
        const newRow: Car = {
            id: '' + maxId,
            name: 'Name...',
            make: 'Make...',
            model: 'Model...',
        };
        setMaxId(maxId + 1);
        setRowData([...rowData, newRow]);
    }, [maxId, rowData]);
    const updateRow = useCallback(
        (newRow: Child) => {
            console.log(newRow);
            const matchIndex = rowData.findIndex((row) => row.id === newRow.id);
            if (matchIndex !== -1) {
                const modifiedRowData = [...rowData];
                modifiedRowData[matchIndex] = newRow;
                setRowData(modifiedRowData);
            }
        },
        [rowData]
    );

    return (
        <div>
            <CarTable rowData={rowData} updateRow={updateRow} />
            <button onClick={createCar}>Create Car</button>
            <div>{JSON.stringify(rowData, null, 2)}</div>
        </div>
    );
}

export default App;
