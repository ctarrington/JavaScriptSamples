const createPairs = (values) => {
  const results = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = i; j < values.length; j++) {
      results.push([values[i], values[j]]);
    }
  }

  return results;
};

module.exports = {
  createPairs,
};
