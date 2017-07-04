const { createBitset } = require('./bitset');

const createSieveBelow = (cap) => {
  const privateBitset = createBitset(cap);
  let privateSum = (cap - 1)  * cap / 2;

  const sieve = {
    remove(value) {
      if (value >= cap) { return; }
      if (!privateBitset.check(value)) { return; }

      privateBitset.unset(value);
      privateSum -= value;
    },

    sum() {
      return privateSum;
    },

  };

  return sieve;
}

module.exports = {
  createSieveBelow,
};
