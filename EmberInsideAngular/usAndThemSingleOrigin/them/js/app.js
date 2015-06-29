var themApp = angular.module('themApp', ['ngRoute', 'carControllers']);

themApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/cars', {
                templateUrl: 'them/partials/car-list.html',
                controller: 'CarListCtrl'
            }).
            when('/cars/:carId', {
                templateUrl: 'them/partials/car-detail.html',
                controller: 'CarDetailCtrl'
            }).
            otherwise({
                redirectTo: '/cars'
            });
    }]);

var carControllers = angular.module('carControllers', []);

carControllers.controller('CarListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('them/data/cars.json').success(function(data) {
            $scope.cars = data;
        });

        $scope.orderProp = 'age';
    }]);

carControllers.controller('CarDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.carId = $routeParams.carId;

        initializeCandyStore();
    }]);