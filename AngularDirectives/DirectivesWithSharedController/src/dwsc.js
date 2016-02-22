var module = angular.module('cardsWithSharedController', []);

module.directive('dscCardList', function() {
    var linker = function (scope, element, attrs) {
        // Pending
    };

    var controller = function ($scope) {
        $scope.cards = [{id:1, title:'Wash Car', details:'Wash the exterior of the car'}, {id: 2, title: 'Water Grass', details: 'Water all the grass'}];
        $scope.selectedCardIndex = -1;
        this.selectCard = function(id) { alert('select card from card list controller. id = '+id); }
    };

    return {
        restrict: 'E',
        controller: controller,
        link: linker,
        transclude: true,
        template: '<div class="cardList">HI</div>'
    };
});

module.directive('dscCard', function() {

    var linker = function (scope, element, attrs, cardListController) {
        scope.showDetails = false;
        scope.toggleDetails = function() { scope.showDetails = !scope.showDetails };
        scope.select = function() {
            alert('select in card');
            cardListController.selectCard(scope.card.id);
        };
    };

    var controller = function ($scope) {
    };

    return {
        restrict: 'E',
        controller: controller,
        require: '^^dscCardList',
        link: linker,
        template: '<div class="card"><div class="title">{{card.title}}</div><button ng-click="toggleDetails()">Details</button><button ng-click="select()">Select</button><div class="details" ng-show="showDetails">{{card.details}}</div></div>'
    };
});