const { createSieveBelow } = require('../src/sieve');

test('sieve for the odds', () => {
  const sieve = createSieveBelow(6);
  sieve.remove(2);
  sieve.remove(4);
  sieve.remove(1000);
  expect(sieve.sum()).toEqual(9);
});

test('large sieve', () => {
  const cap = 1000 * 1000;
  const sieve = createSieveBelow(cap);
  sieve.remove(212);
  sieve.remove(43);

  const rawSum = (cap - 1)  * cap / 2;
  const sumAfterRemovals = rawSum - 212 - 43;
  expect(sieve.sum()).toEqual(sumAfterRemovals);/*?.*/
});
