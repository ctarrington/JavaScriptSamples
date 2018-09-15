import faker from 'faker';

const swap = function(words: string[], a: number, b: number) {
  [words[a], words[b]] = [words[b], words[a]];
};

const getNames = function() {
  return ['bat', 'fred', 'wilma', 'betty', 'alec', 'bat'];
};

const getRandomNames = function(nameCount: number) {
  const names = [];
  for (let ctr=0; ctr<nameCount;ctr++) {
    names.push(faker.name.firstName());
  }

  return names;
};

export { getNames, getRandomNames, swap };