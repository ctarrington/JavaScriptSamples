const { createSieveBelow } = require('./sieve');

test('sieve for the odds', () => {
  const sieve = createSieveBelow(6);
  sieve.remove(2);
  sieve.remove(4);
  sieve.remove(1000);
  expect(sieve.sum()).toEqual(9);
});
