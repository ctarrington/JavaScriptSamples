const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const unemployment = d3.map();

const path = d3.geoPath();

const colorScale = d3.scaleThreshold()
    .domain(d3.range(2, 10))
    .range(d3.schemeBlues[9]);

const mapG = svg.append("g")
    .attr("class", "map");

addLegend(svg, colorScale);

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.tsv, "unemployment.tsv", function(d) { unemployment.set(d.id, +d.rate); })
    .await(ready);

function ensure(theObject, key, defaultValue) {
  if (typeof theObject[key] === 'undefined') {
    theObject[key] = defaultValue;
  }
}

function ready(error, us) {

  if (error) throw error;

  const unemploymentByState = {};
  const countyCountsByState = {};
  unemployment.keys().forEach((key) => {
    const stateCode = (''+key).substring(0,2);
    const value = unemployment['$'+key];
    ensure(unemploymentByState,'$'+stateCode, 0);
    ensure(countyCountsByState, '$'+stateCode, 0);
    unemploymentByState['$'+stateCode] += value;
    countyCountsByState['$'+stateCode]++;
  });

  Object.keys(unemploymentByState).forEach((key) => {
    unemploymentByState[key] = unemploymentByState[key]/countyCountsByState[key];
  });

  const zoom = d3.zoom()
      .scaleExtent([1, 40])
      .on("zoom", zoomed);

  const countiesG = mapG.append("g")
      .attr("class", "counties")
    .selectAll("path.county")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr('class', 'county')
      .attr("d", path)
      .attr("fill", function(d) {
        return colorScale(unemployment['$'+d.id]);
      });

  mapG.call(zoom);

  function zoomed() {
    mapG.attr("transform", d3.event.transform);
  }

}
