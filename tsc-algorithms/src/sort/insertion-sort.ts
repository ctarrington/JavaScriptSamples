import {Comparator, Sort} from './sort-util';
import { swap } from './util';

const insertionSort : Sort = function(things: object[], comparator: Comparator<any>) {
  for (let sweep = 1; sweep < things.length; sweep++) {
    for (let candidate = sweep; candidate > 0; candidate--) {
      if (comparator(things[candidate], things[candidate-1]) < 0) {
        swap(things, candidate, candidate-1);
      }
    }
  }
};

export { insertionSort };