
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

        function renderNumericXAxis(parentG, data, parameterName, margin, width, height) {
            var axisWidth = width - 2 * margin;

            var minValue = findMinValue(data, parameterName);
            var maxValue = findMaxValue(data, parameterName);

            var scale = d3.scale.linear()
                .domain([minValue, maxValue])
                .range([0, axisWidth]);

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

            var minValue = findMinValue(data, parameterName);
            var maxValue = findMaxValue(data, parameterName)

            var scale = d3.scale.linear()
                .domain([maxValue, minValue])
                .range([0, axisHeight]);

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

        function render(element, data, width, height)
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

            renderNumericXAxis(axesG, data, 'hour', 30, width, height);
            renderNumericYAxis(axesG, data, 'sales', 30, width, height);
        }

        return {
            restrict: 'A',
            scope: {
                data: '=',
                width: '=',
                height: '='
            },
            link: function(scope, element, attrs) {

                scope.$watch('width', function() {
                    render(element, scope.data, scope.width, scope.height);
                });

                render(element, scope.data, scope.width, scope.height);
            }

          };
    });

})();