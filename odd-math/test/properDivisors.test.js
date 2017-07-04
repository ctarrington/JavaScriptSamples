const {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
} = require('../src/properDivisors');

test('divisors of 12', () => {
  expect(divisors(12)).toEqual([1,2,3,4,6]);
});

test('sum of divisors for 28', () => {
  expect(sumOfDivisors(28)).toEqual(28);
});

test('sum of divisors for 12', () => {
  expect(sumOfDivisors(12)).toEqual(16);
});

test('12 is abundant', () => {
  expect(isAbundant(12)).toBe(true);
});


test('28 is not abundant', () => {
  expect(isAbundant(28)).toBe(false);
});

test('12 is first abundant number', () => {
  expect(abundantNumbersBelow(13)).toEqual([12]);
});
