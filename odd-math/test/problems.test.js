const {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
} = require('../src/properDivisors');

const { createPairs } = require('../src/pairs');

const { createSieveBelow } = require('../src/sieve');

// 23 Non-abundant sums
test('sum of all positive numbers below 5000 which cannot be written as the sum of two abundant numbers.', () => {
  const cap = 5000;
  const abundants = abundantNumbersBelow(cap); /*?.*/
  expect(abundants.length).toEqual(1238);

  const sieve = createSieveBelow(cap); /*?.*/
  const pairs = createPairs(abundants); /*?.*/
  pairs.forEach(p => sieve.remove(p[0] + p[1])); /*?.*/

  expect(sieve.sum()).toEqual(2035227);
});
