/**
 * Created by Ariel on 06/11/2015.
 */

    'use strict';
var app = angular.module('app', [ 'ui.bootstrap' ,'restangular']);
    app.controller('nav', function($scope, $uibModal, $filter, Restangular) {
        $scope.Cards = [];
        $scope.counterAddCards = 0;
        console.log($scope.counterAddCards);
        $scope.search = false;
        $scope.addCard = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'addCardView.html',
                controller: 'addCardController'
            });
            modalInstance.result.then(function(newCard) {
                $scope.counterAddCards ++;
                newCard.$index = $scope.counterAddCards;
                $scope.Cards.push(newCard);
                console.log($scope.counterAddCards);
            });
        };
    });
app.directive('ngCreateMonitorCard',function(){
    return{
        restrict: 'E',
        template:function($scope, elemnt, attr) {
            var img = "images/oracleDB.jpg";
            var htmlTest = '';
            $scope.counterAddCards = 0;
            var y = $scope.counterAddCards;
            console.log($scope.counterAddCards);
            for(var i = 0;i < y; i++){
                console.log($scope.counterAddCards);
                htmlTest += '<ng-monitor-card class="panel col-lg-1">' +
                    '<lable class="card col-lg-12 col-lg-offset-1">{{newCard.monitorName}}</lable>' +
                    '<img  src=' + img + '>' + '</ng-monitor-card>';
            }
            return htmlTest;
        }

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
                        Cards: function(){
                            return $scope.Cards;
                        },
                        Length: function(){
                            return $scope.Cards.length;
                        }
                    }
                });
            });
        }
    };
}]);








