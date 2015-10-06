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
      $state.go('tab.view-profile');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
})

.controller('ViewProfileCtrl', function($scope, $http, Platforms, $ionicActionSheet, $ionicPopup, $timeout) {
  
  $scope.platforms = Platforms.all();


  $scope.onHold = function(platform) {
    $scope.code = platform.code
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    cordova.plugins.clipboard.copy(code.text).then(function() {
    var myPopup=$ionicPopup.show ({
        template: '<span>Referral code copied</span>',
        scope: $scope
      })
    });
      $timeout(function() {
        myPopup.close(); //close the popup after 1 seconds for some reason
      }, 1000);
  };


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

.controller('EditProfileCtrl', function($scope, Platforms) {
  $scope.platforms = Platforms.all();
  $scope.remove = function(platform) {
    Platforms.remove(platform);
  }
})

.controller('PlatformDetailCtrl', function($scope, $stateParams, Platforms) {
  $scope.platform = Platforms.get($stateParams.platformId);
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
