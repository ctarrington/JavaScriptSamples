import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    type EditableCallbackParams,
    type IRowNode,
    ModuleRegistry,
    type RowClassParams,
    type RowDragEvent,
    RowDragModule,
    type ValueGetterFunc,
    type ValueGetterParams,
    type ValueSetterFunc,
    type ValueSetterParams,
} from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback } from 'react';
import type { Car, Child } from './models.ts';

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
    const match = rowData.find((row) => row.id === id);
    if (!match) {
        return [];
    } else if (!match.parentId) {
        return [id];
    } else {
        return [id, ...getAncestors(rowData, match.parentId)];
    }
}

const isEditableCar = (params: EditableCallbackParams<Child>) => {
    return params?.data?.type === 'car';
};

const isFolder = (params: IRowNode<Child>) => {
    return params?.data?.type === 'folder';
};

const getRowStyle = (params: RowClassParams) => {
    return params.node.rowPinned ? { fontWeight: 'bold' } : undefined;
};

function CarTable({ rowData, newRowData, upsertRow }: CarTableProps) {
    // see https://www.ag-grid.com/react-data-grid/value-setters/
    const childValueSetter: ValueSetterFunc<Car> = useCallback(
        (params: ValueSetterParams<Car>) => {
            const { data: newRow, colDef, newValue } = params;
            if (!colDef.field) {
                return false;
            }

            newRow[colDef.field] = newValue;
            upsertRow(newRow);

            return true;
        },
        [upsertRow]
    );

    const nameValueSetter: ValueSetterFunc<Child> = useCallback(
        (params: ValueSetterParams<Child>) => {
            const { api, node, data: newRow, colDef, newValue } = params;

            if (colDef.headerName !== 'Name') {
                return false;
            }

            newRow.name = newValue;
            upsertRow(newRow);

            if (node) {
                api.setRowNodeExpanded(node, true);
            }

            return true;
        },
        [upsertRow]
    );

    const nameValueGetter: ValueGetterFunc<Child> = useCallback(
        (params: ValueGetterParams<Child>) => {
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

            const newParentId = isFolder(overNode)
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
        {
            field: 'description',
            editable: true,
            valueSetter: childValueSetter,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
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
                            valueSetter: nameValueSetter,
                            valueGetter: nameValueGetter,
                        }}
                        getRowId={(params) => params.data.id}
                        treeDataParentIdField="parentId"
                        onRowDragEnd={onRowDragEnd}
                        pinnedBottomRowData={newRowData}
                        getRowStyle={getRowStyle}
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
