/**
 * Created by Ariel on 29/11/2015.
 */
/**
 * Created by Ariel on 06/11/2015.
 */
app.controller('adminController',function($scope,$modalInstance,selected,ServiceArray,types,prodacts,systems){
    $scope.selected= selected;
    $scope.systems = systems;
    $scope.types = types;
    $scope.prodacts = prodacts;
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.update = function(selected) {
        ServiceArray.upadteCard(selected);
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.updateStatus = function(){
        ServiceArray.updateStatusCard($scope.selected).then(function(cards) {
            $scope.Cards = cards;
        });
    };
});
