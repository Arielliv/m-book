'use strict';

var app = angular.module('app', [ 'ui.bootstrap' ,'restangular','ngSanitize','ui.router', 'ngAside' ]);

    /*service for the cards, scripts and files*/
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
            status: '2',
            views: 0},
            {dateHeader: "04-12-2015",
                id: 0,
                img: "images/windows.jpg",
                monitorExplain: "s",
                monitorLevel: "מתקדם",
                monitorName: "asssa",
                monitorProdact: "windows",
                monitorSystem: "מערכת4",
                monitorType: "service/process",
                status: '3',
                views: 0},
            {dateHeader: "04-12-2015",
                id: 0,
                img: "images/windows.jpg",
                monitorExplain: "s",
                monitorLevel: "בסיסי",
                monitorName: "azsa",
                monitorProdact: "windows",
                monitorSystem: "מערכת4",
                monitorType: "service/process",
                status: '3',
                views: 0},
            {dateHeader: "04-12-2015",
                id: 0,
                img: "images/windows.jpg",
                monitorExplain: "s",
                monitorLevel: "בסיסי",
                monitorName: "ariel",
                monitorProdact: "windows",
                monitorSystem: "מערכת4",
                monitorType: "service/process",
                status: '1',
                views: 0}];
        var Downloads = [];
        var Scripts = [];
        var types = ['winlog','log','service/process','schedule task','...'];
        var prodacts = ['oracleDB','mongoDB','windows','linux','netapp','vmware','hp','IBM-MainFrame','not exist here'];
        var systems = ['מערכת1','מערכת2','מערכת3','מערכת4','מערכת5','מערכת6','לא קיים כאן'];
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
            updateStatusCard: function(monitorName){
                if(($filter('filter')(Cards, { monitorName: monitorName})[0]).status < 3) {
                    ($filter('filter')(Cards, {monitorName: monitorName})[0]).status++;
                }
                return Cards;
            },
            delCard: function(card){
                var index = Cards.indexOf(card);
                Cards.splice(index, 1);
                return Cards;
            },
            upadteCard: function(card){
                ($filter('filter')(Cards, {id: card.id})[0]).monitorName = card.monitorName;
                ($filter('filter')(Cards, {id: card.id})[0]).monitorType = card.monitorType;
                ($filter('filter')(Cards, {id: card.id})[0]).monitorLevel = card.monitorLevel;
                ($filter('filter')(Cards, {id: card.id})[0]).monitorProdact = card.monitorProdact;
                ($filter('filter')(Cards, {id: card.id})[0]).monitorSystem = card.monitorSystem;
                ($filter('filter')(Cards, {id: card.id})[0]).monitorExplain = card.monitorExplain;
                return Cards;
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
            delDownload: function(Download){
                var index = Downloads.indexOf(Download);
                Downloads.splice(index, 1);
                return Downloads;
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
            },
            delScript: function(Script){
                var index = Scripts.indexOf(Script);
                Scripts.splice(index, 1);
                return Scripts;
            },
            getTypes: function(){
                return types;
            },
            addType: function(type){
                types.push(type);
                return types;
            },
            getProdacts: function(){
                return prodacts;
            },
            addProdact: function(prodact){
                prodacts.push(prodact);
                return prodacts;
            },
            getSystems: function(){
                return systems;
            },
            addSystem : function(system){
                systems.push(system);
                return systems;
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
/*have never been tested, suppase to be the filter for the monitors
    app.filter('cardFilter', ['$filter', function($filter) {
        return function(selectedCard, status, monitorLevel,monitorSystem) {
            var selectedCard2 = null;
            if (selectedCard.status == status) {
                if(selectedCard.status == '2'){
                    selectedCard2 = selectedCard;
                }
                if (selectedCard.status == '3') {
                    if(selectedCard.monitorLevel.include(monitorLevel)){
                        selectedCard2 = selectedCard;
                        if(selectedCard.monitorSystem.include(monitorSystem)){
                            selectedCard2 = selectedCard;
                        }
                    }
                }
            }
            return selectedCard2;
        };
    }]);
 */
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


    app.controller('mainCtrl', function($scope, $uibModal, $filter, $state ,$aside ,ServiceArray ,$window ,Restangular,$sce) {
        /*arrays of input*/
        $scope.downloadsData = ServiceArray.getDownloads();
        $scope.scriptsData = ServiceArray.getScripts();
        $scope.Cards = ServiceArray.getCards();
        $scope.types = ServiceArray.getTypes();
        $scope.prodacts = ServiceArray.getProdacts();
        $scope.systems = ServiceArray.getSystems();

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
        $scope.searchIt = function(Value){
            $scope.Value = Value;
            $scope.filterValueStatus = '';
            $scope.filterValueLevel = '';
            $scope.filterValue='';
        };


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
                    if (newCard.monitorProdact == "not exist here" || $scope.prodacts.indexOf(newCard.monitorProdact)) {
                        newCard.monitorProdact = "default";
                        newCard.img = "images/background4.jpg"
                    } else {
                        newCard.img = "images/" + newCard.monitorProdact + ".jpg";
                    }
                    newCard.monitorExplain = $scope.limitCharPerLine(newCard.monitorExplain);
                    newCard.dateHeader = $filter('date')(new Date(), 'dd-MM-yyyy');
                    newCard.id = $scope.count;
                    newCard.status = 3;
                    $scope.count ++;
                    $scope.Cards= ServiceArray.addCard(newCard);
                    //$scope.Cards.push(newCard);
                });
            } else if( $scope.$state.includes('scripts')){
                var modalInstance2 = $uibModal.open({
                    templateUrl: 'scripts/uploadScripts.html',
                    controller: 'uploadScriptsController'
                });

                modalInstance2.result.then(function (data) {
                    data.id = $scope.scriptsData.length +1;
                    $scope.scriptsData =ServiceArray.addScripts(data);
                    //$scope.scriptsData.push(data);
                });
            } else if( $scope.$state.includes('downloads')){
                var modalInstance3 = $uibModal.open({
                    templateUrl: 'files/uploadDownloads.html',
                    controller: 'uploadDownloadsController'
                });

                modalInstance3.result.then(function (data) {
                    data.id = $scope.downloadsData.length +1;
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
        /*admin stuff*/
        /*admin monitor card view*/
        $scope.openCardAdmin = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: 'administrator/cardViewAdmin.html',
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
                $scope.Cards = ServiceArray.getCards();
            });
        };
        $scope.openFileAdmin = function(selected){
            var modalInstance = $uibModal.open({
                templateUrl: 'administrator/fileViewAdmin.html',
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
                templateUrl: 'administrator/scriptViewAdmin.html',
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
                templateUrl: 'administrator/updateMonitor.html',
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
        /*del monitor*/
        $scope.delMonitor = function(selected){
            $scope.Cards = ServiceArray.delCard(selected);
        };
        /*del download*/
        $scope.delDownload = function(selectedCard){
            $scope.downloadsData = ServiceArray.delDownload(selectedCard);
        };
        /*del script*/
        $scope.delScript = function(selectedCard){
            $scope.scriptsData = ServiceArray.delScript(selectedCard);
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











