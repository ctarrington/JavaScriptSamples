function PeopleCtrl($scope, $timeout) {

    $scope.people = [{name: 'Fred', age: 34}, {name: 'Ted', age: 35}];
    $scope.newName = null;
    $scope.newAge = null;
    $scope.barkSound = 'Wooooooof';


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
            template: '<div>Yo from {{$parent.person.name}} who is {{$parent.person.age}} years old. </div>'
        }
    }).
    directive('dog', function($document) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {name: '@name',
                    breed: '@breed'
            },
            template: '<div ng-transclude>{{name}} the {{breed}} says </div>',
            link: function($scope, element, attrs) {
                var currentElement = angular.element(element);

                currentElement.bind('click', function() {
                        alert('Hi from '+$scope.name);
                    } );
            }
        }
    });
