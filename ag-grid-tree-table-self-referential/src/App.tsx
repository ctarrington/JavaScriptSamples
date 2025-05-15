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

function validRow(row: Child) {
    if (!row.id || !row.name) {
        return false;
    }
    if ('make' in row) {
        return row.make.length > 0 && row.make !== 'Make...';
    }

    return true;
}

function App() {
    const [maxId, setMaxId] = useState<number>(7);
    const [rowData, setRowData] = useState<Child[]>(getInitialData());
    const [newRowData, setNewRowData] = useState<Child[]>([]);
    const [make, setMake] = useState<string>('');

    useEffect(() => {
        localStorage.setItem(
            'selfReferentialCarRowData',
            JSON.stringify(rowData)
        );
    }, [rowData]);

    const createCar = useCallback(() => {
        const newCar: Car = {
            id: '' + maxId,
            name: 'Name...',
            make: make ?? 'Make...',
            model: 'Model...',
        };
        setMaxId(maxId + 1);
        setNewRowData([...newRowData, newCar]);
        setMake('');
    }, [make, maxId, newRowData]);

    const createFolder = useCallback(() => {
        const newFolder: Folder = {
            id: '' + maxId,
            name: 'Name...',
        };
        setMaxId(maxId + 1);
        setNewRowData([...newRowData, newFolder]);
    }, [maxId, newRowData]);

    // edit or create
    const upsertRow = useCallback(
        (newRow: Child) => {
            console.log(newRow);
            const matchExistingIndex = rowData.findIndex(
                (row) => row.id === newRow.id
            );
            const matchNewIndex = newRowData.findIndex(
                (row) => row.id === newRow.id
            );

            if (matchNewIndex !== -1 && validRow(newRow)) {
                setRowData([...rowData, newRow]);
                const modifiedNewRowData = newRowData.filter(
                    (row) => row.id !== newRow.id
                );
                setNewRowData(modifiedNewRowData);
            } else if (matchExistingIndex !== -1) {
                const modifiedRowData = [...rowData];
                modifiedRowData[matchExistingIndex] = newRow;
                setRowData(modifiedRowData);
            }
        },
        [rowData, newRowData]
    );

    return (
        <div>
            <CarTable
                rowData={rowData}
                upsertRow={upsertRow}
                newRowData={newRowData}
            />
            <input
                value={make}
                placeholder={'Make...'}
                onChange={(e) => setMake(e.target.value)}
            />
            <button onClick={createCar}>Create Car</button>
            <button onClick={createFolder}>Create Folder</button>
            <div>
                <div>{JSON.stringify(newRowData)}</div>
            </div>
        </div>
    );
}

export default App;
