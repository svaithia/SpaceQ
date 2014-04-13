var express = require("express"),
	app = express(),
	mongoose = require('mongoose'),
	player = require('./server/model/player_class'),
	path = require('path'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	db = require('./server/database');

app.use(express.static(path.join(__dirname, 'client')));

//uncomment following line to see the twenty random questions in console
// db.getQuestions(function(rightAnswersJsonArray, wrongAnswersJsonArray){}); 

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);


});


/* serves main page */
app.get("/", function(req, res) {
	var filepath = path.resolve('client/views/signin.html');
    res.sendfile(filepath);
});

var wait_queue = [];
var match_pool = [];

io.sockets.on('connection', function(socket){
	socket.on('new_player', function(data, callback){
		var player = require('./server/model/player_class'); 
		var Player = new player.Player(data.id, data.name);
		Player.createUserIfNoneExists();

		if((wait_queue.length)%2 == 0){
			wait_queue.push(Player);
			console.log('wait_queue');
		} else {
			var old_player = wait_queue.shift();
			//match_pool.push(new Match(old_player, player));
			console.log('game_started');
		}
	});
});