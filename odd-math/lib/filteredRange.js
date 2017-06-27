function filteredRange(start, stop, step, predicate) {
  const results = [];

  for (let num = start; num < stop; num += step) {
    if (predicate(num)) {
      results.push(num);
    }
  }

  return results;
}

module.exports = filteredRange;
