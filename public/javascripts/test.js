var appT = angular.module('appT', []);

    'use strict';

    appT.controller('ObjectArrayCtrl', ['$scope', 'filterFilter', function ObjectArrayCtrl($scope, filterFilter) {
        // fruits
        $scope.fruits = [
            { name: 'apple',    selected: true , id : 1, version:0},
            { name: 'orange',   selected: false, id : 2, version:0},
            { name: 'pear',     selected: true, id : 3, version:0},
            { name: 'naartjie', selected: false, id: 4,version :0}
        ];

        // selected fruits
        $scope.selection = [];

        // helper method
        $scope.selectedFruits = function selectedFruits() {
            return filterFilter($scope.fruits, { selected: true });
        };

        // watch fruits for changes
        $scope.$watch('fruits|filter:{selected:true}', function (nv) {
            $scope.selection = nv.map(function (fruit) {
                return fruit;
            });
        }, true);
    }]);

    /**
     * custom filter
     */
    appT.filter('fruitSelection', ['filterFilter', function (filterFilter) {
        return function fruitSelection(input, prop) {
            return filterFilter(input, { selected: true }).map(function (fruit) {
                return fruit[prop];
            });
        };
    }]);
