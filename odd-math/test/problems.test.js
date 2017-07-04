const {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
} = require('../src/properDivisors');

const { createPairs } = require('../src/pairs');

const { createSieveBelow } = require('../src/sieve');

// 23 Non-abundant sums
test('sum of all positive numbers below 25 which cannot be written as the sum of two abundant numbers.', () => {
  const abundants = abundantNumbersBelow(25);
  expect(abundants).toEqual([12, 18, 20, 24]);

  const pairs = createPairs(abundants);

  const sieve = createSieveBelow(25);
  expect(sieve.sum()).toEqual(300);
  pairs.forEach(p => sieve.remove(p[0] + p[1]));
  expect(sieve.sum()).toEqual(300-24);
});
