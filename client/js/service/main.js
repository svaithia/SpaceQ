var socket = io.connect();

function userloggedin(id, username, name){
	var params = {id: id, name: username};
	socket.emit('new_player', params, function(response){
		console.log(response);
		if(response.status == 'wait'){
			$('#status').html('WAITING FOR ANOTHER PLAYER. CURRENTLY YOUR POSITION IS: ' + response.data.position + '.');
		} else if(response.status == 'play'){
			$('#status').html('TIME TO PLAY. WE FOUND SOMEONE WAITING FOR YOU!');
		} else {
			$('#status').html('THERE IS A PROBLEM');
		}
	});
}

socket.on('new_player_result', function(data, callback){
	$('#status').html("You just got matched! Let's play, your match is: " + data.challenger);
	alert('changed');
});