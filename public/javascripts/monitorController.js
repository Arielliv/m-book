/**
 * Created by Ariel on 06/11/2015.
 */
app.controller('monitorController',function($scope,$modalInstance ,Cards , $filter , Length){
    $scope.counter =1;
    $scope.newCard = $filter('filter')(Cards, {$index: $scope.counter})[0];
    console.log($scope.newCard);
    if ($scope.counter < Length ){
        $scope.counter ++;
    }
    $scope.ok = function() {
        $modalInstance.close({
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
