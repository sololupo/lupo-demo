var express = require('express'),
app = express();

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

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
