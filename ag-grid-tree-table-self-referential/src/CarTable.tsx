import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    ModuleRegistry,
    type RowDragEvent,
    RowDragModule,
    type ValueGetterFunc,
    type ValueGetterParams,
    type ValueSetterFunc,
    type ValueSetterParams,
} from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback } from 'react';
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

function getAncestors(rowData: Child[], id: string): string[] {
    const child = rowData.find((row) => row.id === id);
    if (!child) {
        return [];
    } else if (!child.parentId) {
        return [id];
    } else {
        return [id, ...getAncestors(rowData, child.parentId)];
    }
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
            const { api, node, data: newRow, colDef, newValue } = params;
            if (colDef.headerName !== 'Name' || !node) {
                return false;
            }

            newRow.name = newValue;
            updateRow(newRow);

            api.setRowNodeExpanded(node, true);
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

    const onRowDragEnd = useCallback(
        (event: RowDragEvent) => {
            console.log('rowDragEnd', event);
            const { overNode, node } = event;

            if (!overNode) {
                return false;
            }

            const isFolder = !Object.keys(overNode.data).includes('make');
            const newParentId = isFolder
                ? overNode.data.id
                : overNode.data.parentId;

            // The new parent cannot have the node as an ancestor
            const ancestorIds: string[] = getAncestors(rowData, newParentId);
            if (ancestorIds.includes(node.data.id)) {
                return false;
            }

            const newRowData = { ...node.data };
            newRowData.parentId = newParentId;
            updateRow(newRowData);
        },
        [rowData, updateRow]
    );

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [
        { field: 'make', editable: true, valueSetter: childValueSetter },
        { field: 'model', editable: true, valueSetter: childValueSetter },
    ];

    return (
        <>
            <div>
                <div style={{ height: 400 }}>
                    <AgGridReact
                        treeData={true}
                        rowData={rowData}
                        columnDefs={colDefs}
                        groupDefaultExpanded={-1}
                        autoGroupColumnDef={{
                            rowDrag: true,
                            headerName: 'Name',
                            editable: true,
                            cellRendererParams: { suppressCount: true },
                            valueSetter: folderValueSetter,
                            valueGetter: folderValueGetter,
                        }}
                        getRowId={(params) => params.data.id}
                        treeDataParentIdField="parentId"
                        editType="fullRow"
                        onRowDragEnd={onRowDragEnd}
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
