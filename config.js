// config.js is gitignored for security, but here is a template if it gets lossed
module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'JWT Token Secret',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://ds051523.mongolab.com:51523/lupotest1',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '1e10f9a42be6276f3cb040d2b144bdb3',
  FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || '',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',
  GITHUB_SECRET: process.env.GITHUB_SECRET || '',
  INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET || '',

  LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || '',
  TWITCH_SECRET: process.env.TWITCH_SECRET || '',
  WINDOWS_LIVE_SECRET: process.env.WINDOWS_LIVE_SECRET || '',
  YAHOO_SECRET: process.env.YAHOO_SECRET || '',

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || '',
  TWITTER_SECRET: process.env.TWITTER_SECRET || ''
};