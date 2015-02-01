angular.module('nwc', [])

    .directive('tabarea', [function() {
        return {
            restrict: 'A',
            replace: false,
            controller: function($scope) {
                var selected = null;

                this.selected = function() { return selected; };
                this.isSelected = function(id) { return selected === id; };
                this.select = function(id) { selected = id; };
            }
        };
    }])

    .directive('tab', [function() {
        return {
            template: '<div class="tab" ng-click="select(id)">{{label}}<span ng-show="isSelected()">Selected</span></div>',
            restrict: 'E',
            replace: true,
            scope: {
                id: '@',
                label: '@'
            },
            require: '^tabarea',
            link: function($scope, $element, $attrs, tabareaCtrl) {
                $scope.select = function(id) {
                    console.log('selected id = '+id);
                    tabareaCtrl.select(id);
                };

                $scope.isSelected = function() { return tabareaCtrl.isSelected($scope.id); };
            }
        }
    }]);



