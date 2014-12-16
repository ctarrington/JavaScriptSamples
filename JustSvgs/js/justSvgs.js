(function () {
    'use strict';

    angular.module('jsvgs', []);

    angular.module('jsvgs').controller('MainController', ['$scope', function($scope) {
        $scope.data = {
            yvalues: Lazy.range(1, 251, 248 / 10).toArray(),
            xvalues: Lazy.range(1, 501, 498 / 10).toArray()
        };
    }]);

})();
