
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

    function findFriendlyInterval(data, index, alwaysShowZero)
    {
        var min = findExtremeValue(data, index, d3.min);            
        var max = findExtremeValue(data, index, d3.max);

        var padding = findIntervalPadding(min, max);            
        min -= padding;
        max += padding;

        if (alwaysShowZero)
        {
            min = Math.min(0, min);
        }        

        return { min: min, max: max} ;
    }    

    function formatAsDate(d)
    {
        var asMoment = moment.utc(d);
        return asMoment.format('YYYY/MM/DD HH:mm:ss');
    }

    angular.module('simpleCharts', []);

    
    angular.module('simpleCharts').directive('simpleLineChart', function () {
                
        function createPlot(element, data, title, _width, _height, _margins, alwaysShowZero)
        {      
            function formatPointTitle(d)
            {
                var xFormatted = (xAxisIsDate) ? formatAsDate(d[0]) : d[0];
                var yFormatted = (yAxisIsDate) ? formatAsDate(d[1]) : d[1];
                
                return '(' +xFormatted+ ', ' +yFormatted+ ')';
            }

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

                if (xAxisIsDate)
                {
                    xScale = d3.time.scale.utc()
                        .domain([xInterval.min, xInterval.max])
                        .range([0, width]);
                }
                else
                {
                    xScale = d3.scale.linear()
                        .domain([xInterval.min, xInterval.max])
                        .range([0, width]);
                }

                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(5)
                    .tickSize(-height);

                if (xAxisIsDate)
                {
                    xAxis.tickFormat(function(d) {
                        return formatAsDate(d);                        
                    });
                }


                var yInterval = findFriendlyInterval(data, 1, alwaysShowZero);

                if (yAxisIsDate)
                {
                    yScale = d3.time.scale.utc()
                        .domain([yInterval.min, yInterval.max])
                        .range([height, 0]);
                }
                else
                {
                    yScale = d3.scale.linear()
                        .domain([yInterval.min, yInterval.max])
                        .range([height, 0]);
                }
                        
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5)
                    .tickSize(-width);

                if (yAxisIsDate)
                {
                    yAxis.tickFormat(function(d) {
                        var asMoment = moment.utc(d);
                        return asMoment.format('YYYY/MM/DD HH:mm:ss');
                    });
                }
            }

            function createZoomablePlot()
            {
                zoom = d3.behavior.zoom()
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

            function renderResetButton()
            {
                var buttonY = _height-14;
                var padding = 4;

                var resetText = outerSvg.append("g")
                    .attr("transform", "translate("+(_width-margin.right-80)+", "+(buttonY+padding)+")")
                    .append("text")                
                    .attr("text-anchor", "left")
                    .attr("class","reset button dummy")                
                    .text("Reset Zoom")
                    .on('click', resetZoom);

                var bbox = resetText[0][0].getBBox();                
                var button_width = bbox.width+2*padding;
                var button_height = bbox.height+2*padding;


                var buttonBackground = outerSvg.append("g")
                    .attr("transform", "translate("+(_width-margin.right-80-padding)+", "+(buttonY-3*padding)+")")
                    .append("rect")                                    
                    .attr("class","reset button")                                                        
                    .attr('width', button_width)
                    .attr('height', button_height)
                    .on('click', resetZoom);

                resetText = outerSvg.append("g")
                    .attr("transform", "translate("+(_width-margin.right-80)+", "+(buttonY+padding)+")")
                    .append("text")                
                    .attr("text-anchor", "left")
                    .attr("class","reset button")                
                    .text("Reset Zoom")
                    .on('click', resetZoom);
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

                refreshAxes();
            }

            function refreshAxes()
            {                
                if (xAxisIsDate)
                {
                    svg.select(".x.axis")
                        .call(xAxis)
                        .selectAll("text")  
                            .style("text-anchor", "end")
                            .attr("dx", "-10px")
                            .attr("dy", "10px")
                            .attr("transform", function(d) {
                                return "rotate(-45)" 
                                });
                }
                else
                {
                    svg.select(".x.axis")
                        .call(xAxis);
                }

                svg.select(".y.axis").call(yAxis);

            }

            function resetZoom()
            {
                zoom.scale(1);
                zoom.translate([0,0]);
                zoomed();
            }

            function zoomed() 
            {
              refreshAxes();
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
                        .text(formatPointTitle);

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

            var xAxisIsDate = (data.variables.x.units.indexOf('Date') !== -1 || data.variables.x.units.indexOf('UTC') !== -1);
            var yAxisIsDate = (data.variables.y.units.indexOf('Date') !== -1 || data.variables.y.units.indexOf('UTC') !== -1);

            var clipId = 'clip'+Math.ceil(Math.random()*10000);               

            var margin = null;
            calculateMargins();            
            
            var width = _width - margin.left - margin.right;
            var height = _height - margin.top - margin.bottom;    

            var xScale, xAxis, yScale, yAxis;
            createScalesAndAxes();            

            var outerSvg, svg, zoom;
            createZoomablePlot();            

            renderTitleAndLabels();
            renderPlotBackground();            
            renderAxes();   
            renderResetButton();         

            renderPlotElements();          
        }

        function render(element, data, title, width, height, margin, alwaysShowZero)
        {
            width = width || 500;
            height = height || 500;
            margin = margin || "30 10 45 50";
            margin = ""+margin;

            alwaysShowZero = alwaysShowZero || false;

            var margins = margin.split(' ');
            for (var ctr=0; ctr<margins.length;ctr++)
            {
                margins[ctr] = Number(margins[ctr]);
            }


            var elementSelector = d3.select(element.context);
            var children = elementSelector.selectAll('*');
            children.remove();

            var plot = createPlot(element, data, title, width, height, margins, alwaysShowZero);            
        }

        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {
                render(element, scope.data, attrs.title, attrs.width, attrs.height, attrs.margin, attrs.alwaysshowzero);                
            }

          };
    });

})();