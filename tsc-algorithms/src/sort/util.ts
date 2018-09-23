import faker from 'faker';

const swap = function(things: object[], a: number, b: number) {
  [things[a], things[b]] = [things[b], things[a]];
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