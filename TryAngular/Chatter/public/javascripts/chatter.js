function ChatterCtrl($scope, $timeout) {
    $scope.chatter = {name:'Fred', ctr: 0};

    $scope.$watch('chatter.ctr', function(){
        $timeout(function(){
            $scope.chatter.ctr++;
        },1000);
    });
}
