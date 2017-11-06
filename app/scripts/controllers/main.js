'use strict';

/**
 * @ngdoc function
 * @name testAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAngularApp
 */

function verifyLogin($scope, $cookies, $window, $location) {
  $scope.token = $cookies.get("token");
  var absUrl = $location.absUrl();
  if ($scope.token !== undefined && $scope.token !== '' && $scope.token !== null && absUrl.indexOf('login.html') !== -1) {
    $window.location.href = '/';
  }
  else if (($scope.token === undefined || $scope.token === '' || $scope.token === null) && absUrl.indexOf('login.html') === -1){
    $window.location.href = 'login.html';
  }
}

angular.module('testAngularApp')

.controller('MainCtrl', function ($cookies, $window, $location) {
  verifyLogin($scope, $cookies, $window, $location);
  this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })

  .controller('MonReseauController', function ($scope, $http, $cookies, $window, $location) {
    verifyLogin($scope, $cookies, $window, $location);
    $http.get('http://localhost/InsectProject/web/app_dev.php/api/friends').then(function (response) {

      $scope.friends = response.data;
      console.log($scope.friends);
    });

  })

  .controller('loginController', function ($scope, $http, $cookies, $window, $location) {
    verifyLogin($scope, $cookies, $window, $location);
    $scope.loginInfo = {
      login: "",
      password: ""
    };
    $scope.loginHasError = false;
    $scope.login = function () {
      $http.post('http://localhost/InsectProject/web/app_dev.php/api/login', $scope.loginInfo).then(function (response) {
        $cookies.put("token", response.data);
        $window.location.href = '/';
      }, function (response) {
        $scope.loginHasError = true
      });
    }
  })


  .controller('usersController', function ($scope, $http, $cookies, $window, $location) {
    verifyLogin($scope, $cookies, $window, $location);
    $http.get('http://localhost/InsectProject/web/app_dev.php/api/list').then(function (response) {
      $scope.users = response.data;

    });
  });
