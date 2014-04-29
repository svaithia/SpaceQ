var socket = io.connect();

function userloggedin(id, username, name){
	var params = {id: id, username: username, name: name};
	socket.emit('new_player', params, function(response){
		console.log(response);
		if(response.success){
			if(response.status == 'wait'){
				$('#status').html('WAITING FOR ANOTHER PLAYER. CURRENTLY YOUR POSITION IS: ' + response.data.position + '.');
				changeState('signin', 'lobby');
			} else if(response.status == 'play'){
				$('#status').html('TIME TO PLAY. WE FOUND SOMEONE WAITING FOR YOU!');
				changeState('signin', 'play');
			}
		} else {
			changeState('signin', 'lobby', function(){
				// $('#wait').html('ERRRRRRRRRRROR');
				console.log($('#wait').text());
			});
			// console.log('ERRRRRRRRRRROR');
			// $('#wait').html('ERRRRRRRRRRROR');
		}
	});
}


socket.on('new_player_result', function(data, callback){
	console.log(data);
	$('#status').html("You just got matched! Let's play, your match is: " + data.challenger);
	// user logs in, another player is waiting in lobby, user skips lobby
	if (typeof getScope('wait') === 'undefined') {
		changeState('signin', 'play');
		countdown(function() {});
	}
	// otherwise, the user is waiting in the lobby, switch from lobby to game
	else {
		changeState('wait', 'play');
		countdown(function() {});
	}
});

socket.on('player_left', function(data, callback){
	$('#status').html("Your opponent, " + data.player.name +", just left.");
	console.log(data);
});