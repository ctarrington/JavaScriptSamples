
(function () {
    'use strict';

    angular.module('simpleCharts', []);

    angular.module('simpleCharts').directive('simpleLineChart', function () {

        function findMinValue(data, parameterName)
        {
            var minimums = [];
            data.forEach(function (list, i) {
                var minValue = d3.min(list, function (d) {
                    return d[parameterName];
                });
                minimums.push(minValue);
            });

            var overallMinValue = d3.min(minimums);
            return overallMinValue;
        }

        function findMaxValue(data, parameterName)
        {
            var maximums = [];
            data.forEach(function (list, i) {
                var maxValue = d3.max(list, function (d) {
                    return d[parameterName];
                });
                maximums.push(maxValue);
            });

            var overallMaxValue = d3.max(maximums);
            return overallMaxValue;
        }

        function buildXScale(data, parameterName, axisWidth)
        {
            var minValue = findMinValue(data, parameterName);
            var maxValue = findMaxValue(data, parameterName);

            var scale = d3.scale.linear()
                .domain([minValue, maxValue])
                .range([0, axisWidth]);

            return scale;
        }

        function buildYScale(data, parameterName, axisHeight)
        {
            var minValue = findMinValue(data, parameterName);
            var maxValue = findMaxValue(data, parameterName)

            var scale = d3.scale.linear()
                .domain([maxValue, minValue])
                .range([0, axisHeight]);

            return scale;
        }

        function renderNumericXAxis(parentG, data, parameterName, margin, width, height) {
            var axisWidth = width - 2 * margin;

            var scale = buildXScale(data, parameterName, axisWidth);

            var axis = d3.svg.axis()
                .scale(scale)
                .orient("bottom");

            parentG.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + margin + "," + (height-margin) + ")")
                .call(axis);

            d3.selectAll("g.x g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", -(height-2*margin));
        }

        function renderNumericYAxis(parentG, data, parameterName, margin, width, height) {
            var axisHeight = height - 2 * margin;

            var scale = buildYScale(data, parameterName, axisHeight);

            var axis = d3.svg.axis()
                .scale(scale)
                .orient("left");

            parentG.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" +margin+ "," +margin+ ")")
                .call(axis);

            d3.selectAll("g.y g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width-2*margin)
                .attr("y2", 0);
        }

        function renderPoints(parentG, data, xParameterName, yParameterName, margin, width, height)
        {
            var colors = d3.scale.category10();

            var yScale = buildYScale(data, yParameterName, height - 2 * margin);
            var xScale = buildXScale(data, xParameterName, width - 2 * margin);


            data.forEach(function (list, i) {
                parentG.selectAll("circle._" + i)
                    .data(list)
                    .enter()
                    .append("circle")
                    .attr("class", "dot _" + i);

                parentG.selectAll("circle._" + i)
                    .data(list)
                    .style("stroke", function (d) {
                        return colors(i);
                    })
                    .transition()
                    .attr("cx", function (d) { return xScale(d[xParameterName]); })
                    .attr("cy", function (d) { return yScale(d[yParameterName]); })
                    .attr("r", 4.5);
            });
        }

        function renderLines(parentG, data, xParameterName, yParameterName, margin, width, height) {

            var colors = d3.scale.category10();

            var yScale = buildYScale(data, yParameterName, height - 2 * margin);
            var xScale = buildXScale(data, xParameterName, width - 2 * margin);

            var line = d3.svg.line()
                .x(function (d) { return xScale(d[xParameterName]); })
                .y(function (d) { return yScale(d[yParameterName]); });

            parentG.selectAll("path.line")
                .data(data)
                .enter()
                .append("path")
                .style("stroke", function (d, i) {
                    return colors(i);
                })
                .attr("class", "line");

            parentG.selectAll("path.line")
                .data(data)
                .transition()
                .attr("d", function (d) { return line(d); });
        }

        function render(element, data, width, height, margin)
        {
            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var parentSvg = d3.select(element[0])
                .append('svg')
                .attr('width', ''+width)
                .attr('height', ''+height);

            var axesG = parentSvg.append("g")
                .attr("class", "axes");

            renderNumericXAxis(axesG, data, 'hour', margin, width, height);
            renderNumericYAxis(axesG, data, 'sales', margin, width, height);

            var bodyG = parentSvg.append("g")
                .attr("class", "body")
                .attr("transform", "translate(" +margin+ "," +margin+ ")" );

            renderLines(bodyG, data, 'hour', 'sales', margin, width, height);
            renderPoints(bodyG, data, 'hour', 'sales', margin, width, height);
            
        }

        return {
            restrict: 'A',
            scope: {
                data: '=',
                width: '=',
                height: '=',
                margin: '='
            },
            link: function(scope, element, attrs) {

                scope.$watchGroup(['width', 'height'], function() {
                    render(element, scope.data, scope.width, scope.height, scope.margin);
                });

                render(element, scope.data, scope.width, scope.height, scope.margin);
            }

          };
    });

})();