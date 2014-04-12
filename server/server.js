var express = require("express");
var app = express();
//require mongoose node module
var mongoose = require('mongoose');
var player = require('model/player_class');

//connect to local mongodb database

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});


/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('../client/views/signin.html')
});
 
app.get("/createUserIfNoneExist", function(req, res) {
    res.sendfile('../client/views/signin.html')
});