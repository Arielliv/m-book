'use strict';

var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize','ui.router', 'ngAside' ]);


    app.factory('ServiceArray',function($filter){
        var Cards = [{dateHeader: "04-12-2015",
            id: 0,
            img: "images/windows.jpg",
            monitorExplain: "s",
            monitorLevel: "מתקדם",
            monitorName: "scscscscscscscs",
            monitorProdact: "windows",
            monitorSystem: "מערכת4",
            monitorType: "service/process",
            pass: true,
            views: 0}];
        var Downloads = [];
        var Scripts = [];
        return{
            getCards : function(){
                return Cards;
            },
            addCard: function(card){
                Cards.push(card);
                return Cards;
            },
            getCard: function(monitorName){
                return $filter('filter')(Cards, { monitorName: monitorName})[0];
            },
            getDownloads: function(){
                return Downloads;
            },
            addDownload: function(Download){
                Downloads.push(Download);
                return Downloads;
            },
            getDownload: function(downloadName){
                return $filter('filter')(Downloads, { fileName: downloadName})[0];
            },
            getScripts: function(){
                return Scripts;
            },
            addScripts: function(Script){
                Scripts.push(Script);
                return Scripts;
            },
            getScript: function(scriptName){
                return $filter('filter')(Scripts, { scriptName: scriptName})[0];
            }

        }
    });

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

    /*get and shows the file name*/
    app.directive('fdInput', function($timeout){
        return {
            scope: {
                fileNames: '='
            },
            link:function(scope, element, attrs) {
                $timeout(element.on('change', function(evt) {
                    var files = evt.target.files;
                    console.log(files[0].name);
                    console.log(files[0].size);

                    scope.fileNames = files[0].name;
                    scope.$apply();
                }),0);
            }
        }
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
                url: "/monitors/monitors",
                templateUrl: "monitors/monitors.html"
            })
            .state('downloads', {
                url: "/files/downloads",
                templateUrl: "files/downloads.html"
            })
            .state('scripts', {
                url: "/scripts/scripts",
                templateUrl: "scripts/scripts.html"
            })
            .state('administrator', {
                url: "/administrator/administratorView",
                templateUrl: "administrator/administratorView.html"
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


    app.controller('mainCtrl', function($scope, $uibModal, $filter, $state ,$aside ,ServiceArray ,Restangular,$sce) {
        /*arrays of input*/
        $scope.downloadsData = ServiceArray.getDownloads();
        $scope.scriptsData = ServiceArray.getScripts();
        $scope.Cards = ServiceArray.getCards();

        /*order cards*/
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.Cards = orderBy($scope.Cards, predicate, reverse);

        };
        $scope.order('-name',false);

        /*variables*/
        $scope.$state = $state;
        $scope.search = false;
        $scope.count = 0;

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
                    templateUrl: 'monitors/addCardView.html',
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
                    newCard.id = $scope.count;
                    newCard.pass = true;
                    $scope.count ++;
                    console.log(newCard);
                    $scope.Cards= ServiceArray.addCard(newCard);
                    //$scope.Cards.push(newCard);
                });
            } else if( $scope.$state.includes('scripts')){
                var modalInstance2 = $uibModal.open({
                    templateUrl: 'scripts/uploadScripts.html',
                    controller: 'uploadScriptsController'
                });

                modalInstance2.result.then(function (data) {
                    $scope.scriptsData =ServiceArray.addScripts(data);
                    //$scope.scriptsData.push(data);
                });
            } else if( $scope.$state.includes('downloads')){
                var modalInstance3 = $uibModal.open({
                    templateUrl: 'files/uploadDownloads.html',
                    controller: 'uploadDownloadsController'
                });

                modalInstance3.result.then(function (data) {
                    console.log(data);
                    $scope.downloadsData = ServiceArray.addDownload(data);
                    //$scope.downloadsData.push(data);
                });
            } else {
                console.log("problem");
            }
        };

        /*open card view, its a modal*/
        $scope.openCard = function(selectedCard){
            selectedCard.views ++;
            var modalInstance = $uibModal.open({
                templateUrl: 'monitors/cardView.html',
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
                templateUrl: 'scripts/scriptView.html',
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
                templateUrl: 'files/DownloadView.html',
                controller: 'DownloadViewController',
                resolve: {
                    download: function () {
                        return download;
                    }
                }

            });
        };

        $scope.openCardAdmin = function(selectedCard){
            var modalInstance = $uibModal.open({
                templateUrl: 'administrator/cardViewAdmin.html',
                controller: 'adminController',
                resolve: {
                    selectedCard: function () {
                        return selectedCard;
                    }
                }

            });
        };

    });











