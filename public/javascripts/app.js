/**
 * Created by Ariel on 06/11/2015.
 */

    'use strict';
var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize']);
    app.filter('strLimit', ['$filter', function($filter) {
        return function(input, limit) {
            if (! input) return;
            if (input.length <= limit) {
                return input;
            }

            return $filter('limitTo')(input, limit) + '...';
        };
    }]);
    app.controller('nav', function($scope, $uibModal, $filter, Restangular,$sce) {
        app.filter('to_trusted', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);
        $scope.Cards = [];
        $scope.search = false;
        $scope.limitCharPerLine = function(monitorExplain){
            var count = 0;
            var string = '';
            for(var i = 0; i <monitorExplain.length;i++){
                if(count === 70){
                    string = string + monitorExplain.substr(0,count) + "\n";
                    count = 0;
                } else {
                    count++;
                }
            }
            return string;
        };
        $scope.openRandom = function(){
            var random = Math.floor(Math.random() * $scope.Cards.length) + 0;
            $scope.openCard($scope.Cards[random]);
        };
        $scope.addCard = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'addCardView.html',
                controller: 'addCardController'
            });
            modalInstance.result.then(function(newCard) {
                if(newCard.monitorProdact == "not exist here"){
                    newCard.monitorProdact = "default";
                    newCard.img = "images/background4.jpg"
                } else {
                    newCard.img ="images/" + newCard.monitorProdact + ".jpg";
                }
                newCard.monitorExplain = $scope.limitCharPerLine(newCard.monitorExplain);
                $scope.Cards.push(newCard);
            });
        };
        $scope.openCard = function(selectedCard){
            var modalInstance = $uibModal.open({
                templateUrl: 'cardView.html',
                controller: 'monitorController',
                resolve: {
                    selectedCard: function () {
                        return selectedCard;
                    }
                }

            });
        };
    });











