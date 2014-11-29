(function () {
    'use strict';

angular.module('main', ['simpleCharts']);

angular.module('main').controller('MainController', ['$scope', function($scope) {
    
    $scope.toggleDimensions = function() {
        currentDimension++;
        if (currentDimension >= dimensions.length) { currentDimension = 0; }
        $scope.chartWidth = dimensions[currentDimension].width;
        $scope.chartHeight = dimensions[currentDimension].height;
    };
    
    var smallDimensions = {width: 500, height: 250};
    var bigDimensions = {width: 1000, height: 500};
    var squareDimensions = {width: 750, height: 750};

    var dimensions = [smallDimensions, bigDimensions, squareDimensions];
    var currentDimension = dimensions.length;
    $scope.toggleDimensions();

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
