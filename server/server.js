var express = require("express");
var app = express();
//require mongoose node module
var mongoose = require('mongoose');

//connect to local mongodb database
var db = mongoose.connect('mongodb://admin:admin@dbh75.mongolab.com:27757/nasahackathon');

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('public/signin.html')
});
 
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

function createUserIfNoneExists(player_id, username) {
	db.players.findAndModify({
		query: { id: player_id },
		update: {
			$setOnInsert: { id: player_id, name: username, cumulativeScore: 0 }
		},
		new: true,
		upsert: true
	})
	console.log("player added to database");
}