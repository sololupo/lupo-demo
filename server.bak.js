var express = require('express'),
app = express();

// middleware
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // get our config file
var User   = require('./models/user'); // get our mongoose model


// =======================
// configuration =========
// =======================
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// =======================
// routes ================
// =======================

// LANDING PAGE START
	app.use(express.static('home'));

		// extra for html5

		app.use("/js", express.static(__dirname + "/home/js"));
		app.use("/img", express.static(__dirname + "/home/img"));
		app.use("/css", express.static(__dirname + "/home/css"));
		app.use("/templates", express.static(__dirname + "/home/templates"));

		// end extra

// END LANDING PAGE


// START MAIN APP

	app.use(express.static('www'));

		//extra html5
		app.use("/js", express.static(__dirname + "/www/js"));
		app.use("/img", express.static(__dirname + "/www/img"));
		app.use("/css", express.static(__dirname + "/www/css"));
		app.use("/templates", express.static(__dirname + "/www/templates"));
		//end extra


	app.all('/harry', function(req, res, next) {

	    // Just send the index.html for other files to support HTML5Mode
	    res.sendFile('www/index.html', { root: __dirname });
	});

// END MAIN APP

// =======================
// API ROUTES
// =======================

	app.get('/setup', function(req, res) {

	  // create a sample user
	  var nick = new User({ 
	    name: 'Nick Cerminara', 
	    password: 'password',
	    admin: true 
	  });

	  // save the sample user
	  nick.save(function(err) {
	    if (err) throw err;

	    console.log('User saved successfully');
	    res.json({ success: true });
	  });
	});

	// get an instance of the router for api routes
	var apiRoutes = express.Router(); 

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRoutes.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      if (user.password != req.body.password) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign(user, app.get('superSecret'), {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});


	// route middleware to verify a token
	apiRoutes.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;    
	        next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
	});

	

	// route to show a random message (GET http://localhost:8080/api/)
	apiRoutes.get('/', function(req, res) {
	  res.json({ message: 'Welcome to the coolest API on earth!' });
	});

	// route to return all users (GET http://localhost:8080/api/users)
	apiRoutes.get('/users', function(req, res) {
	  User.find({}, function(err, users) {
	    res.json(users);
	  });
	});   

	// apply the routes to our application with the prefix /api
	app.use('/api', apiRoutes);



// =======================
// start the server ======
// =======================

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
