import {getPeople, getRandomPeople} from './util';
import {Comparator, Person, Sort} from './sort-util';
import {insertionSort} from './insertion-sort';

const nameComparator : Comparator = (left: Person, right:Person) : number => {
  if (left['name'] < right['name']) {
    return -1;
  }

  if (left['name'] > right['name']) {
    return 1;
  }

  return 0;
}

const expected = getPeople().sort(nameComparator).join(',');

function expected_vs_actual(things: Person[], sort: Sort) {
  const expected = [...things].sort().join(',');

  sort(things, nameComparator);
  expect(things.join(',')).toBe(expected);
}

test('insertion sort on short list', () => {
  const people = getPeople();
  expected_vs_actual(people, insertionSort);
});

test('insertion sort on random list', () => {
  const people = getRandomPeople(30);
  expected_vs_actual(people, insertionSort);
});

