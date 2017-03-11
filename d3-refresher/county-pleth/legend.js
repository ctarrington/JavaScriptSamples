
function addLegend(parent, colorScale) {
  const xScale = d3.scaleLinear()
      .domain([1, 10])
      .rangeRound([600, 860]);

  const legendG = parent.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)");

  legendG.selectAll("rect")
    .data(colorScale.range().map(function(d) {
        d = colorScale.invertExtent(d);
        if (d[0] == null) d[0] = xScale.domain()[0];
        if (d[1] == null) d[1] = xScale.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return xScale(d[0]); })
      .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); })
      .attr("fill", function(d) { return colorScale(d[0]); });

  legendG.append("text")
      .attr("class", "caption")
      .attr("x", xScale.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Unemployment rate");

  legendG.call(d3.axisBottom(xScale)
      .tickSize(13)
      .tickFormat(function(x, i) { return i ? x : x + "%"; })
      .tickValues(colorScale.domain()))
    .select(".domain")
      .remove();

  return legendG;
}
