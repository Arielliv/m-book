/**
 * Created by Ariel on 06/11/2015.
 */
app.controller('monitorViewController',function($scope,$modalInstance,selectedCard,ServiceArray){
    $scope.selectedCard= selectedCard;
    $scope.ok = function() {
        $modalInstance.close({
            baba:'a'
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss({baba:'a'});
    };
});
