import './App.css';
import CarTable from './CarTable.tsx';
import { useCallback, useEffect, useState } from 'react';
import type { Car, Child, Folder } from './models.ts';

const defaultRowData: Child[] = [
    {
        id: '1',
        name: 'Sports Cars',
        type: 'folder',
        description: 'Sporty cars are fun',
    },
    {
        id: '2',
        name: 'car 2',
        make: 'Ford',
        model: 'Mustang',
        parentId: '1',
        type: 'car',
        description: 'A fast car',
    },
];

function getInitialData(key: string, defaultRowData: Child[]) {
    const existingData = JSON.parse(localStorage.getItem(key) ?? '[]');
    return existingData.length > 0 ? existingData : defaultRowData;
}

function validField(key: string, row: Child) {
    const value = row[key as keyof Child];
    if (!value || value.length === 0) {
        return false;
    }

    return !(value.toLowerCase().startsWith(key) && value.endsWith('...'));
}

function validRow(row: Child) {
    if (!row.id || row.id.length === 0) {
        return false;
    }

    if (!validField('name', row) || !validField('description', row)) {
        return false;
    }

    if (row.type === 'car') {
        return validField('make', row) && validField('model', row);
    }

    return true;
}

function App() {
    const [rowData, setRowData] = useState<Child[]>(
        getInitialData('selfReferentialCarRowData', defaultRowData)
    );
    const [newRowData, setNewRowData] = useState<Child[]>(
        getInitialData('selfReferentialNewCarRowData', [])
    );
    const [make, setMake] = useState<string>('');

    useEffect(() => {
        localStorage.setItem(
            'selfReferentialCarRowData',
            JSON.stringify(rowData)
        );
    }, [rowData]);

    useEffect(() => {
        localStorage.setItem(
            'selfReferentialNewCarRowData',
            JSON.stringify(newRowData)
        );
    }, [newRowData]);

    const createCar = useCallback(() => {
        const newMake = make.trim().length === 0 ? 'Make...' : make;
        const newCar: Car = {
            id: '' + Date.now(),
            name: 'Name...',
            make: newMake,
            model: 'Model...',
            description: 'Description...',
            type: 'car',
        };
        setNewRowData([...newRowData, newCar]);
        setMake('');
    }, [make, newRowData]);

    const createFolder = useCallback(() => {
        const newFolder: Folder = {
            id: '' + Date.now(),
            name: 'Name...',
            description: 'Description...',
            type: 'folder',
        };
        setNewRowData([...newRowData, newFolder]);
    }, [newRowData]);

    // edit or create
    const upsertRow = useCallback(
        (newRow: Child) => {
            const matchExistingIndex = rowData.findIndex(
                (row) => row.id === newRow.id
            );
            const matchNewIndex = newRowData.findIndex(
                (row) => row.id === newRow.id
            );

            if (matchNewIndex !== -1) {
                if (validRow(newRow)) {
                    // The new row is valid
                    setRowData([...rowData, newRow]);
                    const modifiedNewRowData = newRowData.filter(
                        (row) => row.id !== newRow.id
                    );
                    setNewRowData(modifiedNewRowData);
                } else {
                    // The new row needs to be updated
                    const modifiedNewRowData = [...newRowData];
                    modifiedNewRowData[matchNewIndex] = newRow;
                    setNewRowData(modifiedNewRowData);
                }
            } else if (matchExistingIndex !== -1) {
                const modifiedRowData = [...rowData];
                modifiedRowData[matchExistingIndex] = newRow;
                setRowData(modifiedRowData);
            } else {
                // new row
                setNewRowData([...newRowData, newRow]);
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
        </div>
    );
}

export default App;
