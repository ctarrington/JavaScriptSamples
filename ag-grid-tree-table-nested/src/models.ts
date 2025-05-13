export type Folder = {
    name: string;
    children: Child[];
};

export type Car = {
    name: string;
    make: string;
};

export type Child = Folder | Car;
