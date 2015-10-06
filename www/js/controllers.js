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

  $scope.copyText = function (text) {
                    var node = createNode(text);
                    $document[0].body.appendChild(node);
                    copyNode(node);
                    $document[0].body.removeChild(node);
                };

  $scope.angularCopy = function (scope, text) {
                    try {
                        copyText(scope.text);
                        if (scope.onCopied) {
                            scope.onCopied();
                            console.log('copied')
                        }
                    } catch (err) {
                        if (scope.onError) {
                            scope.onError({err: err});
                            console.log('err')
                        }
                    }
                };

  $scope.copyCode = function(platform) {
    $scope.code = platform.code
    scope = $scope
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    try {
      cordova.plugins.clipboard.copy($scope.code.text);
            $scope.angularCopy(scope, $scope.code.text)

    }catch(e) {
      $scope.angularCopy(scope, $scope.code.text)
    }
    var myPopup = $ionicPopup.show ({
        template: '<center><h3>' + JSON.stringify($scope.code, null, 2) + '</h3><h4>Referral code copied</h4></center>',
        scope: $scope
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

.controller('PlatformDetailCtrl', function($scope, $stateParams, Platforms, $ionicPopup, $timeout) {
  $scope.platform = Platforms.get($stateParams.platformId);

  $scope.copyText = function (text) {
                    var node = createNode(text);
                    $document[0].body.appendChild(node);
                    copyNode(node);
                    $document[0].body.removeChild(node);
                };

  $scope.angularCopy = function (scope, text) {
                    try {
                        copyText(scope.text);
                        if (scope.onCopied) {
                            scope.onCopied();
                            console.log('copied')
                        }
                    } catch (err) {
                        if (scope.onError) {
                            scope.onError({err: err});
                            console.log('err')
                        }
                    }
                };

  $scope.copyCode = function(platform) {
    $scope.code = platform.code
    scope = $scope
    console.log('onHold');
    console.log('code: ' + JSON.stringify($scope.code, null, 2));
    try {
      cordova.plugins.clipboard.copy($scope.code.text);
            $scope.angularCopy(scope, $scope.code.text)

    }catch(e) {
      $scope.angularCopy(scope, $scope.code.text)
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

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
