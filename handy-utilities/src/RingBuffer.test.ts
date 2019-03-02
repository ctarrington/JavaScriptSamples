import RingBuffer from './RingBuffer';
import ArrayRingBuffer from './ArrayRingBuffer';

const ringBuffers: RingBuffer<number>[] = [
  new ArrayRingBuffer(5)
];

ringBuffers.forEach((ringBuffer: RingBuffer<number>, index: number) => {

  const run = `implementation: ${ringBuffer.constructor.name} `;

  test(run+'fill and empty', () => {
    [1,2,3,4,5].forEach(number => {
      ringBuffer.push(number);
    });

    [1,2,3,4,5].forEach(number => {
      expect(ringBuffer.shift()).toBe(number);
    });
  });

  test(run+'read past end', () => {
    [1,2].forEach(number => {
      ringBuffer.push(number);
    });

    expect(ringBuffer.available()).toBe(true);

    [1,2].forEach(number => {
      expect(ringBuffer.shift()).toBe(number);
    });

    expect(ringBuffer.available()).toBe(false);

    const functionUnderTest = () => {
      ringBuffer.shift()
    };
    expect(functionUnderTest).toThrow(RangeError);
  });

  test(run+'write past end', () => {
    [1,2,3,4,5, 6,7].forEach(number => {
      ringBuffer.push(number);
    });

    [6,7, 3,4,5].forEach(number => {
      expect(ringBuffer.shift()).toBe(number);
    });
  });
});