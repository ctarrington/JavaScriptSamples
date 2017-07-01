const createBitset = (size) => {
  let index = size;
  const privateArray = [];
  while(index--) {
    privateArray[index] = true;
  }

  const bitset = {
    unset(index) {
      if (index >= size) { throw new RangeError(); }
      privateArray[index] = false;
    },
    set(index) {
      if (index >= size) { throw new RangeError(); }
      privateArray[index] = true;
    },
    check(index) {
      if (index >= size) { throw new RangeError(); }
      return privateArray[index];
    }
  };

  return bitset;
}

module.exports = {
  createBitset,
};
