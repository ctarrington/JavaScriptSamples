import * as d3 from 'd3';

const available = [
  'tony',
  'rex',
  'fred',
  'sally',
  'joe',
  'betty',
];

const names = [];

function init() {
  const body = d3.select('body');
  body.append('div')
    .attr('id', 'list');
}

function extract(list, limit = 1) {
  if (list.length < limit) { return null; }
  const index = Math.floor(Math.random() * list.length);
  const item = list.splice(index, 1)[0];
  return item;
}

function refresh() {
  const newName = Math.random() > 0.6 ? extract(available, 0) : null;
  const removedName = Math.random() > 0.9 ? extract(names, 3) : null;

  console.log('refresh', 'newName', newName, 'removedName', removedName, 'names', JSON.stringify(names));

  if (newName) { names.push(newName); }
  if (removedName) { available.push(removedName); }

  const list = d3.select('div#list');
  const nameDivs = list.selectAll('.name')
    .data(names, (d) => d)
    ;

  nameDivs.enter()
    .append('div')
    .attr('class', 'name')
    .html((d) =>  { return d; })
    ;

  nameDivs.exit()
    .remove()
    ;
}

init();
setInterval(refresh, 300);
