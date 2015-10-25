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
  'ionic.ion.headerShrink'])

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




.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    data: {
      requiresLogin: false
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.view-profile', {
    url: '/view-profile',
    views: {
      'tab-view-profile': {
        templateUrl: 'templates/tab-view-profile.html',
        controller: 'ViewProfileCtrl'
      }
    }
  })

  .state('tab.view-profile.harry', {
    url: '/harry',
    views: {
      'tab-view-profile-harry': {
        templateUrl: 'templates/tab-view-profile.html',
        controller: 'ViewHarryProfileCtrl'
      }
    }
  })


  .state('tab.edit-profile', {
    url: '/edit_profile',
    views: {
      'tab-edit-profile': {
        templateUrl: 'templates/tab-edit-profile.html',
        controller: 'EditProfileCtrl'
      }
    }
  })

  .state('tab.view-profile-platform-detail', {
    url: '/view-profile/:platformId',
    views: {
      'tab-view-profile': {
        templateUrl: 'templates/platform-detail.html',
        controller: 'PlatformDetailCtrl'
      }
    }
  })

  .state('tab.edit-profile-platform-detail', {
    url: '/edit-profile/:platformId',
    views: {
      'tab-edit-profile': {
        templateUrl: 'templates/platform-detail.html',
        controller: 'PlatformDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/view-profile');

  // // Configure Auth0
  // authProvider.init({
  //   domain: AUTH0_DOMAIN,
  //   clientID: AUTH0_CLIENT_ID,
  //   // loginState: 'login'
  //   loginState: 'tab.view-profile'
  // });

//   jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
//     var idToken = store.get('token');
//     var refreshToken = store.get('refreshToken');
//     if (!idToken || !refreshToken) {
//       return null;
//     }
//     if (jwtHelper.isTokenExpired(idToken)) {
//       return auth.refreshIdToken(refreshToken).then(function(idToken) {
//         store.set('token', idToken);
//         return idToken;
//       });
//     } else {
//       return idToken;
//     }
//   }

//   $httpProvider.interceptors.push('jwtInterceptor');

// })

// .run(function($rootScope, auth, store) {
//   $rootScope.$on('$locationChangeStart', function() {
//     if (!auth.isAuthenticated) {
//       var token = store.get('token');
//       if (token) {
//         auth.authenticate(store.get('profile'), token);
//       }
//     }

//   });


})


;
