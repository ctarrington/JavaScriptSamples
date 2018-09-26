interface Comparator<T> {
  (left: T, right:T) : number
}

interface Sort {
  (things: object[], comparator: Comparator<any>): void
}

interface Person {
  name: string;
  height: number;
}

export {Comparator, Person, Sort};