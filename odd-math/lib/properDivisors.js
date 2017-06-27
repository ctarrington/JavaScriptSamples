const filteredRange = require('./filteredRange');

function divisors(value) {
  return filteredRange(1, value, 1, n => value % n === 0);
  return results;
}

function sumOfDivisors(value) {
  return divisors(value)
    .reduce((element, accumulator) => element + accumulator, 0);
}

function isAbundant(value) {
  return sumOfDivisors(value) > value;
}

function abundantNumbersBelow(value) {
  return filteredRange(1, value, 1, n => isAbundant(n));
}

module.exports = {
  divisors,
  sumOfDivisors,
  isAbundant,
  abundantNumbersBelow,
};
