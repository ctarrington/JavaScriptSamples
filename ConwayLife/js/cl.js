/* jshint browser: true */

(function(){
    "use strict";

    var VIEW_CELL_SIZE = 5;
    var MODEL_SIZE = 100;
    var INTERVAL = 250;


    // x,y pairs
    var LINE_BLINKER = [
        [0,0],
        [0,1],
        [0,2]
    ];

    var R_PENTOMINO = [
        [0,1], [1,0], [1,1], [1,2], [2,0]
    ];

    var initialCells = R_PENTOMINO;

    var data = [];
    var view = [];

    function px(value)
    {
        return value+'px';
    }

    function initModel()
    {
        for (var xctr=0; xctr<MODEL_SIZE; xctr++)
        {
            data[xctr] = [];
            for (var yctr=0; yctr<MODEL_SIZE; yctr++)
            {
                data[xctr][yctr] = {alive: 0};
            }
        }

        var minX = MODEL_SIZE;
        var maxX = 0;

        var minY = MODEL_SIZE;
        var maxY = 0;

        for (var ctr=0; ctr<initialCells.length; ctr++)
        {
            var cell = initialCells[ctr];
            var x = cell[0];
            var y = cell[1];

            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);

            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }

        var modelWidth = maxX - minX;
        var modelHeight = maxY - minY;

        var xOffset = Math.floor( (MODEL_SIZE - modelWidth)/2 );
        var yOffset = Math.floor( (MODEL_SIZE - modelHeight)/2 );


        for (var ctr=0; ctr<initialCells.length; ctr++)
        {
            var cell = initialCells[ctr];
            var x = cell[0];
            var y = cell[1];
            data[x+xOffset][y+yOffset].alive = 1;
        }
    }

    function updateModel()
    {
        var previous = $.extend(true, {}, data);

        for (var xctr=0; xctr<MODEL_SIZE; xctr++)
        {
            for (var yctr=0; yctr<MODEL_SIZE; yctr++)
            {
                data[xctr][yctr].alive = isAlive(previous, xctr, yctr);
            }
        }
    }

    function isAlive(previous, x, y)
    {
        var neighbors = 0;
        for (var xctr = x-1; xctr <= x+1; xctr++)
        {
            for (var yctr = y-1; yctr <= y+1; yctr++)
            {
                if (xctr >= 0 && xctr < MODEL_SIZE && yctr >= 0 && yctr < MODEL_SIZE && (xctr != x || yctr != y) )
                {
                    neighbors = neighbors + previous[xctr][yctr].alive;
                }
            }
        }

        if (previous[x][y].alive == 1)
        {
            return (neighbors == 2 || neighbors == 3) ? 1 : 0;
        }

        return (neighbors == 3) ? 1 : 0;
    }

    function calculateClasses(x, y)
    {
        return (data[x][y].alive == 1) ? "alive" : "";
    }

    function initView()
    {
        var container = $('#container');

        for (var xctr=0; xctr<MODEL_SIZE; xctr++)
        {
            view[xctr] = [];
            for (var yctr=0; yctr<MODEL_SIZE; yctr++)
            {
                var newCell = $(document.createElement('div'));
                newCell.attr('class', 'cell');
                newCell.css('left', px(xctr*VIEW_CELL_SIZE));
                newCell.css('top',  px(yctr*VIEW_CELL_SIZE));
                newCell.css('width',px(VIEW_CELL_SIZE));
                newCell.css('height', px(VIEW_CELL_SIZE));
                newCell.addClass(calculateClasses(xctr, yctr));

                container.append(newCell);
                view[xctr][yctr] = newCell;
            }
        }
    }

    function updateView()
    {
        for (var xctr=0; xctr<MODEL_SIZE; xctr++)
        {
            for (var yctr=0; yctr<MODEL_SIZE; yctr++)
            {
                var viewCell = view[xctr][yctr];
                viewCell.removeClass('alive');
                viewCell.addClass(calculateClasses(xctr, yctr));
            }
        }
    }

    function init()
    {
        initModel();
        initView();
        setTimeout(tick, INTERVAL);
    }

    function tick()
    {
        updateModel();
        updateView();
        setTimeout(tick, INTERVAL);
    }


    $(document).ready(init);
})();

