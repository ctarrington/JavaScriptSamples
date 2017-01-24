// update pattern III from
// http://bl.ocks.org/mbostock/3808234

const people = [];

function nameSort(person1, person2) {
  return person1.name.localeCompare(person2.name);
}

function getDescription(person) {
  return `Hi my name is ${person.name}, my age is ${person.age}`;
}

function update() {
  var tr = d3.transition()
      .duration(1100);

  // join new with existing
  const peopleDiv = d3.select("body").selectAll('div')
    .data(people, function(d) {
      console.log('d', d);
      return (d && d.name) ? d.name : 'a';
    });

  // take out the dead
  peopleDiv.exit()
    .style('font-weight', 'bold')
    .style('color', 'red')
    .transition(tr)
    .remove();

  // update the survivors
  peopleDiv
    .style('color', function(d,i) {
      return 'blue';
    });

  // bring in the newbies
  peopleDiv.enter().append("div")
      .text(getDescription)
      .style('font-weight', 'bold')
      .style('color', 'green')
      .transition(tr)
      .style('font-weight', 'normal')
      .style('color', 'blue');
}

d3.interval(function() {
  const person = {
    name: faker.name.findName(),
    age: faker.random.number(100)
  }

  if (people.length > 4 && Math.random() > 0.7) {
    const index = Math.floor(Math.random()*people.length);
    people.splice(index, 1);
  }

  people.push(person);
  people.sort(nameSort);

  update();
}, 2000);
