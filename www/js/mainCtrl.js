/**
 * Created by 1006883 on 8/8/2016.
 */
angular.module('starter').controller('mainController',['$scope','$ionicPlatform','$cordovaImagePicker','$cordovaDatePicker','ionicDatePicker','$ionicPopup', function ($scope,$ionicPlatform,$cordovaImagePicker,$cordovaDatePicker,ionicDatePicker,$ionicPopup) {

  $ionicPlatform.ready(function () {
    $scope.addCategoryName=false;
    $scope.selectedCategory={
      "value":"",
      "newCategory":""
    };


    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      }};

    $scope.categories=[];
    var db = openDatabase('mydb', '1.0', 'My DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS expense (id integer primary key, amount text, category text, date date)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS categoryMaster (categoryId integer primary key, category text)');
      tx.executeSql('SELECT * FROM categoryMaster', [], function (tx, results) { //SELECT name FROM sqlite_master WHERE type='table' AND name='table_name';
        var len = results.rows.length;
        if(len<1){
          var categories=["food", "water", "Bill"];
          for(var i=0;i<categories.length;i++){
            tx.executeSql('INSERT INTO categoryMaster (category) VALUES ("'+ categories[i] +'")');
          }

        }
      }, null);

      tx.executeSql('SELECT SUM(amount) FROM expense', [], function (tx, results) {
        if(results.length>0)
           $scope.expense = results;
        else{
          $scope.expense=0;
        }
      }, null);


      tx.executeSql('SELECT * FROM categoryMaster', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          $scope.categories.push(results.rows.item(i).category);
        }
      }, null);
    });

    $scope.showAlert = function(titleMsg,templateMsg) {
      var alertPopup = $ionicPopup.alert({
        title: titleMsg,
        template: templateMsg
      });

      alertPopup.then(function(res) {
        $scope.selectedCategory.newCategory="";
      });
    };

    $scope.addExpense=function () {
      if($scope.selectedCategory.value!="" ){

      }
    }

    $scope.addCategory=function () {
      $scope.addCategoryName=true;
    };

    $scope.insertCategory=function () {
      if($scope.selectedCategory.newCategory!="" && $scope.selectedCategory.newCategory.length>0 && $scope.selectedCategory.newCategory!=null){
        db.transaction(function (tx) {
        tx.executeSql('INSERT INTO categoryMaster (category) VALUES ("'+ $scope.selectedCategory.newCategory +'")');
          console.log($scope.categories)
          $scope.categories=[];
          $scope.$apply(function(){
            tx.executeSql('SELECT * FROM categoryMaster', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
              $scope.categories.push(results.rows.item(i).category);
            }
            $scope.$apply();
          }, null);
          });
          var titleMsg= 'Alert';
          var  templateMsg= 'Category Added';
          $scope.showAlert(titleMsg,templateMsg);
      })
      }
      else{
       var titleMsg= 'Alert';
        var  templateMsg= 'Please insert Category';
        $scope.showAlert(titleMsg,templateMsg);
      }
    };

    $scope.closeCategory=function () {
      $scope.addCategoryName=false;
    };

    $scope.selectDate=function () {
      ionicDatePicker.openDatePicker(ipObj1);
    }

  })



}]);
