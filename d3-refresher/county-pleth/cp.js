const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const featureLimit = {
  COUNTY: 1.3
};

const path = d3.geoPath();

const colorScale = d3.scaleThreshold()
  .domain(d3.range(2, 10))
  .range(d3.schemeBlues[9]);

const mapG = svg.append("g")
  .attr("class", "map");

const statesG = mapG.append("g")
  .attr("class", "states");

const countiesG = mapG.append("g")
  .attr("class", "counties");

addLegend(svg, colorScale);

function ensure(theObject, key, defaultValue) {
  if (typeof theObject[key] === 'undefined') {
    theObject[key] = defaultValue;
  }
}

function rollupData(unemployment) {
  // aggregate counties to state - simple average not adjusted by population of county.
  const unemploymentByCounty = {};
  const unemploymentByState = {};
  const countyCountsByState = {};

  unemployment.forEach((county) => {
    unemploymentByCounty[county.id] = county.rate;
    const stateCode = county.id.substring(0,2);
    const value = parseInt(county.rate, 10);
    ensure(unemploymentByState,stateCode, 0);
    ensure(countyCountsByState, stateCode, 0);
    unemploymentByState[stateCode] += value;
    countyCountsByState[stateCode]++;
  });


  Object.keys(unemploymentByState).forEach((key) => {
    unemploymentByState[key] = unemploymentByState[key]/countyCountsByState[key];
  });

  return {unemploymentByCounty, unemploymentByState};
}

function ready(error, us, unemployment) {

  function refresh(scale = 1) {
    const statePaths = statesG.selectAll('path.state')
      .data(topojson.feature(us, us.objects.states).features);

    statePaths.enter().append("path")
        .attr('class', 'state')
        .attr("d", path)
        .attr("fill", function(d) {
          return colorScale(unemploymentByState[d.id]);
        });


    const countyFeatures = (scale > featureLimit.COUNTY)
      ? topojson.feature(us, us.objects.counties).features
      : [];

    const countyPaths = countiesG.selectAll("path.county")
      .data(countyFeatures, (d) => d.id);

    countyPaths.enter().append("path")
      .attr('class', 'county')
      .attr("d", path)
      .attr("fill", function(d) {
        return colorScale(unemploymentByCounty[d.id]);
      });

    countyPaths.exit().remove();
  }

  function zoomed() {
    mapG.attr("transform", d3.event.transform);
    refresh(d3.event.transform.k);
  }

  if (error) throw error;

  const {unemploymentByCounty, unemploymentByState} = rollupData(unemployment);

  const zoom = d3.zoom()
      .scaleExtent([1, 40])
      .on("zoom", zoomed);

  mapG.call(zoom);
  refresh();
}

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.tsv, "unemployment.tsv")
    .await(ready);
