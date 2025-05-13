import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    ModuleRegistry,
    RowDragModule,
} from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useEffect, useState } from 'react';
import type { Child } from './models.ts';

// Register all Community features
ModuleRegistry.registerModules([
    AllCommunityModule,
    RowDragModule,
    TreeDataModule,
]);

// https://www.ag-grid.com/javascript-data-grid/tree-data-nesting/

const defaultRowData = [
    {
        name: 'Top',
        children: [
            {
                name: 'Compact Cars',
                children: [
                    {
                        name: 'car1',
                        make: 'Honda',
                        model: 'Civic',
                    },
                ],
            },
        ],
    },
    {
        name: 'Bottom',
        children: [
            {
                name: 'Other Cars',
                children: [
                    {
                        name: 'car3',
                        make: 'Toyota',
                        model: 'Coralla',
                    },
                ],
            },
        ],
    },
];

function CarTable() {
    // Row Data: The data to be displayed.
    const [rowData] = useState<Child[]>(defaultRowData);

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }];

    useEffect(() => {
        localStorage.setItem('nestedCarRowData', JSON.stringify(rowData));
    }, [rowData]);

    return (
        <>
            <div>
                <div style={{ height: 500 }}>
                    <AgGridReact
                        treeData={true}
                        rowData={rowData}
                        columnDefs={colDefs}
                        groupDefaultExpanded={-1}
                        autoGroupColumnDef={{
                            headerName: 'Name',
                            field: 'name',
                            cellRendererParams: { suppressCount: true },
                        }}
                        treeDataChildrenField="children"
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
