const { createBitset } = require('../src/bitset');

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
  expect(bitset.check(2)).toBe(true);
  expect(bitset.check(3)).toBe(true);
});

test('out of range bitset', () => {
  const bitset = createBitset(4);
  expect(() => { bitset.check(4); }).toThrow();
  expect(() => { bitset.set(4); }).toThrow();
  expect(() => { bitset.unset(4); }).toThrow();
});

test('large bitset', () => {
  const bitset = createBitset(28124);
  expect(bitset.check(28121)).toBe(true);
  expect(bitset.check(28122)).toBe(true);
  expect(bitset.check(28123)).toBe(true);

  bitset.unset(28122);
  expect(bitset.check(28121)).toBe(true);
  expect(bitset.check(28122)).toBe(false);
  expect(bitset.check(28123)).toBe(true);

  bitset.set(28122);
  expect(bitset.check(28121)).toBe(true);
  expect(bitset.check(28122)).toBe(true);
});
