const {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
} = require('./lib/properDivisors');

const { createPairs } = require('./lib/pairs');

const { createSieveBelow } = require('./lib/sieve');

// Non-abundant sums
const cap = 28124;

const abundants = abundantNumbersBelow(cap);
const pairs = createPairs(abundants);

const sieve = createSieveBelow(cap);
pairs.forEach(p => sieve.remove(p[0] + p[1]));
console.log('sum', sieve.sum());
