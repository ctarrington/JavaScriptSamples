const filteredRange = require('../src/filteredRange');

test('multiples of 4 between 4 and 8', () => {
  expect(filteredRange(4, 8, 1, n => n % 4 === 0)).toEqual([4]);
});
