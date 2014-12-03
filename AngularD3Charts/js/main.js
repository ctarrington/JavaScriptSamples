(function () {
    'use strict';

angular.module('main', ['simpleCharts']);

angular.module('main').controller('MainController', ['$scope', function($scope) {

    var before = [
        {hour: 1,sales: 54},
        {hour: 2,sales: 77},
        {hour: 3,sales: 70},
        {hour: 4,sales: 63},
        {hour: 6,sales: 47},
        {hour: 7,sales: 27}
    ];

    var after = [
        {hour: 1.5,sales: 69},
        {hour: 2.5,sales: 79},
        {hour: 3.5,sales: 73},
        {hour: 4.5,sales: 51},
        {hour: 5.5,sales: 49},
        {hour: 6.5,sales: 62},
        {hour: 7.5,sales: 30}
    ];

    $scope.beforeAndAfterData = [before, after];

    var left = [
        {hour: 1,sales: 154},
        {hour: 2,sales: 177},
        {hour: 3,sales: 170},
        {hour: 4,sales: 163},
        {hour: 6,sales: 147},
        {hour: 7,sales: 127}
    ];

    var right = [
        {hour: 1.5,sales: 169},
        {hour: 2.5,sales: 179},
        {hour: 3.5,sales: 173},
        {hour: 4.5,sales: 151},
        {hour: 5.5,sales: 149},
        {hour: 6.5,sales: 162},
        {hour: 7.5,sales: 130}
    ];

    $scope.leftAndRightData = [left, right];

}]);

})();
