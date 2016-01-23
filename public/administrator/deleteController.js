/**
 * Created by Ariel on 30/12/2015.
 */
app.controller('deleteController',function($scope,$modalInstance,selected,ServiceArray){
    $scope.selected= selected;

    $scope.ok = function() {
        $modalInstance.close({});
    };

    $scope.cancel = function() {
        $modalInstance.dismiss({});
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
            $modalInstance.close({a : "b"});
        });
    };

    /*del download*/
    $scope.delDownload = function(selectedCard){
        ServiceArray.delDownload(selectedCard).then(function(files) {
            $scope.downloadsData = files;
            $modalInstance.close({});
        });
    };

    /*del script*/
    $scope.delScript = function(selectedCard){
        ServiceArray.delScript(selectedCard).then(function(scripts) {
            $scope.scriptsData = scripts;
            $modalInstance.close({});
        });
    };
});
