angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth, $state, store) {
  


  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('tab.dash');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
})

.controller('DashCtrl', function($scope, $http, Users) {
  
  $scope.users = Users.all();
  $scope.remove = function(user) {
    Users.remove(user);
  }


  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://localhost:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  };

})

.controller('UsersCtrl', function($scope, Users) {
  $scope.users = Users.all();
  $scope.remove = function(user) {
    Users.remove(user);
  }
})

.controller('UserDetailCtrl', function($scope, $stateParams, Users) {
  $scope.user = Users.get($stateParams.userId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
