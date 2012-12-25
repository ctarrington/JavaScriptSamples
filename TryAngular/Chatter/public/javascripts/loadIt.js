function LoadItCtrl($scope, $timeout) {

    $scope.things = [{name:'argh'}];
    $scope.rows = 0;


    $scope.addRows = function() {
        for (var ctr=0; ctr<$scope.rows; ctr++)
        {
            $scope.things.push({name: 'thing'+ctr});
        }
    };
}