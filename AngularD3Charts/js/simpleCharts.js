
(function () {
    'use strict';

    var smallDimensions = {width: 500, height: 250};
    var largeDimensions = {width: 1000, height: 500};

    angular.module('simpleCharts', []);

    angular.module('simpleCharts').controller('ChartController', ['$scope', function ($scope) {
        $scope.model = {
            dimensions: smallDimensions,
            popup: false
        };
    }]);

    angular.module('simpleCharts').directive('chartContainer', function () {


        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-class="{chartContainer: true, popup: isPopup()}"><button ng-click="toggle()">Toggle</button><ng-transclude></ng-transclude></div>',
            link: function(scope, element, attrs) {
                scope.isPopup = function () {
                    return scope.model.popup;
                };

                scope.toggle = function () {
                    scope.model.popup = !scope.model.popup;
                    scope.model.dimensions = (scope.model.popup) ? largeDimensions : smallDimensions;
                };
            }
        };

    });

    angular.module('simpleCharts').directive('simpleLineChart', function () {

        var colors = d3.scale.category10();

        function findMinValue(data, index)
        {
            var minimums = [];
            for (var seriesCtr = 0; seriesCtr < data.seriesList.length; seriesCtr++)
            {
                var minValue = d3.min(data.seriesList[seriesCtr], function (d) {
                    return d[index];
                });
                minimums.push(minValue);
            }

            return d3.min(minimums);
        }

        function findMaxValue(data, index)
        {
            var maximums = [];
            for (var seriesCtr = 0; seriesCtr < data.seriesList.length; seriesCtr++)
            {
                var maxValue = d3.max(data.seriesList[seriesCtr], function (d) {
                    return d[index];
                });
                maximums.push(maxValue);
            }

            return d3.max(maximums);
        }

        function buildXScale(data, axisWidth)
        {
            var minValue = findMinValue(data, 0);
            var maxValue = findMaxValue(data, 0);

            var scale = d3.scale.linear()
                .domain([minValue, maxValue])
                .range([0, axisWidth]);

            return scale;
        }

        function buildYScale(data, axisHeight)
        {
            var minValue = findMinValue(data, 1);
            var maxValue = findMaxValue(data, 1);

            var delta = maxValue - minValue;
            var adjustedMinValue = minValue-delta*.2;
            adjustedMinValue = Math.min(adjustedMinValue, 0);

            var adjustedMaxValue = maxValue+delta*.2;

            var scale = d3.scale.linear()
                .domain([adjustedMaxValue, adjustedMinValue])
                .range([0, axisHeight]);

            return scale;
        }

        function renderNumericXAxis(parentG, data, margin, width, height) {
            var axisWidth = width - 2 * margin;

            var scale = buildXScale(data, axisWidth);

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

        function renderNumericYAxis(parentG, data, margin, width, height) {
            var axisHeight = height - 2 * margin;

            var scale = buildYScale(data, axisHeight);

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

        function createLineColorGetter(seriesIndex)
        {
            return function () { return colors(seriesIndex); }
        }

        function renderPoints(parentG, data, margin, width, height)
        {
            var yScale = buildYScale(data, height - 2 * margin);
            var xScale = buildXScale(data, width - 2 * margin);



            for (var seriesCtr = 0; seriesCtr < data.seriesList.length; seriesCtr++)
            {
                parentG.selectAll("circle._" + seriesCtr)
                    .data(data.seriesList[seriesCtr])
                    .enter()
                    .append("circle")
                    .attr("class", "dot _" + seriesCtr)
                    .append("title")
                    .text(function(d) { return '(' +d[0]+ ', '+d[1] +')'; });

                parentG.selectAll("circle._" + seriesCtr)
                    .data(data.seriesList[seriesCtr])
                    .style("stroke", createLineColorGetter(seriesCtr))
                    .transition()
                    .attr("cx", function (d) { return xScale(d[0]); })
                    .attr("cy", function (d) { return yScale(d[1]); })
                    .attr("r", 4.5);
            }
        }

        function renderLines(parentG, data, margin, width, height)
        {

            var colors = d3.scale.category10();

            var yScale = buildYScale(data, height - 2 * margin);
            var xScale = buildXScale(data, width - 2 * margin);

            var line = d3.svg.line()
                .x(function (d) { return xScale(d[0]); })
                .y(function (d) { return yScale(d[1]); });


            parentG.selectAll("path.line")
                .data(data.seriesList)
                .enter()
                .append("path")
                .style("stroke", function (d, i) {
                    return colors(i);
                })
                .attr("class", "line");

            parentG.selectAll("path.line")
                .data(data.seriesList)
                .transition()
                .attr("d", function (d) {
                    return line(d);
                });

        }

        function render(element, data, width, height, margin)
        {
            if (!width || !height) { return; }

            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var parentSvg = d3.select(element[0])
                .append('svg')
                .attr('width', ''+width)
                .attr('height', ''+height);

            var axesG = parentSvg.append("g")
                .attr("class", "axes");

            renderNumericXAxis(axesG, data, margin, width, height);
            renderNumericYAxis(axesG, data, margin, width, height);

            var bodyG = parentSvg.append("g")
                .attr("class", "body")
                .attr("transform", "translate(" +margin+ "," +margin+ ")" );

            renderLines(bodyG, data, margin, width, height);
            renderPoints(bodyG, data, margin, width, height);
            
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