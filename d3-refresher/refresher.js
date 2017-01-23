// update pattern III from
// http://bl.ocks.org/mbostock/3808234

const people = [];

function getDescription(person) {
  return `Hi my name is ${person.name}, my age is ${person.age}`;
}

function update() {

  // join new with existing
  const peopleDiv = d3.select("body").selectAll('div')
    .data(people, function(d) {
      console.log('d', d);
      return (d && d.name) ? d.name : 'a';
    });

  // take out the dead
  peopleDiv.exit()
    .remove();

  // update the survivors
  peopleDiv
    .style('color', function(d,i) {
      return 'blue';
    });

  // bring in the newbies
  peopleDiv.enter().append("div")
      .text(getDescription)
      .style('color', 'red');

}

d3.interval(function() {
  const person = {
    name: faker.name.findName(),
    age: faker.random.number(100)
  }

  people.push(person);

  if (Math.random() > 0.5) {
    const index = Math.floor(Math.random()*people.length);
    people.splice(index, 1);
  }

  update();
}, 2000);
