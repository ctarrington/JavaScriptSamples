import './App.css';

import { AgGridReact } from 'ag-grid-react';

import type { ColDef } from 'ag-grid-community';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback, useState } from 'react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);
type Car = {
    parents: string[];
    name: string;
    make: string;
    model: string;
    price: number;
    electric: boolean;
};

function App() {
    // Row Data: The data to be displayed.
    const [rowData] = useState<Car[]>([
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
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
        { field: 'electric' },
    ];

    const getDataPath = useCallback((car: Car) => {
        return [...car.parents, car.name];
    }, []);

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
                    />
                </div>
                <div>{JSON.stringify(rowData)}</div>
            </div>
        </>
    );
}

export default App;
