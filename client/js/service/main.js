	var socket = io.connect();

function userloggedin(id, username){
	var params = {id: id, name: username};
	socket.emit('new_player', params, function(data){
		console.log('passed');
	});
}