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

    $scope.isPopup = function() {
      return dimensions[currentDimension].popup;
    };
    
    var smallDimensions = {width: 500, height: 250, popup: false};
    var bigDimensions = {width: 1000, height: 500, popup: false};
    var squareDimensions = {width: 1000, height: 1000, popup: true};

    var dimensions = [smallDimensions, bigDimensions, squareDimensions];
    var currentDimension = dimensions.length;
    $scope.toggleDimensions();

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

    $scope.chartData = [before, after];

}]);

})();
