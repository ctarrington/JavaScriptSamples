import {getPeople, getRandomPeople} from './util';
import {Comparator, Person, Sort} from './sort-util';
import {insertionSort} from './insertion-sort';

const nameComparator : Comparator<Person> = (left: Person, right:Person) : number => {
  if (left['name'] < right['name']) {
    return -1;
  }

  if (left['name'] > right['name']) {
    return 1;
  }

  return 0;
};

function expected_vs_actual(things: Person[], sort: Sort) {
  const expected = JSON.stringify([...things].sort(nameComparator));

  sort(things, nameComparator);
  expect(JSON.stringify(things)).toBe(expected);
}

test('insertion sort on short list', () => {
  const people = getPeople();
  expected_vs_actual(people, insertionSort);
});

test('insertion sort on random list', () => {
  const people = getRandomPeople(50);
  expected_vs_actual(people, insertionSort);
});

