/**
 * Created by 1006883 on 8/8/2016.
 */
angular.module('starter').controller('mainController',['$scope','$ionicPlatform','$cordovaImagePicker','$cordovaFile', function ($scope,$ionicPlatform,$cordovaImagePicker,$cordovaFile) {

  $ionicPlatform.ready(function () {

    $scope.chooseImage=function () {
console.log("hi");
      var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
      $cordovaImagePicker.getPictures(options).then(function(imageURI) {

        //A hack that you should include to catch bug on Android 4.4 (bug < Cordova 3.5):
        if (imageURI.substring(0,21)=="content://com.android") {
          var photo_split=imageURI.split("%3A");
          imageURI="content://media/external/images/media/"+photo_split[1];
        }

        window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {

          //If this doesn't work
          $scope.image = fileEntry.nativeURL;
          var newFileUri  = cordova.file.dataDirectory + "images/";
          var oldFileUri  = imageURI;
          var fileExt     = "." + oldFileUri.split('.').pop();

          var newFileName = guid("car") + fileExt;
          window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
            function(dirEntry) {
              // move the file to a new directory and rename it
              fileEntry.moveTo(dirEntry, newFileName, successCallback, errorCallback);
            },
            errorCallback);

          //Try this
          //var image = document.getElementById('myImage');
          //image.src = fileEntry.nativeURL;
        });
      });
    }

    function successCallback(entry) {
      console.log("New Path: " + entry.fullPath);
      alert("Success. New Path: " + entry.fullPath);
    }

    function errorCallback(error) {
      console.log("Error:" + error.code)
      alert(error.code);
    }

  })



}]);
