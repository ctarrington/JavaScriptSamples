import RingBuffer from './RingBuffer';
import ArrayRingBuffer from './ArrayRingBuffer';

const verifyRead = (read: number[]) => {
  // console.log('read:' +read);

  for (let step=1; step<read.length; step++) {
    const delta = read[step] - read[step-1];
    // if (delta < 0) {
    //   console.log('fail step:'+step);
    // }
    expect(delta).toBeGreaterThan(0);
  }
};

const ringBuffer = new ArrayRingBuffer<number>(5);

test('fill and empty', () => {
  ringBuffer.clear();

  [1,2,3,4,5].forEach(number => {
    ringBuffer.push(number);
  });

  [1,2,3,4,5].forEach(number => {
    expect(ringBuffer.shift()).toBe(number);
  });
});

test('read past end', () => {
  ringBuffer.clear();

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

test('write past end', () => {
  ringBuffer.clear();

  [1,2,3,4,5, 6,7].forEach(number => {
    ringBuffer.push(number);
  });

  [3,4,5,6,7].forEach(number => {
    expect(ringBuffer.shift()).toBe(number);
  });
});

test('always read in order - specific full', () => {
  ringBuffer.clear();

  const read: number[] = [];

  [1,2,3,4,5].forEach(number => {
    ringBuffer.push(number);
  });

  // 1,2,3,4,5
  // RW, , , ,

  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());

  //  , , ,4,5
  // W, , ,R,

  [6,7,8,9].forEach(number => {
    ringBuffer.push(number);
  });

  // 6,7,8,9,5
  //  , , ,R,W

  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());
  read.push(ringBuffer.shift());

  [1,2,3,5,6,7,8,9].forEach(number => {
    expect(read.shift()).toBe(number);
  });
});

test('always read in order - specific past', () => {
  ringBuffer.clear();

  const read: number[] = [];

  [0, 1, 2, 3, 4, 5].forEach(number => {
    ringBuffer.push(number);
  });

  read.push(ringBuffer.shift());

  [6, 7, 8].forEach(number => {
    ringBuffer.push(number);
  });

  read.push(ringBuffer.shift());

  [9, 10, 11].forEach(number => {
    ringBuffer.push(number);

  });

  read.push(ringBuffer.shift());
  verifyRead(read);
});

const ringBuffers: RingBuffer<number>[] = [
  new ArrayRingBuffer(10),
  new ArrayRingBuffer(5),
  new ArrayRingBuffer(2),

];

ringBuffers.forEach((ringBuffer: RingBuffer<number>, index: number) => {
  const run = `implementation: ${ringBuffer.constructor.name} capacity: ${ringBuffer.getCapacity()}`;

  test(run + 'always read in order - random', () => {
    ringBuffer.clear();

    const read = [];

    const LOOPS = 300;
    const WRITE_BURST_MAX = ringBuffer.getCapacity() * 1.2;
    const READ_BURST_MAX = ringBuffer.getCapacity() * 1.1;

    let writeValue = 0;

    for (let ctr = 0; ctr < LOOPS; ctr++) {
      const writeBurstSize = Math.floor(Math.random() * WRITE_BURST_MAX);
      const readBurstSize = Math.floor(Math.random() * READ_BURST_MAX);

      const writes = [];
      const reads = [];

      for (let step = 0; step < writeBurstSize; step++) {
        writes.push(writeValue);
        ringBuffer.push(writeValue++);
      }

      for (let step = 0; step < readBurstSize; step++) {
        if (ringBuffer.available()) {
          const value = ringBuffer.shift();
          reads.push(value);
          read.push(value);
        }
      }
    }

    verifyRead(read);
  });
});