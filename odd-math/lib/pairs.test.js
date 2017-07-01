const { createPairs } = require('./pairs');

test('find pairs', () => {
  const results = createPairs([1, 2, 3]);
  expect(results).toEqual([[1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]]);
});
