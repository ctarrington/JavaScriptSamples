import './App.css';

import { AgGridReact } from 'ag-grid-react';

import type { ColDef } from 'ag-grid-community';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback, useEffect, useState } from 'react';
import type { Car } from './models.ts';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);

const defaultRowData = [
    {
        parents: ['foo', 'bar'],
        name: 'Freddy',
        make: 'Ford',
        model: 'Explorer',
        price: 64950,
        electric: false,
    },
    {
        parents: ['foo', 'bar'],
        name: 'Ben',
        make: 'Ford',
        model: 'F-150',
        price: 33850,
        electric: false,
    },
    {
        parents: ['foo', 'bar'],
        name: 'Rex',
        make: 'Toyota',
        model: 'Corolla',
        price: 29600,
        electric: false,
    },
    {
        parents: ['foo', 'boo'],
        name: 'Dusty',
        make: 'Toyota',
        model: 'Camry',
        price: 39600,
        electric: true,
    },
];

const getRowDataFromLocalStorage = () => {
    const localRowData = JSON.parse(localStorage.getItem('carRowData') ?? '[]');
    return localRowData.length > 0 ? localRowData : defaultRowData;
};

interface CarTableProps {
    newCar?: Car | null;
    clearNewCar: () => void;
}

function CarTable({ newCar, clearNewCar }: CarTableProps) {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<Car[]>(getRowDataFromLocalStorage());

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [
        { field: 'name', editable: true },
        { field: 'make', editable: true },
        { field: 'model', editable: true },
        { field: 'price', editable: true },
        { field: 'electric', editable: true },
    ];

    const getDataPath = useCallback((car: Car) => {
        return [...car.parents, car.name];
    }, []);

    const onCellEditingStopped = useCallback(() => {
        if (newCar) {
            setRowData([...rowData, newCar]);
            clearNewCar();
        } else {
            setRowData([...rowData]);
        }
    }, [rowData, newCar]);

    useEffect(() => {
        localStorage.setItem('carRowData', JSON.stringify(rowData));
    }, [rowData]);

    return (
        <>
            <div>
                <div style={{ height: 500 }}>
                    <AgGridReact
                        treeData={true}
                        getDataPath={getDataPath}
                        rowData={rowData}
                        columnDefs={colDefs}
                        groupDefaultExpanded={-1}
                        autoGroupColumnDef={{
                            cellRendererParams: { suppressCount: true },
                        }}
                        pinnedBottomRowData={[newCar]}
                        onCellEditingStopped={onCellEditingStopped}
                    />
                </div>
                <h2>Row Data JSON</h2>
                <div>{JSON.stringify(rowData)}</div>
                <h2>New Car JSON</h2>
                <div>{JSON.stringify(newCar)}</div>
            </div>
        </>
    );
}

export default CarTable;
