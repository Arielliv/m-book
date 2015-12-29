/**
 * Created by Ariel on 30/12/2015.
 */
app.controller('deleteController',function($scope,$modalInstance,selected,ServiceArray){
    $scope.selected= selected;
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
    /*del monitor*/
    $scope.delMonitor = function(selected){

        ServiceArray.delCard(selected.id).then(function(cards) {
            $scope.Cards = cards;
        });
    };

    /*del download*/
    $scope.delDownload = function(selectedCard){
        $scope.downloadsData = ServiceArray.delDownload(selectedCard);
    };

    /*del script*/
    $scope.delScript = function(selectedCard){
        $scope.scriptsData = ServiceArray.delScript(selectedCard);
    };
});
