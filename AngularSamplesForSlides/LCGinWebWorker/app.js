
var app = angular.module('lcg', []);

app.service('lcg', ['$q', function ($q) {
  
  function doCreateLCG(seed, size)
  {
    var deferred = $q.defer();
    
    var myWorker = new Worker("lcgWebWorker.js");

    myWorker.onmessage = function (evt) {
      console.log("Called back by the worker:\n"+evt);
      deferred.resolve(evt.data);
    };

    myWorker.postMessage( {seed: seed, size: size } );
    
    return deferred.promise;
  }

  return { createLCG: doCreateLCG };
}]);

app.controller('MainCtrl', ['$scope', 'lcg', function($scope, lcg) {
  $scope.model = {
    seed: 76120733,
    size: 50000000,
    min: 0,
    max: 0,
    average:0,
    raw: ''
  };
  
  
  $scope.go = function() {
    $scope.model.min = 0;
    $scope.model.max = 0;
    $scope.model.average = 0;
    
    
    var promise = lcg.createLCG($scope.model.seed, $scope.model.size);
    promise.then(function(data) {
      $scope.model.min = data.min;
      $scope.model.max = data.max;
      $scope.model.average = data.average;
    });
    
  };
 
  
  
}]);
