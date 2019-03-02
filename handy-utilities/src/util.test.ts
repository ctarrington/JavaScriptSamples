import {concatenateBuffers} from "./util";

test('two for one', () => {
  const evens = new Uint32Array([2,4,6,8]).buffer;
  const odds = new Uint32Array([1,3,5,7]).buffer;

  const evensThenOdds = concatenateBuffers(evens, odds);
  expect(evensThenOdds.byteLength).toBe(8*4);

  const view = new Uint32Array(evensThenOdds);
  expect(view[0]).toBe(2);
  expect(view[1]).toBe(4);
  expect(view[6]).toBe(5);
  expect(view[7]).toBe(7);
});