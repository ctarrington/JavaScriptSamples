export type Folder = {
    id: string;
    name: string;
    parentId?: string;
};

export type Car = {
    id: string;
    name: string;
    make: string;
    model: string;
    parentId?: string;
};

export type Child = Folder | Car;
