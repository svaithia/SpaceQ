var socket = io.connect();

socket.on('player_left', function(data, callback){
	$('#status').html("Your opponent, " + data.player.name +", just left.");
	console.log(data);
});

// function userloggedin(id, username, name){
// 	var params = {id: id, username: username, name: name};
// 	socket.emit('new_player', params, function(response){
// 		if(response.success){
// 			var status = response.data.status;
// 			if(status == 'wait'){
// 				console.log('GO TO LOBBY');
// 				changeState('signin', 'lobby');
// 			}
// 			else if(status == 'play'){
// 				console.log('GO TO PLAY');
// 			}
// 		} else {
// 			changeState('signin', 'lobby', function(){
// 				console.log($('#wait').text());
// 			});
// 		}
// 	});
// }

// socket.on('new_player_matched', function(data, callback){
// 	var current_state = getScope('wait') ? 'wait' : 'signin';
// 	console.log('BOTH PLAYERS ARE HERE');
// 	changeState(current_state, 'load');
// 	// changeMessage('adsa','adsadsad');
// });
