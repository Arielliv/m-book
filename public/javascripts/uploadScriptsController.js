/**
 * Created by Ariel on 22/11/2015.
 */
app.controller('uploadScriptsController',function($scope,$modalInstance ){
    $scope.add = function(valid){
        if(valid){
                $scope.data = 'none';
                var f = document.getElementById('uploadScripts').files[0];
                var r = new FileReader();
                r.onloadend = function(e){
                    $scope.data = e.target.result;
                    $scope.notPass = false;
                    $modalInstance.close({
                        'data':$scope.data,
                        'scriptName':$scope.scriptName,
                        'scriptExplain':$scope.scriptExplain
                    });
                };
            /*activate the onloadend to catch the file*/
                r.readAsBinaryString(f);
        } else {
            $scope.notPass = true;
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
