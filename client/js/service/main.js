var socket = io.connect();

function userloggedin(id, username, name){
	var params = {id: id, username: username, name: name};
	socket.emit('new_player', params, function(response){
		console.log(response);
		if(response.success){
			if(response.status == 'wait'){
				$('#status').html('WAITING FOR ANOTHER PLAYER. CURRENTLY YOUR POSITION IS: ' + response.data.position + '.');
			} else if(response.status == 'play'){
				$('#status').html('TIME TO PLAY. WE FOUND SOMEONE WAITING FOR YOU!');
//				changeState('wait', 'play');
			}
		} else {
			$('#status').html(response.status);
		}
	});
}


socket.on('new_player_result', function(data, callback){
	console.log(data);
	$('#status').html("You just got matched! Let's play, your match is: " + data.challenger);
	// if a player is already waiting when user logs in, user skips lobby
	if (typeof checkScope('wait') === 'undefined') {
		changeState('signin', 'play');
	}
	// otherwise, the user is waiting in the lobby, switch from lobby to game
	else {
		changeState('wait', 'play');
	}
});

socket.on('player_left', function(data, callback){
	$('#status').html("Your opponent, " + data.player.name +", just left.");
	console.log(data);
});