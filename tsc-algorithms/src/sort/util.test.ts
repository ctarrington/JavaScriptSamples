import { swap, getNames } from './util';

test('swap', () => {
  const things = [{name:'fred'}, {name:'wilma'}, {name:'betty'}];
  swap(things, 0, 2);

  expect(things[0].name).toBe('betty');
  expect(things[1].name).toBe('wilma');
  expect(things[2].name).toBe('fred');
});