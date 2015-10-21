var express = require('express'),
app = express();

app.use(express.static('www'));
// extra for html5

app.use("/js", express.static(__dirname + "/www/js"));
app.use("/img", express.static(__dirname + "/www/img"));
app.use("/css", express.static(__dirname + "/www/css"));
app.use("/templates", express.static(__dirname + "/www/templates"));

// end extra
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('www/index.html', { root: __dirname });
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
