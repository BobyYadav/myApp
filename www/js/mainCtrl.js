/**
 * Created by 1006883 on 8/8/2016.
 */
angular.module('starter').controller('mainController',['$scope','$ionicPlatform','$cordovaImagePicker','$cordovaDatePicker', function ($scope,$ionicPlatform,$cordovaImagePicker,$cordovaDatePicker) {

  $ionicPlatform.ready(function () {

    $scope.selectedCategory={
      "value":"Choose Category"
    };

    $scope.categories=["Choose Category","food"]

    $scope.addExpense=function () {

    }

    $scope.addCategory=function () {

    }
    $scope.selectDate=function () {
      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

        $cordovaDatePicker.show(options).then(function(date){
          alert(date);

      }, false);
    }

  })



}]);
