function ChatterCtrl($scope, $timeout) {

    $scope.chatter = {name: null,
        ctr: 0,
        greetings: ['Yo', 'Hello', 'Hey', 'Hi'],
        currentGreeting: 'Yo'};

    $scope.addGreeting = function() {
        $scope.chatter.greetings.push($scope.newGreeting);
    };

    $scope.$watch('chatter.ctr', function(){
        $timeout(function(){
            $scope.chatter.ctr++;
        },1000);
    });
}