
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

        function render(parentSvg, data)
        {
            parentSvg.selectAll('*').remove();
            renderNumericXAxis(parentSvg, data, 'hour');
        }

        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {
                
                var width = element.context.clientWidth;
                var height= element.context.clientHeight;

                var parentSvg = d3.select(element[0])
                    .append('svg')
                    .style('width', ''+width)
                    .style('height', ''+height);

                render(parentSvg, scope.data);
            }

          };
    });

})();