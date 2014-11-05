
var thingList = document.querySelector('thing-list');

var app = angular.module('app', []);

angular.module('app').controller('ThingsController', function ($scope) {
    $scope.model = {foo: 'bar'};

    $scope.model.things = [{appearance: {hairColor: 'orange', toothSize: 'huge'}},
        {appearance: {hairColor: 'blue', toothSize: 'tiny'}},
        {appearance: {hairColor: 'green', toothSize: 'normal'}},
        {appearance: {hairColor: 'purple', toothSize: 'large'}}];
});