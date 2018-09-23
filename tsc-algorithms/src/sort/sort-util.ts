interface Comparator {
  (left: object, right:object) : number
}

interface Sort {
  (words: object[], comparator: Comparator): void
}

export {Comparator, Sort};