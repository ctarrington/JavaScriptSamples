export type Folder = {
    id: string;
    name: string;
    parentId?: string;
    type: string;
};

export type Car = {
    id: string;
    name: string;
    make: string;
    model: string;
    parentId?: string;
    type: string;
};

export type Child = Folder | Car;
