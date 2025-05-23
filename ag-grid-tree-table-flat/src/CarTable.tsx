import './App.css';

import { AgGridReact } from 'ag-grid-react';

import {
    AllCommunityModule,
    type ColDef,
    ModuleRegistry,
    type RowDragEndEvent,
    RowDragModule,
    RowNode,
    type ValueSetterParams,
} from 'ag-grid-community';

import { TreeDataModule } from 'ag-grid-enterprise';
import { useCallback, useEffect, useState } from 'react';
import type { Car } from './models.ts';

// Register all Community features
ModuleRegistry.registerModules([
    AllCommunityModule,
    RowDragModule,
    TreeDataModule,
]);

function extractParents(rowNode: RowNode, parents: string[]): string[] {
    if (rowNode.level === 0) {
        return [rowNode.groupValue, ...parents];
    } else if (rowNode.parent) {
        return extractParents(rowNode.parent, [rowNode.groupValue, ...parents]);
    } else {
        return parents;
    }
}

function getParents(rowNode: RowNode): string[] {
    if (rowNode?.group) {
        return extractParents(rowNode, []);
    }

    return rowNode?.data?.parents;
}

function updateParents(
    rowData: Car[],
    parents: string[],
    newParents: string[]
): Car[] {
    return rowData.map((row: Car) => {
        const newRow = { ...row };
        if (
            parents.every(
                (value: string, index: number) => value === row.parents[index]
            )
        ) {
            newRow.parents = newRow.parents.map((_value, index) => {
                if (index < newParents.length) {
                    return newParents[index];
                } else {
                    return newRow.parents[index];
                }
            });
        }
        return newRow;
    });
}

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
    }, [rowData, newCar, clearNewCar]);

    const onGroupEdit = useCallback(
        (params: ValueSetterParams<Car>) => {
            if (params.newValue.length < 0 || !params.node?.group) {
                return false;
            }

            const editedNode = params.node as RowNode;

            const parents = getParents(editedNode);

            const newParents = [...parents];
            const lastIndex = parents.length - 1;
            newParents[lastIndex] = params.newValue;

            console.log('group edit', params, parents, newParents);

            const modifiedRowData = updateParents(rowData, parents, newParents);
            setRowData(modifiedRowData);
            return true;
        },
        [rowData]
    );

    const onRowDragOrDrop = useCallback(
        (event: RowDragEndEvent) => {
            if (!event.overNode) {
                return;
            }

            const overNode = event.overNode as RowNode;
            const dropTargetParents = getParents(overNode);
            if (dropTargetParents) {
                const modifiedRowData = [...rowData];
                const index = event.node?.sourceRowIndex;
                if (index > -1) {
                    modifiedRowData[index].parents = dropTargetParents;
                    setRowData(modifiedRowData);
                } else {
                    // todo: handle group moved
                }
            }
        },
        [rowData]
    );

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
                            rowDrag: true,
                            cellRendererParams: { suppressCount: true },
                            editable: true,
                            valueSetter: onGroupEdit,
                        }}
                        pinnedBottomRowData={[newCar]}
                        onCellEditingStopped={onCellEditingStopped}
                        onRowDragEnd={onRowDragOrDrop}
                        enableGroupEdit={true}
                    />
                </div>
            </div>
        </>
    );
}

export default CarTable;
