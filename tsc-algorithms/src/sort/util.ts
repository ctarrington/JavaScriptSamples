import faker from 'faker';
import {Person} from './sort-util';

const swap = function(things: object[], a: number, b: number) : void {
  [things[a], things[b]] = [things[b], things[a]];
};

const getPeople  = () : Person[] =>  {
  return [{name: 'bat', height:7}, {name: 'fred', height: 68}, {name: 'wilma', height: 62}, {name: 'betty', height: 55}, {name: 'alec', height: 44}, {name:'bat', height: 7}];
};

const getRandomPeople = function(count: number) : Person[] {
  const people = [];
  for (let ctr=0; ctr<count;ctr++) {
    people.push({
      name: faker.name.firstName(),
      height: faker.random.number({min: 40, max: 88})
    });
  }

  return people;
};

export { getPeople, getRandomPeople, swap };