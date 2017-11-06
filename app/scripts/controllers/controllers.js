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

function logout($cookies, $window) {
  $cookies.remove("token")
  $window.location.href = 'login.html';
}

testAngularApp

  .controller('MainController', function ($scope, $location, $window, $cookies, $http) {
    verifyLogin($scope, $cookies, $window, $location);
    $scope.isPaths = function(paths) {
      var url = $location.url();
      for (var i = 0; i < paths.length; i++) {
        if(url === paths[i]) {
          return true
        }
      }
      return false
    };

    $scope.logout = function() {
      $cookies.remove("token");
      $window.location.href = '/login.html';
    };

    $scope.token = $cookies.get("token");

    var config = {headers:  {
      'token': $scope.token
    }
    };

    $http.get('http://localhost/InsectProject/web/app_dev.php/api/connectedUser', config).then(function (response) {
      $scope.user = response.data;
    }, function (response) {
    });

  })

  .controller('ListController', function ($scope, $cookies, $window, $location, $http) {
    verifyLogin($scope, $cookies, $window, $location);
    $scope.token = $cookies.get("token");

    var config = {headers:  {
      'token': $scope.token
    }
    };

     $scope.refresh = function(){
    $http.get('http://localhost/InsectProject/web/app_dev.php/api/list', config).then(function (response) {
      $scope.users = response.data;
    }, function (response) {
      if(response.status === 401 || response.status === 403) {
        logout($cookies, $window)
      }
    });

    }

    $scope.refresh();

    $scope.add = function(id) {
      var parameter = {id: +id};
      $http.post('http://localhost/InsectProject/web/app_dev.php/api/addFriend', parameter , config).then(function (response) {
        $scope.refresh();
      
    }, function (response) {
      if(response.status === 401 || response.status === 403) {
        logout($cookies, $window)
      }
    });
   
  }
  })

  .controller('AddController', function ($scope, $cookies, $window, $location, $http) {
    verifyLogin($scope, $cookies, $window, $location);
    $scope.token = $cookies.get("token");

    var config = {headers:  {
      'token': $scope.token
    }
    };

    $scope.refresh = function(){
     $http.get('http://localhost/InsectProject/web/app_dev.php/api/friends', config).then(function (response) {
      $scope.friends = response.data;
    }, function (response) {
      if(response.status === 401 || response.status === 403) {
        logout($cookies, $window)
      }
    });
    }

    $scope.refresh();

    

    $scope.delete = function(id) {
      $http.delete('http://localhost/InsectProject/web/app_dev.php/api/deleteFriend/'+id, config).then(function (response) {

        $scope.refresh();
      
    }, function (response) {
      if(response.status === 401 || response.status === 403) {
        logout($cookies, $window)
      }
    });
    


  }
  })

  .controller('ShowController', function ($scope, $cookies, $window, $location, $http) {
    verifyLogin($scope, $cookies, $window, $location);
     $scope.token = $cookies.get("token");

  })


  .controller('LoginController', function ($scope, $cookies, $window, $location, $http) {
    verifyLogin($scope, $cookies, $window, $location);
    $scope.loginInfo = {
      login: "",
      password: ""
    };
    $scope.loginHasError = false;
    $scope.login = function () {
      $http.post('http://localhost/InsectProject/web/app_dev.php/api/login', $scope.loginInfo).then(function (response) {
        $cookies.put("token", response.data.token);
        $window.location.href = '/';
      }, function (response) {
        $scope.loginHasError = true
      });
    }
  })
;
    