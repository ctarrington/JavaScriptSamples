import { swap, getNames } from './util';

test('swap', () => {
  const names = ['fred', 'wilma', 'betty'];
  swap(names, 0, 2);

  expect(names[0]).toBe('betty');
  expect(names[1]).toBe('wilma');
  expect(names[2]).toBe('fred');
});