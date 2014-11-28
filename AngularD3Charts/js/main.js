(function () {
    'use strict';

angular.module('main', ['simpleCharts']);

angular.module('main').controller('MainController', ['$scope', function($scope) {
    $scope.chartData = [
    {hour: 1,sales: 54},
    {hour: 1.5,sales: 66},
    {hour: 2,sales: 77},
    {hour: 3,sales: 70},
    {hour: 3.5,sales: 60},
    {hour: 4,sales: 63},
    {hour: 4.5,sales: 55},
    {hour: 6,sales: 47},
    {hour: 6.5,sales: 55},
    {hour: 7,sales: 30}
    ];
}]);

})();
