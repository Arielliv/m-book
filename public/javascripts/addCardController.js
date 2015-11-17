app.controller('addCardController',function($scope,$modalInstance ){
    $scope.ok = function() {
        $modalInstance.close({
            'monitorName' : $scope.monitorName,
            'monitorType' : $scope.monitorType,
            'monitorProdact' : $scope.monitorProdact,
            'monitorSystem' : $scope.monitorSystem,
            'monitorExplain' : $scope.monitorExplain,
            'views' : 0
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
