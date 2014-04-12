var express = require("express");
var app = express();
//require mongoose node module
var mongoose = require('mongoose');
var player = require('./model/player_class');
var path = require('path');

var db = require('./database.js');
//uncomment following line to see the twenty random questions in console
// db.getQuestions(function(rightAnswersJsonArray, wrongAnswersJsonArray){}); 

//connect to local mongodb database

//attach lister to connected event



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
	player.createUserIfNoneExists;
	res.send(true);

});

 
// app.get("/createUserIfNoneExist", function(req, res) {

//     res.sendfile('../client/views/signin.html')
// });