'use strict';

var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize','ui.router', 'ngAside' ,'ngAnimate']);
    /*set the img for the monitor*/
    app.directive('myBackgroundImage', function () {
        return function (scope, element, attrs) {
            element.css({
                'background-image': 'url(' + attrs.myBackgroundImage + ')',
                'background-size': 'auto 90%',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            });
        };
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
                templateUrl: "/public/monitors/monitors.html"
            })
            .state('downloads', {
                url: "/files/downloads",
                templateUrl: "/public/files/downloads.html"
            })
            .state('scripts', {
                url: "/scripts/scripts",
                templateUrl: "/public/scripts/scripts.html"
            })
            .state('administrator', {
                url: "/administrator/administratorView",
                templateUrl: "/public/administrator/administratorView.html"
            })
            .state('test', {
                url: "/view/test",
                templateUrl: "/public/view/test.html"
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


    app.controller('mainCtrl', function($scope, $uibModal, $filter, $state ,$aside ,ServiceArray ,restAngularService,$window,Restangular ) {

        /*arrays of input*/
        ServiceArray.getDownloads().then(function(files){
            $scope.downloadsData = files;
        });
        ServiceArray.getScripts().then(function(scripts){
            $scope.scriptsData = scripts;
        });
        $scope.Cards = null;
        $scope.$watch('Cards', function(newValue, oldValue) {
            ServiceArray.getCards().then(function(cards) {
                $scope.Cards = cards;
            });
        });
        ServiceArray.getTypes().then(function(types){
            $scope.types = types;
        });
        ServiceArray.getProdacts().then(function(prodacts){
            $scope.prodacts = prodacts;
        });
        ServiceArray.getSystems().then(function(systems){
            $scope.systems = systems;
        });
        /*order cards*/
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.Cards = orderBy($scope.Cards, predicate, reverse);

        };
        $scope.order('-name',false);

        /*variables*/
        /*page*/
        $scope.$state = $state;
        /*level of monitor for filter and etc*/
        $scope.filterValueLevel = 'start';
        /*status of monitor for filter*/
        $scope.filterValueStatus = '1';
        /*system filter filter*/
        $scope.filterValue= '';
        /*status filter for admin*/
        $scope.adminFilter = '1';
        /*search filter*/
        $scope.Value = '';
        /*search var*/
        $scope.search = false;
        /*count the cards for id*/
        $scope.count = 0;


        /*change status for the filter*/
        $scope.changeFilterValue = function(value , status){
            $scope.filterValueLevel = value;
            if(status == '2'){
                $scope.filterValueStatus = '2';
            }   else {
                $scope.filterValueStatus = '3';
            }
        };

        /*change admin filter, between statuses*/
        $scope.adminFilterChange = function(){
            if($scope.adminFilter != '3'){
                $scope.adminFilter ++;
            } else {
                $scope.adminFilter = '1';
            }
        };

        /*search in all monitor with status 3*/
        $scope.setUpFilter = function(){
            $scope.ValueSearch = '';
        };
        $scope.searchIt = function(Value){
            $scope.ValueSearch = Value;
            $scope.filterValueStatus = '';
            $scope.filterValueLevel = '';
            $scope.filterValue='';
        };


        /*open side nav bar, its a modal-ui*/
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: '/public/view/aside.html',
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
                if(($filter('filter')($scope.Cards, { id: $scope.Cards[random].id})[0]).status == 3) {
                    $scope.openCard($scope.Cards[random]);
                } else {
                    $scope.openRandom();
                }
            }
        };

        /*add new card/script/file, opens modal*/
        $scope.addCard = function(){
            if( $scope.$state.includes('monitors')) {
                var modalInstance1 = $uibModal.open({
                    templateUrl: '/public/monitors/addCardView.html',
                    controller: 'addCardController',
                    resolve: {
                        types: function () {
                            return $scope.types;
                        },
                        prodacts: function () {
                            return $scope.prodacts;
                        },
                        systems: function () {
                            return $scope.systems;
                        }
                    }
                });

                modalInstance1.result.then(function (newCard) {
                    if (newCard.monitorProdact == "not exist here") {
                        newCard.monitorProdact = "default";
                        newCard.img = "images/background4.jpg"
                    } else {
                        newCard.img = "/public/images/" + newCard.monitorProdact + ".jpg";
                    }
                    newCard.monitorExplain = $scope.limitCharPerLine(newCard.monitorExplain);
                    newCard.dateHeader = $filter('date')(new Date(), 'dd-MM-yyyy');
                    newCard.id = $scope.count;
                    newCard.status = 1;
                    $scope.count ++;
                    ServiceArray.addCard(newCard).then(function(cards){
                        $scope.Cards = cards;
                    });
                    //$scope.Cards.push(newCard);
                });
            } else if( $scope.$state.includes('scripts')){
                var modalInstance2 = $uibModal.open({
                    templateUrl: '/public/scripts/uploadScripts.html',
                    controller: 'uploadScriptsController'
                });

                modalInstance2.result.then(function (data) {
                    data.id = $scope.scriptsData.length +1;
                    ServiceArray.addScripts(data).then(function(scripts){
                        $scope.scriptsData = scripts;
                    });
                    //$scope.scriptsData.push(data);
                });
            } else if( $scope.$state.includes('downloads')){
                var modalInstance3 = $uibModal.open({
                    templateUrl: '/public/files/uploadDownloads.html',
                    controller: 'uploadDownloadsController'
                });

                modalInstance3.result.then(function (data) {
                    data.id = $scope.downloadsData.length +1;
                    ServiceArray.addDownload(data).then(function(files){
                        $scope.downloadsData = files;
                    });
                    //$scope.downloadsData.push(data);
                });
            } else {
                console.log("problem");
            }
        };

        /*open card view, its a modal*/
        $scope.openCard = function(selectedCard){
            ServiceArray.updateViewCard(selectedCard).then(function(cards){
                $scope.Cards = cards;
            });
            var modalInstance = $uibModal.open({
                templateUrl: '/public/monitors/cardView.html',
                controller: 'monitorViewController',
                resolve: {
                    selectedCard: function () {
                        return selectedCard;
                    }
                }

            });
            modalInstance.result.then(function () {
                ($filter('filter')($scope.Cards, {id: selectedCard.id})[0]).views++;
            });
        };

        /*open scripts view to download, its a modal*/
        $scope.openCardScript = function(script){
            var modalInstance = $uibModal.open({
                templateUrl: '/public/scripts/scriptView.html',
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
                templateUrl: '/public/files/DownloadView.html',
                controller: 'DownloadViewController',
                resolve: {
                    download: function () {
                        return download;
                    }
                }

            });
        };
        /*admin stuff*/
        /*admin monitor card view*/
        $scope.openCardAdmin = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: '/public/administrator/cardViewAdmin.html',
                controller: 'adminController',
                resolve: {
                    selected: function () {
                        return selected;
                    },
                    types: function () {
                        return $scope.types;
                    },
                    prodacts: function () {
                        return $scope.prodacts;
                    },
                    systems: function () {
                        return $scope.systems;
                    }
                }

            });
            modalInstance.result.then(function () {
                ($filter('filter')($scope.Cards, {id: selected.id})[0]).status++;
            });
        };
        $scope.openFileAdmin = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: '/public/administrator/fileViewAdmin.html',
                controller: 'adminController',
                resolve: {
                    selected: function () {
                        return selected;
                    },
                    types: function () {
                        return $scope.types;
                    },
                    prodacts: function () {
                        return $scope.prodacts;
                    },
                    systems: function () {
                        return $scope.systems;
                    }
                }

            });
            modalInstance.result.then(function () {
                $scope.downloadsData = ServiceArray.getDownloads();
            });
        };
        $scope.openScriptAdmin = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: '/public/administrator/scriptViewAdmin.html',
                controller: 'adminController',
                resolve: {
                    selected: function () {
                        return selected;
                    },
                    types: function () {
                        return $scope.types;
                    },
                    prodacts: function () {
                        return $scope.prodacts;
                    },
                    systems: function () {
                        return $scope.systems;
                    }
                }

            });
            modalInstance.result.then(function () {
                $scope.scriptsData = ServiceArray.getScripts();
            });
        };
        $scope.openUpdateMonitor = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: '/public/administrator/updateMonitor.html',
                controller: 'adminController',
                resolve: {
                    selected: function () {
                        return selected;
                    },
                    types: function () {
                        return $scope.types;
                    },
                    prodacts: function () {
                        return $scope.prodacts;
                    },
                    systems: function () {
                        return $scope.systems;
                    }
                }

            });
            modalInstance.result.then(function () {
                if(($filter('filter')(Cards, { id: selected.id})[0]).status < 3) {
                    ($filter('filter')(Cards, {id: selected.id})[0]).status++;
                }
            });
        };
        /*opendelete*/
        $scope.openDelMonitor = function(selected) {
            var modalInstance = $uibModal.open({
                templateUrl: 'deleteMonitor.html',
                controller: 'deleteController',
                resolve: {
                    selected: function () {
                        return selected;
                    }
                }
            });
            modalInstance.result.then(function(x) {
                var index = $scope.Cards.indexOf(selected);
                $scope.Cards.splice(index, 1);
            });
        };
        /*opendelete*/
        $scope.openDelFile = function(selected) {
            var modalInstance = $uibModal.open({
                templateUrl: 'deleteFile.html',
                controller: 'deleteController',
                resolve: {
                    selected: function () {
                        return selected;
                    }
                }
            });
            modalInstance.result.then(function(x) {
                var index = $scope.downloadsData.indexOf(selected);
                $scope.downloadsData.splice(index, 1);
            });
        };
        /*opendelete*/
        $scope.openDelScript = function(selected) {
            var modalInstance = $uibModal.open({
                templateUrl: 'deleteScript.html',
                controller: 'deleteController',
                resolve: {
                    selected: function () {
                        return selected;
                    }
                }
            });
            modalInstance.result.then(function(x) {
                var index = $scope.scriptsData.indexOf(selected);
                $scope.scriptsData.splice(index, 1);
            });
        };



        $scope.addType = function(newType){
            $scope.types = ServiceArray.addType(newType);
        };
        $scope.addSystem = function(newSystem){
            $scope.systems = ServiceArray.addSystem(newSystem);
        };
        $scope.addProdact = function(newProdact){
            $scope.prodacts = ServiceArray.addProdact(newProdact);
        };
    });











