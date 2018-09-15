import {getNames, getRandomNames} from './util';
import {insertionSort} from './insertion-sort';

const expected = getNames().sort().join(',');

interface Sorter {
  (words: string[]): void
}

function expected_vs_actual(names: string[], sorter: Sorter) {
  const expected = [...names].sort().join(',');
  sorter(names);
  expect(names.join(',')).toBe(expected);
}

test('insertion sort on short list', () => {
  expected_vs_actual(getNames(), insertionSort);
});

test('insertion sort on random list', () => {
  expected_vs_actual(getRandomNames(30), insertionSort);
});

