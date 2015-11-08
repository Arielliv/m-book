/**
 * Created by Ariel on 06/11/2015.
 */

    'use strict';
var app = angular.module('app', [ 'ui.bootstrap' ,'restangular']);
    app.controller('nav', function($scope, $uibModal, $filter, Restangular) {
        $scope.search = false;
        $scope.addCard = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'addCardView.html',
                controller: 'addCardController'
            });
            modalInstance.result.then(function(newCard) {
                $scope.newCard = newCard;
                console.log($scope.newCard);
            });
        };
    });

app.directive('ngMonitorCard',['$uibModal',function($uibModal) {
    return {
        link: function($scope, element, attr) {
            element.bind('click',function(){
                var modalInstance = $uibModal.open({
                    templateUrl: 'cardView.html',
                    controller: 'monitorController',
                    resolve:{
                        newCard: function(){
                            return $scope.newCard;
                        }
                    }
                });
            });
        }
    };
}]);








