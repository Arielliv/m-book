/**
 * Created by Ariel on 06/11/2015.
 */

    'use strict';
var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize']);
    app.controller('nav', function($scope, $uibModal, $filter, Restangular,$sce) {
        app.filter('to_trusted', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);
        $scope.Cards = [];
        $scope.counterAddCards = 0;
        $scope.search = false;
        $scope.addToViewCard= function(){
            $scope.htmlTest = '<div class="panel col-lg-1">' +
                '<lable class="card col-lg-12 col-lg-offset-1">{{selectedCard.monitorName}}</lable>' +
                '<img src="images/oracleDB.jpg">'+
                '</div>';

            for(var i = 1;i < $scope.Cards.length; i++){
                $scope.htmlTest = $scope.htmlTest + '<div class="panel col-lg-1">' +
                    '<lable class="card col-lg-12 col-lg-offset-1">'+'{{' + selectedCard.monitorName +'}}'+'</lable>' +
                    '<img src="images/oracleDB.jpg">'+
                    '</div>';
            }
        };
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
        $scope.openCard = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'cardView.html',
                controller: 'monitorController'
            });
        };
    });
/*app.directive('ngCreateMonitorCard',function(){
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

            });
        }
    };
}]);*/








