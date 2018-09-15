import { swap } from './util';

const insertionSort = function(words: string[]) {
  for (let sweep = 1; sweep < words.length; sweep++) {
    for (let candidate = sweep; candidate > 0; candidate--) {
      if (words[candidate] < words[candidate-1]) {
        swap(words, candidate, candidate-1);
      }
    }
  }
};

export { insertionSort };