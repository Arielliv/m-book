/**
 * Created by Ariel on 23/11/2015.
 */
app.controller('scriptViewController',function($scope,$modalInstance,script){
    $scope.script= script;
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});