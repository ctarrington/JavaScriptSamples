function CarsCtrl($scope) {

    $scope.cars = [];
    $scope.newCar = {make: null, model: null};

    $scope.addCar = function() {
        $scope.cars.push($scope.newCar);
        $scope.newCar = {make: null, model: null};
    };
}