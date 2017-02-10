// update pattern III from
// http://bl.ocks.org/mbostock/3808234

const people = [];

function nameSort(person1, person2) {
  return person1.name.localeCompare(person2.name);
}

function getDescription(person) {
  return `${person.name} - ${person.age}`;
}

function update() {
  const slowTransition = d3.transition()
      .duration(1100);

  const fastTransition = d3.transition()
      .duration(200);

  const SMALL_FONT = '10px';
  const NORMAL_FONT = '14px';
  const HUGE_FONT = '20px';



  // join new with existing
  const peopleDiv = d3.select("body").selectAll('div')
    .data(people, function(d) {
      console.log('d', d);
      return (d && d.name) ? d.name : 'a';
    });

  // take out the dead
  peopleDiv.exit()
    .style('color', 'red')
    .style('font-weight', 'bold')
    .transition(slowTransition)
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
      .style('font-size', SMALL_FONT)
      .style('color', 'green')
      .transition(slowTransition)
      .style('font-weight', 'normal')
      .style('font-size', NORMAL_FONT)
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
