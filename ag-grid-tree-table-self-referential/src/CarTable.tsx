import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    ModuleRegistry,
    RowDragModule,
    type ValueGetterFunc,
    type ValueGetterParams,
    type ValueSetterFunc,
    type ValueSetterParams,
} from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback, useEffect } from 'react';
import type { Car, Child, Folder } from './models.ts';

// Register all Community features
ModuleRegistry.registerModules([
    AllCommunityModule,
    RowDragModule,
    TreeDataModule,
]);

// see https://www.ag-grid.com/javascript-data-grid/tree-data-self-referential/

interface CarTableProps {
    rowData: Child[];
    updateRow: (row: Child) => void;
}

function CarTable({ rowData, updateRow }: CarTableProps) {
    // see https://www.ag-grid.com/react-data-grid/value-setters/
    const childValueSetter: ValueSetterFunc<Car> = useCallback(
        (params: ValueSetterParams<Car>) => {
            const { data: newRow, colDef, newValue } = params;
            if (!colDef.field) {
                return false;
            }

            newRow[colDef.field] = newValue;
            console.log('newRow', newRow);
            updateRow(newRow);

            return true;
        },
        [updateRow]
    );

    const folderValueSetter: ValueSetterFunc<Folder> = useCallback(
        (params: ValueSetterParams<Folder>) => {
            console.log('folderValueSetter', params);
            const { data: newRow, colDef, newValue } = params;
            if (colDef.headerName !== 'Name') {
                return false;
            }

            newRow.name = newValue;
            console.log('newRow', newRow);
            updateRow(newRow);

            return true;
        },
        [updateRow]
    );

    const folderValueGetter: ValueGetterFunc<Folder> = useCallback(
        (params: ValueGetterParams<Folder>) => {
            return params.data?.name ?? 'what';
        },
        []
    );

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [
        { field: 'make', editable: true, valueSetter: childValueSetter },
        { field: 'model', editable: true, valueSetter: childValueSetter },
    ];

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
                            editable: true,
                            cellRendererParams: { suppressCount: true },
                            valueSetter: folderValueSetter,
                            valueGetter: folderValueGetter,
                        }}
                        getRowId={(params) => params.data.id}
                        treeDataParentIdField="parentId"
                        editType="fullRow"
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
