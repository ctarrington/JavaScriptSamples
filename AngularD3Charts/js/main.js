(function () {
    'use strict';

angular.module('main', ['simpleCharts']);

angular.module('main').controller('MainController', ['$scope', function($scope) {

    var salesVariables = {
        x: {name: 'Time', units: 'Hours'},
        y: {name: 'Sales', units: 'Dollars'}
    };

    var beforeSeries = [[1, 54], [2, 77], [3, 70], [4, 63], [6, 47], [7, 27]];
    var afterSeries = [[1, 69], [2, 77], [3, 72], [4, 50], [6, 55], [7, 30]];


    $scope.beforeAndAfterData = { variables: salesVariables, seriesList: [beforeSeries, afterSeries] };

    var leftSeries = [[1, 154], [2, 177], [3, 170]];
    var rightSeries = [[4, 150], [6, 155], [7, 130]];

    $scope.leftAndRightData = { variables: salesVariables, seriesList: [leftSeries, rightSeries] };


    var fuzzyUpSeries = [];
    var slope = 2;
    var y0 = 10;
    var fuzzyness = 8;
    var numPoints = 20;

    for (var ctr=0; ctr<numPoints; ctr++ )
    {
        var noise = Math.random()*fuzzyness*2 - fuzzyness;
        var y = slope*ctr +y0 +noise;
        var point = [];
        point.push(ctr);
        point.push(y);

        fuzzyUpSeries.push(point);
    }

    $scope.fuzzyUpData = { variables: salesVariables, seriesList: [fuzzyUpSeries] };

}]);

})();
