angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $auth, $state, $ionicPopup) {
  

    $scope.login = function(provider) {
      $auth.login($scope.user)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          });
          $state.go('tab.view-profile')
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in with ' + provider
          });
          $state.go('tab.view-profile')
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };


    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  
})


.controller('SignupCtrl', function($scope, $auth, $state, $ionicPopup) {
  
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/');
          $ionicPopup.alert({
            content: 'You have successfully created a new account and have been signed-in'
          });
        })
        .catch(function(response) {
          $ionicPopup.alert({
            content: response.data.message
          });
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          });
          $state.go('tab.view-profile')
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };


    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  
})

.controller('ViewProfileCtrl', function($scope, $http, Platforms, $ionicActionSheet,$ionicScrollDelegate, $ionicPopup, $timeout, $auth, Account) {
  

  $scope.platforms = Platforms.all();

  // Set default selection
  $scope.category_query="transportation"

  // Scrolling to top on click
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
  };


  $scope.copyCode = function(platform) {
    $scope.code = platform.code;
    $scope.name = platform.name;
    scope = $scope;
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    try {
      cordova.plugins.clipboard.copy($scope.code.text);

    }catch(e) {
      //insert browser copy to clipboard action here
    }
    var myPopup = $ionicPopup.show ({
        template: '<center><h3>' + JSON.stringify($scope.code, null, 2) + '</h3><h4>' + $scope.name + ' ' + 'referral code copied</h4></center>',
        scope: $scope
    });

    $timeout(function() {
        myPopup.close(); //close the popup after 1 seconds for some reason
    }, 1000);

  };



})

.controller('ViewHarryProfileCtrl', function($scope, $http, HarryPlatforms, $ionicActionSheet,$ionicScrollDelegate, $ionicPopup, $timeout) {
  
  $scope.platforms = HarryPlatforms.all();

  $scope.category_query="transportation"

  // Scrolling to top on click
  $scope.scrollTop = function() {
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
  };


  $scope.copyCode = function(platform) {
    $scope.code = platform.code;
    $scope.name = platform.name;
    scope = $scope;
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    try {
      cordova.plugins.clipboard.copy($scope.code.text);

    }catch(e) {
      //insert browser copy to clipboard action here
    }
    var myPopup = $ionicPopup.show ({
        template: '<center><h3>' + JSON.stringify($scope.code, null, 2) + '</h3><h4>' + $scope.name + ' ' + 'referral code copied</h4></center>',
        scope: $scope
    });

    $timeout(function() {
        myPopup.close(); //close the popup after 1 seconds for some reason
    }, 1000);

  };


})

.controller('EditProfileCtrl', function($scope, Platforms, $auth, Account) {
  $scope.platforms = Platforms.all();
  $scope.remove = function(platform) {
    Platforms.remove(platform);
  };

  // Profile Editing Options  
    $scope.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          $ionicPopup.alert({
            content: response.data.message + response.status
          });
        });
    };
    $scope.updateProfile = function() {
      Account.updateProfile($scope.user)
        .then(function() {
          $ionicPopup.alert({
            content:'Profile has been updated'
          });
        })
        .catch(function(response) {
          $ionicPopup.alert({
            content: response.data.message + response.status
          });
        });
    };
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $ionicPopup.alert({
            content: 'You have successfully linked a ' + provider + ' account'
          });
          $scope.getProfile();
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data.message + response.status
          });
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have unlinked a ' + provider + ' account'
          });
          $scope.getProfile();
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account' + response.status
          });
        });
    };

    $scope.getProfile();
})

.controller('PlatformDetailCtrl', function($scope, $stateParams, Platforms, $ionicPopup, $timeout) {
  $scope.platform = Platforms.get($stateParams.platformId);


  $scope.copyCode = function(platform) {
    $scope.code = platform.code
    scope = $scope
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    try {
      cordova.plugins.clipboard.copy($scope.code.text);

    }catch(e) {
      //insert browser copy to clipboard action here
    }
    var myPopup = $ionicPopup.show ({
        template: '<center><h3>' + JSON.stringify($scope.code, null, 2) + '</h3><h4>Referral code copied</h4></center>',
        scope: $scope
    });

    $timeout(function() {
        myPopup.close(); //close the popup after 1 seconds for some reason
    }, 1000);

  };
    
})

.controller('AccountCtrl', function($scope, $state, $auth) {

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {
      $auth.logout().then(function() {
        $state.go('login');
      })
    };
});
