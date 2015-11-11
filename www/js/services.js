angular.module('starter.services', [])

.factory('Platforms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var platforms = [{
    id: 0,
    name: 'Uber',
    lastText: 'Your private driver',
    face: 'http://seattle.startupweekend.org/files/2012/01/new-uber-logo.jpg',
    code: '3E3DG',
    category: 'transportation',
    trips: 421,
    pay_weekly: "1,100",
    star_rating: 4.9
  }, {
    id: 1,
    name: 'Lyft',
    lastText: 'Your friend with a car',
    face: 'http://cmxhub.com/wp-content/uploads/2014/10/lyft.png',
    code: 'HARRY757',
    category: 'transportation',
    trips: 211,
    pay_weekly: "1,200",
    star_rating: 5.0
  }, {
    id: 2,
    name: 'Airbnb',
    lastText: 'Rent from local hosts',
    face: 'http://www.connorgp.com/wp-content/uploads/2014/01/airbnb_square-new_logo.jpg',
    code: 'AIRJACK',
    category: 'hospitality',
    trips: 30,
    pay_weekly: "1,300",
    star_rating: 4.8
  }, {
    id: 3,
    name: 'Instacart',
    lastText: 'Groceries delivered',
    face: 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/131716-ec50ba6b52bf0edc889bc3a6dae17493-medium_jpg.jpg',
    code: 'HCAMPBELL1231',
    category: 'delivery',
    trips: 30,
    pay_weekly: "950",
    star_rating: 4.9
  }, {
    id: 4,
    name: 'Chariot',
    lastText: 'Your commute. Solved.',
    face: 'https://www.ridechariot.com/static/images/logo1024.png',
    code: 'LUPO',
    category: 'transportation',
    promo: 'Recommended: Get 3 Free Chariot Rides'
  }, {
    id: 5,
    name: 'Breeze',
    lastText: 'Lease rideshare cars',
    face: 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/477922-863014758c953ca7fe9209e708b8cd73-medium_jpg.jpg?buster=1409619663',
    code: 'JACKBREEZE',
    category: 'transportation'
  },  {
    id: 6,
    name: 'DoorDash',
    lastText: 'Delightful food delivery',
    face: 'https://upload.wikimedia.org/wikipedia/en/d/df/Doordash_logo.png',
    code: 'RIDESHAREGUY',
    category: 'delivery',
  },  {
    id: 7,
    name: 'Sidecar',
    lastText: 'Drivers set price and ETA',
    face: 'http://static1.squarespace.com/static/52b0b3c3e4b01516437313c2/t/52b6551fe4b02301e6480d4f/1387681058123/Sidecar-Logo.jpg',
    code: 'HARRY86',
    category: 'transportation',
  },  {
    id: 8,
    name: 'Postmates',
    lastText: 'Drivers set price and ETA',
    face: 'https://postmates.com/static/img/fb-share.408e36b618f5.gif',
    code: 'RSG',
    category: 'delivery',
  } ];

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