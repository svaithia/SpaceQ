var express = require("express"),
	app = express(),
	mongoose = require('mongoose'),
	R_PLAYER = require('./server/model/player_class'),
	path = require('path'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	db = require('./server/database'),
	R_MATCH = require('./server/model/match_class');

app.use(express.static(path.join(__dirname, 'client')));

// uncomment following line to see the twenty random questions in console
// db.getQuestions(function(questions){
// 	console.log(questions[0].options);
// });

var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);
});


/* serves main page */
app.get("/", function(req, res) {
	var filepath = path.resolve('client/views/index.html');
    res.sendfile(filepath);
});

var wait_queue = [];
var match_pool = new Object();
var users = [];
var matchCounter = 0;
var sockets_list = new Object(); 
// list of socket{ 'player_id'}
// sockets_list { 'player_id'}

io.sockets.on('connection', function(socket){
	socket.on('new_player', function(req, callback){
		var new_player = new R_PLAYER.Player(req.id, req.username, req.name);

		if(users.indexOf( new_player.getId() ) == -1){ ////// MULTIPLE GAMES ////// MULTIPLE GAMES ////// MULTIPLE GAMES
			users.push(new_player.getId());
			socket.player = new_player;
			sockets_list[new_player.getId()] = socket;

			var returnObj = { success: false };

			if((wait_queue.length)%2 == 0){
				wait_queue.push(new_player);
				new_player.setStatus('wait');

				returnObj.success = true;
				returnObj.player = new_player;
				returnObj.status = socket.status;
				returnObj.data = {	position: wait_queue.length, 
									status: new_player.getStatus() };
				callback(returnObj); // seperate for db callback
			}
			else {
				var waiting_player = wait_queue.shift();
				sockets_list[new_player.getId()] = socket;
				db.getQuestions(function(questions, answers){
				//questions format [{id:id, img:url, options:[option1, option2, option3, option4] X 5]

					var match = new R_MATCH.Match(waiting_player, new_player, questions, answers, function(){
						delete match_pool[matchCounter];
				 	});
				 	match_pool[matchCounter] = match;

					new_player.setMatchId(matchCounter);
					waiting_player.setMatchId(matchCounter);

					sockets_list[new_player.getId()].join(matchCounter);
					sockets_list[waiting_player.getId()].join(matchCounter);

					// sockets_list[new_player.getId()].emit('new_player_result', { challenger: waiting_player.name }, function(data){ });
					// sockets_list[waiting_player.getId()].emit('new_player_result',  { challenger: new_player.name }, function(data){ });

					new_player.setStatus('play');
					waiting_player.setStatus('play');

					matchCounter++; // increment match

					returnObj.success = true;
					returnObj.player = new_player;
					returnObj.status = new_player.status;
					returnObj.data = {	playerA: waiting_player,
										playerB: new_player,
										match_id: new_player.getMatchId(),
										status: new_player.getStatus()	};

					sockets_list[waiting_player.getId()].emit('new_player_matched',  returnObj, function(data){ });
					// io.sockets.in(waiting_player.getMatchId()).emit('new_player_matched', returnObj);
					callback(returnObj); // seperate for db callback
				});
			}
			
		} // new player (not same session)
		else {
			callback({success: false, status:"You can't start two sessions at once."});
		}
	});
	
	socket.on('disconnect', function () {
		if(!socket.player){
			console.log('lurker');
			return;
		} else if(socket.player.getStatus() == 'wait'){
			var index = users.indexOf(socket.player.getId());
			if(index != -1){
				users.splice(index, 1);
			}
			var wait_list_index = wait_queue.indexOf(socket.player);
			if(wait_list_index != -1){
				wait_queue.splice(wait_list_index,1);
			}

		} else{
			console.log('signed in user');
			var room = socket.player.getMatchId();
			socket.broadcast.to(room).emit('player_left', {status: 'Player disconnected', player: socket.player});
			console.log(room);
		}
	});


	socket.on('get_question', function (req, callback) {
		var returnObj = new Object();
		returnObj.success = true;
		var player_match_id = socket.player.getMatchId();
		var matchObj = match_pool[player_match_id];

		var gameInfo = {
			round : matchObj.getRound()
		};

		returnObj.question = matchObj.getQuestion();
		returnObj.gameInfo = gameInfo;

		callback(returnObj);
	});

	socket.on('check_answer', function(req, callback){
		var returnObj = new Object();
		returnObj.success = true;
		var player_match_id = socket.player.getMatchId();

		var matchObj = match_pool[player_match_id];
		returnObj.answer_result = matchObj.checkAnswer(req.round, req.chosen);
		returnObj.answer_list = matchObj.getAnswers();
		if(returnObj.answer_result){
			// increment game score for player based on time

		} else {

		}
		callback(returnObj);
	});

}); // connection



// socket.player = PLAYER 