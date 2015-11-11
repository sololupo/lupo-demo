// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
  'starter.controllers', 
  'starter.services',
  'starter.harryservices',
  'angular-clipboard',
  'ionic.ion.headerShrink',
  'satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard'); 
    //overrides Android striped tabs which mess up styling
})



// States
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, $locationProvider) {

  // html5 mode without hashbang #!
  $locationProvider.html5Mode(true);

  // Skip state if Logged In
  function skipIfLoggedIn($q, $auth, $state) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
      $state.go('tab.view-profile');
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  // Redirect to Login if Login Required and not Authenticated
  function loginRequired($q, $state, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $state.go('login');
    }
    return deferred.promise;
  }


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl',
    data: {
      requireLogin: false,
      skipIfLoggedin: true
    }
  })

  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl',
    data: {
      requireLogin: false,
      skipIfLoggedin: true
    }

  })

  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'LogoutCtrl',
    data: {
      requireLogin: true,
      skipIfLoggedin: false
    }
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    data: {
      requireLogin: true,
      skipIfLoggedin: false
    }
  })

  // Each tab has its own nav history stack:


  .state('tab.view-profile.harry', {
    url: '/harry',
    views: {
      'tab-view-profile-harry': {
        templateUrl: 'templates/tab-view-profile.html',
        controller: 'ViewHarryProfileCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  })

  .state('tab.view-profile', {
    url: '/view-profile',
    views: {
      'tab-view-profile': {
        templateUrl: 'templates/tab-view-profile.html',
        controller: 'ViewProfileCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  })

  .state('tab.edit-profile', {
    url: '/edit-profile',
    views: {
      'tab-edit-profile': {
        templateUrl: 'templates/tab-edit-profile.html',
        controller: 'EditProfileCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  })

  .state('tab.view-profile-platform-detail', {
    url: '/view-profile/:platformId',
    views: {
      'tab-view-profile': {
        templateUrl: 'templates/platform-detail.html',
        controller: 'PlatformDetailCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  })

  .state('tab.edit-profile-platform-detail', {
    url: '/edit-profile/:platformId',
    views: {
      'tab-edit-profile': {
        templateUrl: 'templates/platform-detail.html',
        controller: 'PlatformDetailCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl',
        data: {
          requireLogin: true
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("tab.view-profile");
        });

//End States

// Start AuthProvider
  // OAuth popup should expand to full screen with no location bar/toolbar.
  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'no',
      width: window.screen.width,
      height: window.screen.height
    }
  };

  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    $authProvider.cordova = true;
    commonConfig.redirectUri = 'http://localhost/';
  } 

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '1628664424039631',
    responseType: 'token',
    scope: ['email','public_profile','user_friends' ]
  }));

  $authProvider.twitter(angular.extend({}, commonConfig, {
    url: 'http://localhost:3000/auth/twitter'
  }));

  $authProvider.google(angular.extend({}, commonConfig, {
    clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com',
    url: 'http://localhost:3000/auth/google'
  }));

  
})
// End AuthProvider

// START REDIRECT IF NOT LOGGED IN

.factory('RouteValidator', ['$rootScope', '$auth', '$state', '$location', function ($rootScope, $auth, $state, $location) {
    return {
        private: private
    };

    function private() {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var requireLogin = toState.data.requireLogin;
            var skipIfLoggedIn = toState.data.skipIfLoggedIn;


                        // Redirect to view profile if authenticated and marked skipIfLoggedin
            if (skipIfLoggedIn && $auth.isAuthenticated()) {
                event.preventDefault();
                $state.go('tab.view-profile');
                return;
            } 
            else
            // Redirect to Login if not authenticated & state requires login
            if (requireLogin && !$auth.isAuthenticated()) {
              if (toState.name === 'login'){
                return;
              } else {
                event.preventDefault();
                $state.go('login');
                return;
              }
            }


        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            var public = ['login', 'signup'];
            if ($auth.isAuthenticated() && public.indexOf(toState.name) > -1) {
                event.preventDefault();
                $location.path('/' + fromState.name);
                return;
            }
        });
    }

}])

.run(['RouteValidator', function (RouteValidator) {
    RouteValidator.private();
}])

// END REDIRECT IF NOT LOGGED IN

;
