/**
 * Created by boby on 8/27/2016.
 */
angular.module('starter').controller('detailController', ['$scope','contactsService','$stateParams','$ionicHistory', function ($scope,contactsService,$stateParams,$ionicHistory) {

  $scope.contacts=contactsService.contacts();
  $scope.employee={};

  if($stateParams.employeeID!=null || $stateParams.employeeID!=''){
    angular.forEach($scope.contacts,function (value,key) {
      if(value.Employee_id==$stateParams.employeeID){
        $scope.employee=value;
      }
    })
  }
  $scope.back=function () {
    $ionicHistory.goBack();
  }

}]);
