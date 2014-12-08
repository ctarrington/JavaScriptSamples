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


    var straightLine = createFuzzyLine(0, 10, 0);
    var veryFuzzyLine = createFuzzyLine(0, 10, 20);

    $scope.fuzzyUpData = { variables: salesVariables, seriesList: [straightLine.getPoints(0, 1, 10), veryFuzzyLine.getPoints(0, 0.5, 20)] };

}]);

})();
