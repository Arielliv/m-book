app.controller('addCardController',function($scope,$modalInstance ){
    $scope.ok = function(valid){
        if(valid){
            $scope.notPass = false;
            $modalInstance.close({
                'monitorName' : $scope.monitorName,
                'monitorType' : $scope.monitorType,
                /*change to level*/"monitorLevel" : $scope.monitorLevel,
                'monitorProdact' : $scope.monitorProdact,
                'monitorSystem' : $scope.monitorSystem,
                'monitorExplain' : $scope.monitorExplain,
                'views' : 0
            });
        } else {
            $scope.notPass = true;
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
