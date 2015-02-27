// var apiURL = "https://immense-ravine-9825.herokuapp.com/";
var apiURL = "http://localhost:3000/";

var farmApp = angular.module('farmApp', []);

farmApp.controller('ScheduleCtrl', function ($scope, $http){

  $scope.access_code = '';

  $scope.loadHappenings = function() {
    $http.get(apiURL + 'happenings.json?access_code=' + $scope.access_code)
    .success(function(data) {
      $scope.happenings = data;
    });
  };

  $scope.addHappening = function() {
    $http.post(apiURL + 'happenings?access_code=' + $scope.access_code,
      {
        subject: $scope.subject,
        start_date: $scope.start_date,
        end_date: $scope.end_date
      })
    .success(function(data) {
      $scope.loadHappenings();
      $scope.subject = '';
      $scope.start_date = '';
      $scope.end_date = '';
    });
  };

  $scope.removeHappening = function(id) {
    $http.delete(apiURL + 'happenings/' + id + '?access_code=' + $scope.access_code)
    .success(function(data) {
      $scope.loadHappenings();
    });
  };

  $scope.checkCode = function() {
    $scope.loadHappenings();
  };

  $('.date').datepicker({
    dateFormat: "M d, yy",
    onSelect: function(date) {
      $scope[$(this).attr('ng-model')] = date;
      $scope.$apply();
    }
  });

  $('#calendar').fullCalendar({});
});
