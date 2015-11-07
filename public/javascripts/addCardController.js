/**
 * Created by Ariel on 07/11/2015.
 */

app.controller('addCardController',function($scope,$modalInstance ){
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
