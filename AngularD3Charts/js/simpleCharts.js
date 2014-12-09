
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

        function buildXScale()
        {
            var minValue = findMinValue(this.data, 0);
            var maxValue = findMaxValue(this.data, 0);

            return d3.scale.linear()
                .domain([minValue, maxValue])
                .range([0, this.axisWidth]);
        }

        function buildYScale()
        {
            var minValue = findMinValue(this.data, 1);
            var maxValue = findMaxValue(this.data, 1);

            var delta = maxValue - minValue;
            var adjustedMinValue = minValue-delta*.2;
            adjustedMinValue = Math.min(adjustedMinValue, 0);

            var adjustedMaxValue = maxValue+delta*.2;

            return d3.scale.linear()
                .domain([adjustedMaxValue, adjustedMinValue])
                .range([0, this.axisHeight]);
        }

        function renderNumericXAxis() {

            var axis = d3.svg.axis()
                .scale(this.xScale)
                .orient("bottom");

            this.axesG.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + this.margin + "," + (this.height-this.margin) + ")")
                .call(axis);

            d3.selectAll("g.x g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", -(this.height-2*this.margin));
        }

        function renderNumericYAxis() {

            var axis = d3.svg.axis()
                .scale(this.yScale)
                .orient("left");

            this.axesG.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" +this.margin+ "," +this.margin+ ")")
                .call(axis);

            d3.selectAll("g.y g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", this.width-2*this.margin)
                .attr("y2", 0);
        }

        function createLineColorGetter(seriesIndex)
        {
            return function () { return colors(seriesIndex); }
        }

        function renderPoints()
        {
            var that = this;

            for (var seriesCtr = 0; seriesCtr < this.data.seriesList.length; seriesCtr++)
            {
                this.bodyG.selectAll("circle._" + seriesCtr)
                    .data(this.data.seriesList[seriesCtr])
                    .enter()
                    .append("circle")
                    .attr("class", "dot _" + seriesCtr)
                    .append("title")
                    .text(function(d) { return '(' +d[0]+ ', '+d[1] +')'; });

                this.bodyG.selectAll("circle._" + seriesCtr)
                    .data(this.data.seriesList[seriesCtr])
                    .style("stroke", createLineColorGetter(seriesCtr))
                    .transition()
                    .attr("cx", function (d) { return that.xScale(d[0]); })
                    .attr("cy", function (d) { return that.yScale(d[1]); })
                    .attr("r", 4.5);
            }
        }

        function renderLines()
        {

            var colors = d3.scale.category10();

            var that = this;

            var line = d3.svg.line()
                .x(function (d) { return that.xScale(d[0]); })
                .y(function (d) { return that.yScale(d[1]); });


            this.bodyG.selectAll("path.line")
                .data(this.data.seriesList)
                .enter()
                .append("path")
                .style("stroke", function (d, i) {
                    return colors(i);
                })
                .attr("class", "line");

            this.bodyG.selectAll("path.line")
                .data(this.data.seriesList)
                .transition()
                .attr("d", function (d) {
                    return line(d);
                });

        }

        function createPlot(element, data, width, height, margin)
        {
            var plot = {
                element: element,
                data: data,
                width: width,
                height: height,
                margin: margin,
                buildXScale: buildXScale,
                buildYScale: buildYScale,
                renderNumericXAxis: renderNumericXAxis,
                renderNumericYAxis: renderNumericYAxis,
                renderLines: renderLines,
                renderPoints: renderPoints,
                render: function() {
                    this.parentSvg = d3.select(element[0])
                        .append('svg')
                        .attr('width', ''+width)
                        .attr('height', ''+height);

                    this.axesG = this.parentSvg.append("g")
                        .attr("class", "axes");

                    this.bodyG = this.parentSvg.append("g")
                        .attr("class", "body")
                        .attr("transform", "translate(" +margin+ "," +margin+ ")" );

                    this.axisWidth = this.width - 2 * this.margin;
                    this.xScale = this.buildXScale();

                    this.axisHeight = this.height - 2 * this.margin;
                    this.yScale = this.buildYScale();

                    this.renderNumericXAxis();
                    this.renderNumericYAxis();

                    this.renderLines();
                    this.renderPoints();
                }
            };

            return plot;
        }

        function render(element, data, width, height, margin)
        {
            if (!width || !height) { return; }

            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var plot = createPlot(element, data, width, height, margin);
            plot.render();
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