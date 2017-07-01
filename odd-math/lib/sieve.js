const createSieveBelow = (cap) => {
  const privateMap = {};
  for (let i = 1; i < cap; i++) {
    privateMap[i] = null;
  }

  const sieve = {
    remove(value) {
      delete privateMap[value];
    },

    sum() {
      return Object.keys(privateMap).reduce((accumulator, value) => {
        return accumulator + parseInt(value, 10);
      }, 0);
    },
  };

  return sieve;
}

module.exports = {
  createSieveBelow,
};
