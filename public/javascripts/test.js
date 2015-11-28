 var app = angular.module('appt', []);
        app.controller('AppController', AppController);
        app.directive('fdInput', function(){
            return {
                scope: {
                    fileNames: '='
                },
                link: function(scope, element, attrs) {
                    element.on('change', function(evt) {
                        var files = evt.target.files;
                        console.log(files[0].name);
                        console.log(files[0].size);

                        scope.fileNames = files[0].name;
                        scope.$apply();
                    });
                }
            }
        });

    function AppController($scope) {
        $scope.fileName = '';
    }
