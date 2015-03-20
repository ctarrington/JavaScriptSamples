
(function () {
    'use strict';

    var smallDimensions = {width: 500, height: 250};
    var largeDimensions = {width: 1000, height: 500};

    var colors = d3.scale.category10();

    function createLineColorGetter(seriesIndex)
    {
        return function () { return colors(seriesIndex); }
    }

    function findExtremeValue(data, index, extremeFunction)
    {
        var extremes = [];
        for (var seriesCtr = 0; seriesCtr < data.seriesList.length; seriesCtr++)
        {
            var extreme = extremeFunction(data.seriesList[seriesCtr], function (d) {
                return d[index];
            });
            extremes.push(extreme);
        }

        return extremeFunction(extremes);   
    }

    function findIntervalPadding(min, max)
    {
        if (min === max) { return 1; }
        var width = max-min;
        var padding = 0.1*width;
        return padding;
    }

    function findFriendlyInterval(data, index, params)
    {
        params = params || {};

        var min = findExtremeValue(data, index, d3.min);            
        var max = findExtremeValue(data, index, d3.max);

        if (params.alwaysShowZero)
        {
            min = Math.min(0, min);
        }

        var padding = findIntervalPadding(min, max);            
        min -= padding;
        max += padding;

        return { min: min, max: max} ;
    }

    angular.module('simpleCharts', []);

    
    angular.module('simpleCharts').directive('simpleLineChart', function () {
                
        function createPlot(element, data, _width, _height, _margin)
        {

            function zoomed() 
            {
              svg.select(".x.axis").call(xAxis);
              svg.select(".y.axis").call(yAxis);
              renderPlotElements();
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
                        .attr("clip-path", "url(#"+clipId+")")                        
                        .append("title")
                        .text(function(d) { return '(' +d[0]+ ', '+d[1] +')'; });

                    svg.selectAll("circle._" + seriesCtr)
                        .data(data.seriesList[seriesCtr])
                        .style("stroke", createLineColorGetter(seriesCtr))
                        .style("fill", createLineColorGetter(seriesCtr))
                        .attr("cx", function (d) { return x(d[0]); })
                        .attr("cy", function (d) { return y(d[1]); })
                        .attr("r", 4.5);
                }
            }

            function renderLines()
            {            

                var line = d3.svg.line()
                    .x(function (d) { return x(d[0]); })
                    .y(function (d) { return y(d[1]); });


                svg.selectAll("path.line")
                    .data(data.seriesList)
                    .enter()
                    .append("path")
                    .attr("clip-path", "url(#"+clipId+")")
                    .style("stroke", function (d, i) {
                        return colors(i);
                    })
                    .attr("class", "line");

                svg.selectAll("path.line")
                    .data(data.seriesList)
                    .attr("d", function (d) {
                        return line(d);
                    });

            }

            function renderPlotElements()
            {
                renderPoints();    
                renderLines();  
            }

            var clipId = 'clip'+Math.ceil(Math.random()*10000);

            var xInterval = findFriendlyInterval(data, 0);
            var yInterval = findFriendlyInterval(data, 1, {alwaysShowZero: true} );        

            var margin = {top: _margin, right: _margin, bottom: _margin+10, left: _margin+20},
                width = _width - margin.left - margin.right,
                height = _height - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .domain([xInterval.min, xInterval.max])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([yInterval.min, yInterval.max])
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
                .scaleExtent([0.7,35])
                .on("zoom", zoomed);

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

            svg.append("clipPath")
                .attr("id", clipId)
                .append("rect")                
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "blue");

            var chartRect = svg.append("rect")
                .attr("class", "chartBackground")
                .attr("width", width)
                .attr("height", height);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);    

            renderPlotElements();          
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