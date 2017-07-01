const { createBitset } = require('./bitset');

const createSieveBelow = (cap) => {
  const privateBitset = createBitset(cap);

  const sieve = {
    remove(value) {
      if (value < cap) {
        privateBitset.unset(value);
      }
    },

    sum() {
      let sum = 0;
      for (let i = 1; i < cap; i++) {
        if (privateBitset.check(i)) {
          sum += i;
        }
      }

      return sum;
    },
  };

  return sieve;
}

module.exports = {
  createSieveBelow,
};
