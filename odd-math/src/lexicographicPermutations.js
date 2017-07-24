const lexicographicPermutations = (context, progress) => {
  const { values, currentString, currentCount, desiredCount, desiredLength } = context;

  values.forEach((value, index) => {
    if (progress.done) { return; }

    const newContext = {
      desiredCount,
      desiredLength,
      currentCount,
    };

    newContext.values = [...values];
    newContext.values.splice(index, 1);
    newContext.currentString = currentString + value;

    if (newContext.currentString.length === desiredLength) {
      if (!progress.done) {
        progress.answer = newContext.currentString;
      }

      progress.count++;
      if (progress.count === desiredCount) {
        progress.done = true;
        return;
      }
    } else {
      lexicographicPermutations(newContext, progress);
    }
  });
}

module.exports = {
  lexicographicPermutations,
};
