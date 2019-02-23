import Accumulator from './Accumulator';

console.log('hello world');
const accumulator = new Accumulator((data: ArrayBuffer) => {
  const view = new Uint32Array(data);
  console.log('data:'+view.join(', '));
});

const input = new ArrayBuffer(4);
accumulator.add(input);

