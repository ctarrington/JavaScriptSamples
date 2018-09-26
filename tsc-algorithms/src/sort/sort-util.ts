interface Comparator {
  (left: object, right:object) : number
}

interface Sort {
  (things: object[], comparator: Comparator): void
}

interface Person {
  name: string;
  height: number;
}

export {Comparator, Person, Sort};