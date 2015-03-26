(function () {
    'use strict';

var DAY_IN_MILLISECONDS = 24*60*60*1000;

angular.module('main', ['simpleCharts']);

angular.module('main').controller('MainController', ['$scope', function($scope) {

    var salesVariables = {
        x: {name: 'Time', units: 'Hours'},
        y: {name: 'Sales Data', units: 'Dollars'}
    };

    var longSalesVariables = {
        x: {name: 'Time', units: 'Hours'},
        y: {name: 'Sales Data from 2014 and Q1 2015', units: 'Dollars'}
    };
    var beforeSeries = [[1.5, 54], [2, 77], [3, 70], [4, 63], [6, 47], [7, 27]];
    var afterSeries = [[1.5, 69], [2, 77], [3, 72], [4, 50], [6, 55], [7, 30]];


    $scope.beforeAndAfterData = { variables: salesVariables, seriesList: [beforeSeries, afterSeries] };

    var leftSeries = [[1, -10.9], [2, -5], [3, 2]];
    var rightSeries = [[4, 3], [6, 4], [7, 5.2]];

    $scope.leftAndRightData = { variables: salesVariables, seriesList: [leftSeries, rightSeries] };


    var straightLine = createFuzzyLine(0, 10, 0);
    var veryFuzzyLine = createFuzzyLine(0, 10, 20);
    $scope.fuzzyUpData = { variables: salesVariables, seriesList: [straightLine.getPoints(0, 1, 10), veryFuzzyLine.getPoints(0, 0.5, 20)] };

    var verySmallFuzzyLine = createFuzzyLine(-0.00025, 0.00005, 0.0001);
    $scope.smallFuzzyUpData = { variables: salesVariables, seriesList: [verySmallFuzzyLine.getPoints(0.2, 1, 10)] };

    var longLines = [];
    for (var ctr=0; ctr<10; ctr++)
    {
        var fl = createFuzzyLine(ctr*3+2, 0.5, 0.5);
        var points = fl.getPoints(1, 0.25, 300);
        longLines.push(points);
    }
    $scope.longData = { variables: longSalesVariables, seriesList: longLines };

    var zeros = [[0,0],[1,0],[2,0],[3,0]];
    $scope.allZeros = { variables: longSalesVariables, seriesList: [zeros] };

    var straightUp = [[0,0],[0,1],[0,2],[0,3]];
    $scope.allUp = { variables: longSalesVariables, seriesList: [straightUp] };

    var dateOnYLine = createFuzzyLine(moment.utc().valueOf(), DAY_IN_MILLISECONDS, 0.75*DAY_IN_MILLISECONDS);
    var dateOnYPoints = dateOnYLine.getPoints(2, 1, 10);
    var dateOnYVariables = {
        x: {name: 'Stuff', units: 'Widgets'},
        y: {name: 'The Date', units: 'UTC'}
    };
    $scope.dateOnY = { variables: dateOnYVariables, seriesList: [dateOnYPoints] };


    var dateOnXLine = createFuzzyLine(0, 4, 4);
    var dateOnXPoints = dateOnXLine.getPoints(0, 1 , 10);

    var startDay = moment.utc();
    for (var ctr=0; ctr < 10; ctr++)
    {
        dateOnXPoints[ctr][0] = startDay.add(1, 'days').valueOf();
    }

    var dateOnXVariables = {
        x: {name: 'Day', units: 'UTC'},
        y: {name: 'Stuff', units: 'Widgets'}
    };
    $scope.dateOnX = { variables: dateOnXVariables, seriesList: [dateOnXPoints] };



}]);

})();
