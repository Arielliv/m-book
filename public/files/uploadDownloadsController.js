/**
 * Created by Ariel on 22/11/2015.
 */
app.controller('uploadDownloadsController',function($scope,$modalInstance,$timeout){
    $scope.fileNames = '';
    $scope.choose = function(){
        $('#uploadDownloads').trigger('click');
    };
    $scope.add = function(valid){
        if(valid){
            $scope.data = 'none';
            $scope.notPass = false;
            var fileInput = document.getElementById('uploadDownloads');
            var file = fileInput.files[0];
            var formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', $scope.fileName);
            formData.append('fileExplain', $scope.fileExplain);
            console.log(formData);
            $modalInstance.close(formData);
        } else {
            $scope.notPass = true;
        }
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
