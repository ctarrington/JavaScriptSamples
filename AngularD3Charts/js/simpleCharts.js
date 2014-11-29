
(function () {
    'use strict';




    angular.module('simpleCharts', []);

    angular.module('simpleCharts').directive('simpleLineChart', function () {

        function renderNumericXAxis(parentSvg, data, xParameter)
        {
            var margin = 25;
            var width = parentSvg[0][0].clientWidth;
            var height= parentSvg[0][0].clientHeight;
            var axisWidth = width - 2*margin;

            var maxXValue = d3.max(data, function(d) {
                return d[xParameter];
            })

            var xAxisSvg = parentSvg.append("svg")
                .attr("class", "axis")
                .attr("width", width)
                .attr("height", height);

            var scale = d3.scale.linear()
                .domain([0, maxXValue])
                .range([0, axisWidth]);

            var axis = d3.svg.axis()
                .scale(scale)
                .ticks(5)
                .tickSubdivide(5) // <-A
                .tickPadding(10) // <-B
                .tickFormat(function(v){ // <-C
                    return v;
                });

            xAxisSvg.append("g")
                .attr("transform", function(){
                    return "translate(" + margin + "," + (height-2*margin) + ")";
                })
                .call(axis);
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

            renderNumericXAxis(parentSvg, data, 'hour');
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