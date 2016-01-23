/**
 * Created by Ariel on 22/11/2015.
 */
app.controller('uploadScriptsController',function($scope,$modalInstance ){

    $scope.fileNames = '';
    $scope.choose = function(){
        $('#uploadScripts').trigger('click');
    };
    $scope.add = function(valid){
        if(valid){
                $scope.data = 'none';
                $scope.notPass = false;
                var fileInput = document.getElementById('uploadScripts');
                var file = fileInput.files[0];
                var formData = new FormData();
                formData.append('file', file);
                formData.append('scriptName', $scope.scriptName);
                formData.append('scriptExplain', $scope.scriptExplain);
                console.log(formData);
                $modalInstance.close(formData);
            /*activate the onloadend to catch the file*/
        } else {
            $scope.notPass = true;
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
