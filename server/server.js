var express = require("express"),
	app = express(),
	mongoose = require('mongoose'),
	player = require('./model/player_class'),
	path = require('path'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	db = require('./database.js');

//uncomment following line to see the twenty random questions in console
// db.getQuestions(function(rightAnswersJsonArray, wrongAnswersJsonArray){}); 

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
	Player.createUserIfNoneExists();

	console.log(player)
	console.log(id + ' ' + name);
	res.writeHeader(200, {"Content-Type": "text/plain"});
	res.end(' Success message from server. : ' + id + ' ' + name);


});

// app.get('/hello', function(req,res){
// 	var player = require('./model/player_class'); 
// 	var Player = new player.Player('sfd', 'name');
// 	Player.a();

// 	res.writeHeader(200, {"Content-Type": "text/plain"});
// 	res.end(' Successfully message from server');
// });

 
// app.get("/createUserIfNoneExist", function(req, res) {

//     res.sendfile('../client/views/signin.html')
// });


io.sockets.on('connection', function(socket){
	socket.on('new_player', function(data, callback){

	});


});