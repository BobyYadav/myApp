// Ionic Starter App
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

   /* db = $cordovaSQLite.openDB("My DB");*/
    /*$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS expense (id integer primary key, amount text, category text, date date)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS category (categoryId integer primary key, category text)");*/


  });
})
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('choose', {
        url: '/',
        templateUrl: "html/main.html",
        controller: 'mainController'
      })
      .state('add-expense', {
        url: '/add-expense',
        templateUrl: "html/addExpense.html",
        controller: 'mainController'
      })

      // the select image tab has its own child nav-view and history
      .state('hidden', {
        url: '/hidden-images',
        templateUrl: 'html/hidden.html',
        controller: 'mainController'
      });
    $urlRouterProvider.otherwise('/');
  })
  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
