const maxNumber = Math.pow(2,32) - 1;
const bitsPerNumber = 31;

function calculatePosition(index) {
  return {
    numberIndex: Math.floor(index / bitsPerNumber),
    mask: Math.pow(2, index % bitsPerNumber)
  };
}

const createBitset = (size) => {
  const privateArray = [];
  const requiredNumbers = Math.ceil(size / bitsPerNumber);

  for (let i = 0; i < requiredNumbers; i++) {
    privateArray[i] = maxNumber;
  }

  const bitset = {
    unset(index) {
      if (index >= size) { throw new RangeError(); }
      const { numberIndex, mask } = calculatePosition(index);
      const ensureOn = privateArray[numberIndex] | mask;
      const ensureOff = ensureOn ^ mask;
      privateArray[numberIndex] = ensureOff;
    },
    set(index) {
      if (index >= size) { throw new RangeError(); }
      const { numberIndex, mask } = calculatePosition(index);
      const ensureOn = privateArray[numberIndex] | mask;
      privateArray[numberIndex] = ensureOn;
    },
    check(index) {
      if (index >= size) { throw new RangeError(); }
      const { numberIndex, mask } = calculatePosition(index);
      const masked = privateArray[numberIndex] & mask;
      return masked !== 0;
    }
  };

  return bitset;
}

module.exports = {
  createBitset,
};
