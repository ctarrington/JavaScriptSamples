const {
  lexicographicPermutations,
} = require('./src/lexicographicPermutations');

const progress = {
  count: 0,
  done: false,
  answer: null,
}

const context = {
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  currentString: '',
  currentCount: 0,
  desiredCount: 1000000,
  desiredLength: 10,
};
const results = lexicographicPermutations(context, progress);
console.log('PROGRESS: ', progress);
