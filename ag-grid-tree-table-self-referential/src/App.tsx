import './App.css';
import CarTable from './CarTable.tsx';
import { useCallback, useState } from 'react';
import type { Child } from './models.ts';

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
];

function App() {
    const [rowData, setRowData] = useState<Child[]>(defaultRowData);
    const updateRow = useCallback(
        (newRow: Child) => {
            console.log(newRow);
            const matchIndex = rowData.findIndex((row) => row.id === newRow.id);
            if (matchIndex !== -1) {
                const modifiedRowData = [...rowData];
                modifiedRowData[matchIndex] = newRow;
                setRowData(modifiedRowData);
            } else {
                setRowData([...rowData, newRow]);
            }
        },
        [rowData]
    );

    return (
        <div>
            <CarTable rowData={rowData} updateRow={updateRow} />
            <div>{JSON.stringify(rowData, null, 2)}</div>
        </div>
    );
}

export default App;
