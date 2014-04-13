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
			}
		} else {
			$('#status').html(response.status);
		}
	});
}


socket.on('new_player_result', function(data, callback){
	console.log(data);
	$('#status').html("You just got matched! Let's play, your match is: " + data.challenger);

	var x;
	var r=confirm("Do you want to start playing with " + data.challenger);
	if (r==true){
		console.log('yes to playing game');
		socket.emit('start_game', [], function(response){
			
		});
	}
	else{
		console.log('no to playing game');

	}
	document.getElementById("demo").innerHTML=x;


});

socket.on('player_left', function(data, callback){
	$('#status').html("Your opponent, " + data.player.name +", just left.");
	console.log(data);
});

