const data = [
  {type: 'African',  weight: 12.3, length: 17.2, beatsPerMinute: 65},
  {type: 'English',  weight: 13.3, length: 18.2, beatsPerMinute: 61},
];

const dimensions = ['weight', 'length', 'beatsPerMinute'];

const margins = {
  top: 30,
  right: 20,
  bottom: 20,
  left: 30
};

const available = {
  width: 600,
  height: 300
}
const width = available.width - margins.left - margins.right;
const height = available.height - margins.top - margins.bottom;

var nextGreaterFive = d3.scaleQuantize().domain([0,100]).range(d3.range(5,110,5))

const xScale = d3.scaleBand().domain(dimensions).rangeRound([0, width]).paddingInner(0.05).paddingOuter(0.1);

let maxValue = 15.2;
const yScale = d3.scaleLinear().domain([0,nextGreaterFive(maxValue)]).rangeRound([height, 0]);

const chartG = d3.selectAll('svg')
  .attr('width', `${available.width}`)
  .attr('height', `${available.height}`)
  .append('svg:g')
  .attr('class', 'chart')
  .attr('transform', `translate(${margins.left}, ${margins.top})`);

const dimensionGs = chartG.selectAll('.dimension')
  .data(dimensions);

const yAxis = d3.axisLeft(yScale);

dimensionGs.enter()
  .append('svg:g')
  .attr('class', function(d) { return `dimension ${d}`; })
  .attr('transform', function(d) { return `translate(${xScale(d)}, 0)`; } )
  .append('svg:g')
  .attr('class', 'y-axis')
  .each(function(d) { d3.select(this).call(yAxis.scale(yScale)); })
  .append('text')
    .style('text-anchor', 'middle')
    .attr('y', -9)
    .attr('fill', 'black')
    .text(function(d) { return d; });
