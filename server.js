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
var match_pool = new Object();
var users = [];
var match = 0;
var sockets_list = new Object();

io.sockets.on('connection', function(socket){
	socket.on('new_player', function(data, callback){
		var player = require('./server/model/player_class'); 
		var match = require('./server/model/match_class');

		var new_player = new player.Player(data.id, data.username, data.name);
		new_player.createUserIfNoneExists();

		if(true){
			sockets_list[new_player.id] = socket;
			users.push(new_player.id);
		}

		if((wait_queue.length)%2 == 0){
			wait_queue.push(new_player);
			var data = {position: wait_queue.length}
			callback({success: true, data: data, status: 'wait'});
			console.log('wait_queue');
		} else {
			var questions = [];
			var waiting_player = wait_queue.shift();
			match_pool[match] = new match.Match(waiting_player, new_player, questions, function(){
				delete match_pool[match];
 			});

			var data = {match_id: match};

			sockets_list[new_player.id].match_id = match;
			sockets_list[waiting_player.id].match_id = match;

			sockets_list[new_player.id].emit('new_player_result', { challenger: waiting_player.name }, function(data){ });
			sockets_list[waiting_player.id].emit('new_player_result',  { challenger: new_player.name}, function(data){ });

			//match_pool.push(new Match(old_player, player));
			console.log('game_started');
			callback({success: true, status:'play', data: data});
			match++; // increment match
		}
	});
	
	socket.on('disconnect', function(data, callback){

	});

});