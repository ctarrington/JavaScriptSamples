(function () {
    'use strict';

    angular.module('jsvgs', []);

    angular.module('jsvgs').controller('MainController', ['$scope', function($scope) {
        $scope.data = Lazy.range(1, 249, 249/10).toArray();

    }]);

})();
