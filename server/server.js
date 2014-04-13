var express = require("express");
var app = express();
//require mongoose node module
var mongoose = require('mongoose');
var player = require('./model/player_class');
var path = require('path');

var db = require('./database.js');
// uncomment following line to see the twenty random questions in console
// db.getQuestions(function(rightAnswersJsonArray, wrongAnswersJsonArray){}); 

//use following to create a new player/update existing player
// db.updatePlayerInfo({id:1, name: 'asdf', cumulativeScore: 123});  //NOTE: when testing remember to delete test entries after


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});


/* serves main page */
app.get("/", function(req, res) {
	var filepath = path.resolve('client/views/signin.html');
    res.sendfile(filepath);
});

app.get("/api/user/check_user_in_db/:id/:name", function(req, res){
	var id = req.param('id');
	var name = req.param('name');
	
	var player = require('./model/player_class'); 
	var Player = new player.Player(id, name);
	console.log(player)
	console.log(id + ' ' + name);
	res.writeHeader(200, {"Content-Type": "text/plain"});
	res.end(' Successfully. Message from server. : ' + id + ' ' + name);


});

 
// app.get("/createUserIfNoneExist", function(req, res) {

//     res.sendfile('../client/views/signin.html')
// });