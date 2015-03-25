
(function () {
    'use strict';

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
                
        function createPlot(element, data, title, _width, _height, _margins)
        {
            function calculateMargins()
            {
                if (_margins.length == 1)
                {
                    margin = {top: _margins[0], right: _margins[0], bottom: _margins[0], left: _margins[0]};
                }
                else if (_margins.length == 2)
                {
                    margin = {top: _margins[0], right: _margins[1], bottom: _margins[0], left: _margins[1]};
                }
                else
                {
                    margin = {top: _margins[0], right: _margins[1], bottom: _margins[2], left: _margins[3]};
                }
            }


            function createScalesAndAxes()
            {
                var xInterval = findFriendlyInterval(data, 0);
                xScale = d3.scale.linear()
                    .domain([xInterval.min, xInterval.max])
                    .range([0, width]);
                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(5)
                    .tickSize(-height);


                var yInterval = findFriendlyInterval(data, 1, {alwaysShowZero: true} );
                yScale = d3.scale.linear()
                    .domain([yInterval.min, yInterval.max])
                    .range([height, 0]);        
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5)
                    .tickSize(-width);
            }

            function createZoomablePlot()
            {
                var zoom = d3.behavior.zoom()
                    .x(xScale)
                    .y(yScale)
                    .scaleExtent([0.7,35])
                    .on("zoom", zoomed);

                outerSvg = d3.select("body").append("svg")
                    .attr("width", _width)
                    .attr("height", _height);

                svg = outerSvg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(zoom);
            }
            
            function renderTitleAndLabels()
            {
                // title
                outerSvg.append("g")
                    .attr("transform", "translate("+(margin.left+width/2)+", 15)")
                    .append("text")                
                    .attr("text-anchor", "middle")                
                    .text(title)
                    .attr("class", "title");

                // x axis label
                outerSvg.append("g")
                    .attr("transform", "translate("+(_width/2)+","+(_height-3)+")")
                    .append("text")                
                    .attr("text-anchor", "middle")                
                    .text(data.variables.x.name+" ("+data.variables.x.units+")")
                    .attr("class", "x axis label");

                // y axis label
                outerSvg.append("g")
                    .attr("transform", "translate(12, "+_height/2+"), rotate(-90)")
                    .append("text")                
                    .attr("text-anchor", "middle")                
                    .text(data.variables.y.name+" ("+data.variables.y.units+")")
                    .attr("class", "y axis label");
            }

            function renderAxes()
            {
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
            }

            function zoomed() 
            {
              svg.select(".x.axis").call(xAxis);
              svg.select(".y.axis").call(yAxis);
              renderPlotElements();
            }

            function renderPlotBackground()
            {
                svg.append("rect")
                    .style("fill", "lightgrey")
                    .attr("width", width)
                    .attr("height", height);

                svg.append("clipPath")
                    .attr("id", clipId)
                    .append("rect")                
                    .attr("width", width)
                    .attr("height", height);
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
                        .attr("cx", function (d) { return xScale(d[0]); })
                        .attr("cy", function (d) { return yScale(d[1]); })
                        .attr("r", 4.5);
                }
            }

            function renderLines()
            {            

                var line = d3.svg.line()
                    .x(function (d) { return xScale(d[0]); })
                    .y(function (d) { return yScale(d[1]); });


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

            var margin = null;
            calculateMargins();            
            
            var width = _width - margin.left - margin.right;
            var height = _height - margin.top - margin.bottom;    

            var xScale, xAxis, yScale, yAxis;
            createScalesAndAxes();            

            var outerSvg, svg;
            createZoomablePlot();            

            renderTitleAndLabels();
            renderPlotBackground();            
            renderAxes();            

            renderPlotElements();          
        }

        function render(element, data, title, width, height, margin)
        {
            width = width || 500;
            height = height || 500;
            margin = margin || "30 10 40 50";
            margin = ""+margin;

            var margins = margin.split(' ');
            for (var ctr=0; ctr<margins.length;ctr++)
            {
                margins[ctr] = Number(margins[ctr]);
            }


            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var plot = createPlot(element, data, title, width, height, margins);
        }

        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {            
                render(element, scope.data, attrs.title, attrs.width, attrs.height, attrs.margin);
            }

          };
    });

})();