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
        $scope.search = false;
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











