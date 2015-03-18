
(function () {
    'use strict';

    var smallDimensions = {width: 500, height: 250};
    var largeDimensions = {width: 1000, height: 500};

    var colors = d3.scale.category10();

    function createLineColorGetter(seriesIndex)
    {
        return function () { return colors(seriesIndex); }
    }

    angular.module('simpleCharts', []);

    
    angular.module('simpleCharts').directive('simpleLineChart', function () {
                
        function createPlot(element, data, _width, _height, _margin)
        {

            function zoomed() 
            {
              svg.select(".x.axis").call(xAxis);
              svg.select(".y.axis").call(yAxis);
              renderPoints();
            }

            
            function renderPoints()
            {                

                for (var seriesCtr = 0; seriesCtr < data.seriesList.length; seriesCtr++)
                {
                    svg.selectAll("circle._" + seriesCtr)
                        .data(data.seriesList[seriesCtr])
                        .enter()
                        .append("circle")
                        .attr("class", "dot _" + seriesCtr)
                        .append("title")
                        .text(function(d) { return '(' +d[0]+ ', '+d[1] +')'; });

                    svg.selectAll("circle._" + seriesCtr)
                        .data(data.seriesList[seriesCtr])
                        .style("stroke", createLineColorGetter(seriesCtr))
                        .attr("cx", function (d) { return x(d[0]); })
                        .attr("cy", function (d) { return y(d[1]); })
                        .attr("r", 4.5);
                }
            }

            var margin = {top: _margin, right: _margin, bottom: _margin+10, left: _margin+20},
                width = _width - margin.left - margin.right,
                height = _height - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .domain([-width / 2, width / 2])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([-height / 2, height / 2])
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickSize(-height);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5)
                .tickSize(-width);

            var zoom = d3.behavior.zoom()
                .x(x)
                .y(y)
                .scaleExtent([1, 32])
                .on("zoom", zoomed);

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

            svg.append("rect")
                .attr("width", width)
                .attr("height", height);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);  

            renderPoints();          
        }

        function render(element, data, width, height, margin)
        {
            if (!width || !height) { return; }

            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var plot = createPlot(element, data, width, height, margin);
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
                render(element, scope.data, scope.width, scope.height, scope.margin);
            }

          };
    });

})();