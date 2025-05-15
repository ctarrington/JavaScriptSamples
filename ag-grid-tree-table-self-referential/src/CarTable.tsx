import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    type EditableCallbackParams,
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
    rowData: Child[]; // existing row data
    newRowData: Child[]; // new rows that need to be finished
    upsertRow: (row: Child) => void;
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

const isEditableCar = (params: EditableCallbackParams<Child>) => {
    return params?.data?.type === 'car';
};

function CarTable({ rowData, newRowData, upsertRow }: CarTableProps) {
    // see https://www.ag-grid.com/react-data-grid/value-setters/
    const childValueSetter: ValueSetterFunc<Car> = useCallback(
        (params: ValueSetterParams<Car>) => {
            const { data: newRow, colDef, newValue } = params;
            if (newRow.type !== 'car') {
                return false;
            }

            if (!colDef.field) {
                return false;
            }

            newRow[colDef.field] = newValue;
            upsertRow(newRow);

            return true;
        },
        [upsertRow]
    );

    const folderValueSetter: ValueSetterFunc<Folder> = useCallback(
        (params: ValueSetterParams<Folder>) => {
            const { api, node, data: newRow, colDef, newValue } = params;
            if (colDef.headerName !== 'Name' || !node) {
                return false;
            }

            newRow.name = newValue;
            upsertRow(newRow);

            api.setRowNodeExpanded(node, true);
            return true;
        },
        [upsertRow]
    );

    const folderValueGetter: ValueGetterFunc<Folder> = useCallback(
        (params: ValueGetterParams<Folder>) => {
            return params.data?.name ?? 'what';
        },
        []
    );

    const onRowDragEnd = useCallback(
        (event: RowDragEvent) => {
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
            upsertRow(newRowData);
        },
        [rowData, upsertRow]
    );

    // Column Definitions: Defines the columns to be displayed.
    const colDefs: ColDef[] = [
        {
            field: 'make',
            editable: isEditableCar,
            valueSetter: childValueSetter,
        },
        {
            field: 'model',
            editable: isEditableCar,
            valueSetter: childValueSetter,
        },
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
                        pinnedBottomRowData={newRowData}
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
