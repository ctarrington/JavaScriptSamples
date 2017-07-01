const { createBitset } = require('./bitset');

test('small bitset', () => {
  const bitset = createBitset(4);
  expect(bitset.check(1)).toBe(true);
  expect(bitset.check(2)).toBe(true);
  expect(bitset.check(3)).toBe(true);

  bitset.unset(2);
  expect(bitset.check(1)).toBe(true);
  expect(bitset.check(2)).toBe(false);
  expect(bitset.check(3)).toBe(true);

  bitset.set(2);
  expect(bitset.check(1)).toBe(true);
  expect(bitset.check(2)).toBe(false);
  expect(bitset.check(3)).toBe(true);
});

test('out of range bitset', () => {
  const bitset = createBitset(4);
  expect(() => { bitset.check(4); }).toThrow();
});
