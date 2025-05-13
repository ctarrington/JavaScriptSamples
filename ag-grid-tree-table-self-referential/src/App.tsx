import './App.css';
import CarTable from './CarTable.tsx';
import { useCallback, useEffect, useState } from 'react';
import type { Car, Child, Folder } from './models.ts';

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

function getInitialData() {
    const existingData = JSON.parse(
        localStorage.getItem('selfReferentialCarRowData') ?? '[]'
    );
    return existingData.length > 0 ? existingData : defaultRowData;
}

function App() {
    const [maxId, setMaxId] = useState<number>(7);
    const [rowData, setRowData] = useState<Child[]>(getInitialData());

    useEffect(() => {
        localStorage.setItem(
            'selfReferentialCarRowData',
            JSON.stringify(rowData)
        );
    }, [rowData]);

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

    const createFolder = useCallback(() => {
        const newRow: Folder = {
            id: '' + maxId,
            name: 'Name...',
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
            <button onClick={createFolder}>Create Folder</button>
        </div>
    );
}

export default App;
