/**
 * Created by boby on 8/27/2016.
 */
angular.module('starter').controller('mainController', ['$scope','contactsService','$cordovaFile', function ($scope,contactsService,$cordovaFile) {

  /*$scope.FRcontacts = contactsService.contacts();
  $scope.object=[{
    "name": "abccc",
    "Employee_id":"5896351",
    "contact": "09840390883",
    "email_id": "thimothyraj.nr@tcs.com",
    "team":"FR API",
    "url":"Details({employeeID:5896351})"
  }];
  $scope.FRcontacts=$scope.FRcontacts.concat($scope.object);*/
  document.addEventListener("deviceready", function () {
    //$scope.contacts = contactsService.contacts();

    $scope.object=[{
      "name": "abccc",
      "Employee_id":"5896351",
      "contact": "09840390883",
      "email_id": "thimothyraj.nr@tcs.com",
      "team":"FR API",
      "url":"Details({employeeID:5896351})"
    }];
    $cordovaFile.checkFile(cordova.file.dataDirectory, 'FRcontacts.txt')
      .then(function (success) {
        // success
      }, function (error) {
        // error
        $cordovaFile.createFile(cordova.file.dataDirectory, 'FRcontacts.txt', true)
          .then(function (success) {
            // success
            $cordovaFile.writeFile(cordova.file.dataDirectory, 'FRcontacts.txt', contactsService.contacts(), {'append': false})
              .then(function (success) {
              }, function (error) {
                // error
              });
          }, function (error) {
            // error
          });
      });

    $cordovaFile.readAsText(cordova.file.dataDirectory, 'FRcontacts.txt')
     .then(function (result) {

         $scope.FRcontacts=JSON.parse(result);
       $scope.FRcontacts=$scope.FRcontacts.concat($scope.object)
         /*$scope.contacts=JSON.stringify($scope.data);
         $scope.contacts=JSON.parse($scope.contacts);
         $scope.FRcontacts=$scope.data.concat(($scope.object));*/
         /*angular.forEach($scope.FRcontacts,function (value,key) {
           $scope.contacts.push(value);
         });*/
       $cordovaFile.writeFile(cordova.file.dataDirectory, 'FRcontacts.txt', $scope.FRcontacts,true)
         .then(function (success) {
           $cordovaFile.readAsText(cordova.file.dataDirectory, 'FRcontacts.txt')
             .then(function (result) {
               $scope.contacts=JSON.parse(result);
             })
         }, function (error) {
           // error
         });

       //$scope.FRcontacts=JSON.parse($scope.FRcontacts);
     // success
     }, function (error) {
     $scope.data=error;// error
     });


    function onSuccess(result) {
      console.log("Success:" + result);
    }

    function onError(result) {
      console.log("Error:" + result);
    }

    $scope.call = function (number) {
      window.plugins.CallNumber.callNumber(onSuccess, onError, number);
    }
  });
}]);
