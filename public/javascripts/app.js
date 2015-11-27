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

    /*the config , set the states for the ng-rout-ui*/
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
            /*
            .state('scriptsView', {
                url: "/scriptView",
                templateUrl: "scriptView.html"
            })
            .state('uploadScripts', {
                url: "/uploadScripts",
                templateUrl: "uploadScripts.html"
            })
            .state('DownloadsView', {
                url: "/DownloadsView",
                templateUrl: "DownloadsView.html"
            })
            .state('uploadDownloads', {
                url: "/uploadDownloads",
                templateUrl: "uploadDownloads.html"
            })*/

    });

    app.controller('mainCtrl', function($scope, $uibModal, $filter, $state ,$aside, Restangular,$sce) {
        /*arrays of input*/
        $scope.downloadsData = [];
        $scope.scriptsData = [];
        $scope.Cards = [];


        $scope.test=function(){
            console.log($scope.property);
            console.log($scope.filterValue);
            return "monitorName";
        };
        $scope.test2=function(){
            return $scope.propertyor === $scope.filterValue;
        };
        /*order cards*/
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.Cards = orderBy($scope.Cards, predicate, reverse);

        };
        $scope.order('-name',false);

        /*variables*/
        $scope.$state = $state;
        $scope.search = false;

        /*open side nav bar, its a modal-ui*/
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

        /*limit the chars in line, and drop down*/
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

        /*open random card*/
        $scope.openRandom = function(){
            if($scope.Cards.length >0){
                var random = Math.floor(Math.random() * $scope.Cards.length)/*you can add (+ num) to set start point to random*/;
                $scope.openCard($scope.Cards[random]);
            }
        };

        /*add new card/script/file, opens modal*/
        $scope.addCard = function(){
            if( $scope.$state.includes('monitors')) {
                var modalInstance1 = $uibModal.open({
                    templateUrl: 'addCardView.html',
                    controller: 'addCardController'
                });

                modalInstance1.result.then(function (newCard) {
                    if (newCard.monitorProdact == "not exist here") {
                        newCard.monitorProdact = "default";
                        newCard.img = "images/background4.jpg"
                    } else {
                        newCard.img = "images/" + newCard.monitorProdact + ".jpg";
                    }
                    newCard.monitorExplain = $scope.limitCharPerLine(newCard.monitorExplain);
                    newCard.dateHeader = $filter('date')(new Date(), 'dd-MM-yyyy');
                    $scope.Cards.push(newCard);
                });
            } else if( $scope.$state.includes('scripts')){
                var modalInstance2 = $uibModal.open({
                    templateUrl: 'uploadScripts.html',
                    controller: 'uploadScriptsController'
                });

                modalInstance2.result.then(function (data) {
                    $scope.scriptsData.push(data);
                });
            } else if( $scope.$state.includes('downloads')){
                var modalInstance3 = $uibModal.open({
                    templateUrl: 'uploadDownloads.html',
                    controller: 'uploadDownloadsController'
                });

                modalInstance3.result.then(function (data) {
                    $scope.downloadsData.push(data);
                });
            } else {
                console.log("problem");
            }
        };

        /*open card view, its a modal*/
        $scope.openCard = function(selectedCard){
            selectedCard.views ++;
            var modalInstance = $uibModal.open({
                templateUrl: 'cardView.html',
                controller: 'monitorViewController',
                resolve: {
                    selectedCard: function () {
                        return selectedCard;
                    }
                }

            });
        };

        /*open scripts view to download, its a modal*/
        $scope.openCardScript = function(script){
            var modalInstance = $uibModal.open({
                templateUrl: 'scriptView.html',
                controller: 'scriptViewController',
                resolve: {
                    script: function () {
                        return script;
                    }
                }

            });
        };

        /*open file view to download, its a modal*/
        $scope.openCardDownload = function(download){
            var modalInstance = $uibModal.open({
                templateUrl: 'DownloadView.html',
                controller: 'DownloadViewController',
                resolve: {
                    download: function () {
                        return download;
                    }
                }

            });
        };

    });











