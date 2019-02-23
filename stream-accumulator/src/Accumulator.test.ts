import Accumulator from "./Accumulator";


test('basic', (done) => {
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(101);
    done();
  });

  const view = new Uint32Array([0xDADABEEF, 4, 101]);
  accumulator.add(view.buffer);
});

test('from middle', (done) => {
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(102);
    done();
  });

  const view = new Uint32Array([4, 101, 0xDADABEEF, 4, 102]);
  accumulator.add(view.buffer);
});

test('one at a time', (done) => {
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(102);
    done();
  });

  accumulator.add(new Uint32Array([4]).buffer);
  accumulator.add(new Uint32Array([101]).buffer);
  accumulator.add(new Uint32Array([0xDADABEEF]).buffer);
  accumulator.add(new Uint32Array([4]).buffer);
  accumulator.add(new Uint32Array([102]).buffer);
});

test('two for one', (done) => {
  let doneCtr = 0;
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(100+doneCtr);

    doneCtr++;
    if (doneCtr == 3) {
      done();
    }
  });

  accumulator.add(new Uint32Array([0xDADABEEF, 4, 100, 0xDADABEEF, 4, 101]).buffer);
  accumulator.add(new Uint32Array([0xDADABEEF, 4, 102]).buffer);
  accumulator.add(new Uint32Array([0xDADABEEF, 4, 103]).buffer);
});

test('extra values', (done) => {
  let doneCtr = 0;
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(100+doneCtr);

    doneCtr++;
    if (doneCtr == 3) {
      done();
    }
  });

  accumulator.add(new Uint32Array([12, 12, 12,0xDADABEEF, 4, 100, 12, 12, 12,0xDADABEEF, 4, 101]).buffer);
  accumulator.add(new Uint32Array([12, 12, 12]).buffer);
  accumulator.add(new Uint32Array([0xDADABEEF, 4, 102]).buffer);
  accumulator.add(new Uint32Array([0xDADABEEF, 4, 103]).buffer);
});

test('alternate delimiter', (done) => {
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(101);
    done();
  }, 0xFACEBEEF);

  const view = new Uint32Array([0xFACEBEEF, 4, 101]);
  accumulator.add(view.buffer);
});

test('three with 1.5, 2.5 splits', (done) => {
  let doneCtr = 0;
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(100+doneCtr);

    doneCtr++;
    if (doneCtr == 3) {
      done();
    }
  });

  accumulator.add(new Uint32Array([0xDADABEEF, 4, 100, 0xDADABEEF, 8, 101]).buffer);
  accumulator.add(new Uint32Array([777, 0xDADABEEF, 8, 102]).buffer);
  accumulator.add(new Uint32Array([777, 0xDADABEEF, 4, 103]).buffer);
});

test('long runs', (done) => {
  let doneCtr = 0;
  const accumulator = new Accumulator((data) => {
    const view = new Uint32Array(data);
    expect(view[0]).toBe(100+doneCtr);

    doneCtr++;
    if (doneCtr == 3) {
      done();
    }
  });

  accumulator.add(new Uint32Array([0xDADABEEF, 5*4, 100, 222, 333, 444, 555, 0xDADABEEF, 8, 101]).buffer);
  accumulator.add(new Uint32Array([777, 0xDADABEEF, 12, 102]).buffer);
  accumulator.add(new Uint32Array([777, 888, 0xDADABEEF, 8, 103, 777]).buffer);
});
