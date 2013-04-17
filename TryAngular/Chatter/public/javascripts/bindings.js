function BindingsCtrl($scope, $timeout) {

    $scope.bindings = {name: null,
        ctr: 0,
        greetings: ['Yo', 'Hello', 'Hey', 'Hi'],
        currentGreeting: 'Yo'};

    $scope.addGreeting = function() {
        $scope.bindings.greetings.push($scope.newGreeting);
    };

    $scope.$watch('bindings.ctr', function(){
        $timeout(function(){
            $scope.bindings.ctr++;
        },1000);
    });
}