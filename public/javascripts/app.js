'use strict';

var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize','ui.router', 'ngAside' ]);
    /*make limit to characters in line' and add ...*/
    app.filter('strLimit', ['$filter', function($filter) {
        return function(input, limit) {
            if (! input) return;
            if (input.length <= limit) {
                return input;
            }
            return $filter('limitTo')('...' + input, limit);
        };
    }]);
    /*make angular as trustfull for dom(html)*/
    app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    /*make comments*/
    app.directive('toggle', function($timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                $timeout(function(){
                    if (attrs.toggle=="tooltip"){
                        $(element).tooltip();
                    }
                },0);
            }
        };
    });
    app.config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/monitors.html");
        //
        // Now set up the states
        $stateProvider
            .state('monitors', {
                url: "/monitors",
                templateUrl: "monitors.html"
            })
            .state('downloads', {
                url: "/downloads",
                templateUrl: "downloads.html"
            })
            .state('scripts', {
                url: "/scripts",
                templateUrl: "scripts.html"
            })

    });

    app.controller('nav', function($scope, $uibModal, $filter, $state ,$aside, Restangular,$sce) {
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: 'aside.html',
                placement: position,
                backdrop: true,
                size: 'sm',
                controller: function($scope, $modalInstance) {
                    $scope.ok = function(e) {
                        $modalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e) {
                        $modalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            })
        };
        $scope.$state = $state;
        $scope.Cards = [];
        $scope.search = false;
        $scope.limitCharPerLine = function(monitorExplain){
            var count = 0;
            var string = monitorExplain;
            for(var i = 0; i <monitorExplain.length;i++){
                if(count === 50){
                    string = string + monitorExplain.substr(0,count) + "\n";
                    count = 0;
                } else {
                    count++;
                }
            }
            return string;
        };
        $scope.openRandom = function(){
            var random = Math.floor(Math.random() * $scope.Cards.length)/*you can add (+ num) to set start point to random*/;
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
                newCard.dateHeader = $filter('date')(new Date(),'dd-MM-yyyy');
                $scope.Cards.push(newCard);
            });
        };
        $scope.openCard = function(selectedCard){
            selectedCard.views ++;
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











