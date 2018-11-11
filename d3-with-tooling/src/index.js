import * as d3 from 'd3';

const WIDTH = 500;
const HEIGHT = 500;

let tick = 0;
const DELTA_ANGLE = Math.PI/50;

function toScreen(point) {
  return {
    x: point.x+WIDTH/2,
    y: HEIGHT-(point.y+HEIGHT/2),
    color: point.color,
    index: point.index,
  }
}

function negate(point) {
  return {
    x: -point.x,
    y: -point.y,
    color: point.color,
    index: point.index,
  };
}

function translate(point, by) {
  return {
    x: point.x + by.x,
    y: point.y + by.y,
    color: point.color,
    index: point.index,
  };
}

function midPoint(point1, point2) {
  return {
    x: (point1.x+point2.x)/2,
    y: (point1.y+point2.y)/2,
  }
}

function rotateClockwiseAboutOrigin(point, angleInRadians) {
  const m11 = Math.cos(angleInRadians);
  const m12 = -Math.sin(angleInRadians);
  const m21 = - m12;
  const m22 = m11;

  return {
    x: m11*point.x+m12*point.y,
    y: m21*point.x+m22*point.y,
    color: point.color,
    index: point.index,
  }
}

function rotateClockwise(point, about, angleInRadians) {
  const translated = translate(point, negate(about));
  const rotated = rotateClockwiseAboutOrigin(translated, angleInRadians);
  const translatedBack = translate(rotated, about);
  return translatedBack;
}


const points = [
  {x: -30, y: 30, color: 'red', index:0},
  {x: 30, y: 30, color: 'blue', index:1},
  {x: 30, y: 10, color: 'green', index:2},
  {x: -30, y: 10, color: 'yellow', index:3},
];

function init() {
  const svg = d3.select('body')
    .append('svg')
    .attr('id', 'image')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  svg.append('line')
    .attr('x1', 0)
    .attr('y1', HEIGHT/2)
    .attr('x2', WIDTH)
    .attr('y2', HEIGHT/2)
    .attr('stroke', 'black');

  svg.append('line')
    .attr('x1', WIDTH/2)
    .attr('y1', 0)
    .attr('x2', WIDTH/2)
    .attr('y2', HEIGHT)
    .attr('stroke', 'black');

}

function refresh() {
  tick++;

  const center = midPoint(points[0], points[2]);

  const transformedPoints = points.map((point) => {
    return rotateClockwise(point, center, DELTA_ANGLE*tick);
  });

  const svgContainer = d3.select('svg#image');
  svgContainer.selectAll('circle')
    .data(transformedPoints, d => d.index)
    .enter()
    .append('circle')
  ;

  svgContainer.selectAll('circle')
    .attr("cx", function (d) {
      if (d.index === 0) {
        console.log('p[0].x = '+d.x);
      }
      return toScreen(d).x;
    })
    .attr("cy", function (d) { return toScreen(d).y; })
    .attr("r", function (d) { return 5 })
    .style("fill", function(d) { return d.color; })
  ;

  circles.exit()
    .remove()
    ;
}

init();
setInterval(refresh, 30);
