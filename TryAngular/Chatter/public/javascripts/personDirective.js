function PeopleCtrl($scope, $timeout) {

    $scope.people = [{name: 'Fred', age: 34}, {name: 'Ted', age: 35}];
    $scope.newName = null;
    $scope.newAge = null;


    $scope.addPerson = function() {
        $scope.people.push({name: $scope.newName, age: $scope.newAge});
    };
}

angular.module('appOfThings', []).
    directive('personThing', function($document) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {},
            template: '<div>Yo from {{$parent.person.name}}</div>'
        }
    });
