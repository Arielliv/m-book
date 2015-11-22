/**
 * Created by Ariel on 22/11/2015.
 */
app.controller('uploadScriptsController',function($scope,$modalInstance ){
    $scope.add = function(valid){
        if(valid){
            var f = document.getElementById('file').files[0];
            var r = new FileReader();
            r.onloadend = function(e){
                $scope.data = e.target.result;
            };
            $scope.notPass = false;

            $modalInstance.close({
                'data':$scope.data
            });
        } else {
            $scope.notPass = true;
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
