const { createBitset } = require('./bitset');

test('small bitset', () => {
  const bitset = createBitset(3);
  expect(bitset.check(0)).toBe(true);
  expect(bitset.check(1)).toBe(true);
  expect(bitset.check(2)).toBe(true);

  bitset.unset(1);
  expect(bitset.check(1)).toBe(false);
});

test('out of range bitset', () => {
  const bitset = createBitset(3);
  expect(() => { bitset.check(3); }).toThrow();
});
