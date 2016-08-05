/**
 * Created by 1006883 on 8/5/2016.
 */
angular.module('starter').controller('mainController',['$scope',function ($scope) {

  $scope.picPath="./../img/ionic1.png";
  var i=1;

  $scope.nextPath=function () {
    if(i<2){
      ++i;
      $scope.picPath="./../img/ionic"+i+".png";
    }
  };

  $scope.previousPath=function () {
    if(i>1) {
      --i;
      $scope.picPath="./../img/ionic"+i+".png";
    }
  }
}]);
