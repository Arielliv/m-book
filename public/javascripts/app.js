/**
 * Created by Ariel on 06/11/2015.
 */

    'use strict';
var app = angular.module('app', [ 'ui.bootstrap' ,'restangular']);
    app.controller('nav', function($scope, $uibModal, $filter, Restangular) {
        $scope.search = false;
        $scope.addCard = function(){
            $uibModal.open({
                templateUrl: 'addCardView.html',
                controller: 'addCardController'
            });
        };
    });

app.directive('ngMonitorCard',['$uibModal',function($uibModal) {
    return {
        link: function(scope, element, attr) {
            element.bind('click',function(){
                $uibModal.open({
                    templateUrl: 'cardView.html',
                    controller: 'monitorController'
                });
            });
        },
        scope:{
            monitorCard: '='
        }
    };
}]);








