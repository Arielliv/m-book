/**
 * Created by Ariel on 29/11/2015.
 */
/**
 * Created by Ariel on 06/11/2015.
 */
app.controller('adminController',function($scope,$modalInstance,selectedCard){
    $scope.selectedCard= selectedCard;
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
