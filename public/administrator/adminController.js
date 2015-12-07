/**
 * Created by Ariel on 29/11/2015.
 */
/**
 * Created by Ariel on 06/11/2015.
 */
app.controller('adminController',function($scope,$modalInstance,selectedCard,ServiceArray){
    $scope.selectedCard= selectedCard;
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.updateStatus = function(){
        $scope.Cards = ServiceArray.updateStatusCard(selectedCard.monitorName);
    };
});
