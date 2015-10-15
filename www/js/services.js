angular.module('starter.services', [])

.factory('Platforms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var platforms = [{
    id: 0,
    name: 'Uber',
    lastText: 'Your private driver',
    face: 'http://seattle.startupweekend.org/files/2012/01/new-uber-logo.jpg',
    code: 'UBERJACK',
    category: 'transportation'
  }, {
    id: 1,
    name: 'Lyft',
    lastText: 'Your friend with a car',
    face: 'http://cmxhub.com/wp-content/uploads/2014/10/lyft.png',
    code: 'LYFTJACK',
    category: 'transportation'
  }, {
    id: 2,
    name: 'Airbnb',
    lastText: 'Rent from local hosts',
    face: 'http://www.connorgp.com/wp-content/uploads/2014/01/airbnb_square-new_logo.jpg',
    code: 'AIRJACK',
    category: 'hospitality'
  }, {
    id: 3,
    name: 'Instacart',
    lastText: 'Groceries delivered to your door',
    face: 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/131716-ec50ba6b52bf0edc889bc3a6dae17493-medium_jpg.jpg',
    code: 'INSTAJACK',
    category: 'delivery'
  }, {
    id: 4,
    name: 'Chariot',
    lastText: 'Your commute. Solved.',
    face: 'https://www.ridechariot.com/static/images/logo1024.png',
    code: 'CHARJACK',
    category: 'transportation'
  }];

  return {
    all: function() {
      return platforms;
    },
    remove: function(platform) {
      platforms.splice(platforms.indexOf(platform), 1);
    },
    get: function(platformId) {
      for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].id === parseInt(platformId)) {
          return platforms[i];
        }
      }
      return null;
    }
  };
});
