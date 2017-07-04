const {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
} = require('./src/properDivisors');

const { createPairs } = require('./src/pairs');

const { createSieveBelow } = require('./src/sieve');

// Non-abundant sums
const cap = 28124;

const abundants = abundantNumbersBelow(cap);
const pairs = createPairs(abundants);

const sieve = createSieveBelow(cap);
pairs.forEach(p => sieve.remove(p[0] + p[1]));
console.log('sum = ', sieve.sum());
