export type Folder = {
    name: string;
    parentId?: string;
};

export type Car = {
    name: string;
    make: string;
    model: string;
    parentId: string;
};

export type Child = Folder | Car;
