import {getNames, getRandomNames} from './util';
import {Comparator, Sort} from './sort-util';
import {insertionSort} from './insertion-sort';

const expected = getNames().sort().join(',');

const nameComparator : Comparator = (left: {name:string}, right:{name:string}) => {
  if (left['name'] < right['name']) {
    return -1;
  }

  if (left['name'] > right['name']) {
    return 1;
  }

  return 0;
}

function expected_vs_actual(names: object[], sort: Sort) {
  const expected = [...names].sort().join(',');

  sort(names, nameComparator);
  expect(names.join(',')).toBe(expected);
}

test('insertion sort on short list', () => {
  const people = getNames().map((name) => {return {name}; });
  expected_vs_actual(people, insertionSort);
});

test('insertion sort on random list', () => {
  const people = getRandomNames(30).map((name) => {return {name}; });
  expected_vs_actual(people, insertionSort);
});

