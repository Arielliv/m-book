/**
 * Created by Ariel on 23/11/2015.
 */
app.controller('DownloadViewController',function($scope,$modalInstance,download,restAngularService){
    $scope.download= download;
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

});