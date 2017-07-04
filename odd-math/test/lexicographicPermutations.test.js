const { lexicographicPermutations } = require('../src/lexicographicPermutations');

test('1st lexicographic permutation of [0]', () => {
  const context = {
    values: [0],
    currentString: '',
    currentCount: 0,
    desiredCount: 1,
    desiredLength: 1,
  };


  const progress = {
    count: 0,
    done: false,
    answer: null,
  }

  lexicographicPermutations(context, progress);
  expect(progress.answer).toEqual('0');
});
