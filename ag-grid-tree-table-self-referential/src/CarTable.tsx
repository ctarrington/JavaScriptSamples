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

// https://www.ag-grid.com/javascript-data-grid/tree-data-self-referential/

const defaultRowData = [
    { name: 'Top' },
    {
        name: 'Compact Cars',
        parentId: 'Top',
    },
    {
        name: 'car3',
        make: 'Toyota',
        model: 'Coralla',
        parentId: 'Compact Cars',
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
                        getRowId={(params) => params.data.name}
                        treeDataParentIdField="parentId"
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
