/**
 * Created by 1006883 on 8/8/2016.
 */
angular.module('starter').controller('mainController',['$scope','$ionicPlatform', function ($scope,$ionicPlatform) {

  $ionicPlatform.ready(function () {

    $scope.chooseImage=function () {
console.log("hi")
    }

  })



}]);
