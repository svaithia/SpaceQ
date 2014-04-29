// var socket = io.connect();

// function userloggedin(id, username, name){
// 	var params = {id: id, username: username, name: name};
// 	socket.emit('new_player', params, function(response){
// 		console.log(response);
// 		if(response.success){
// 			if(response.status == 'wait'){
// 				$('#status').html('WAITING FOR ANOTHER PLAYER. CURRENTLY YOUR POSITION IS: ' + response.data.position + '.');
// 				changeState('signin', 'lobby');
// 			} else if(response.status == 'play'){
// 				$('#status').html('TIME TO PLAY. WE FOUND SOMEONE WAITING FOR YOU!');
// 				changeState('signin', 'play');
// 			}
// 		} else {
// 			changeState('signin', 'lobby', function(){
// 				// $('#wait').html('ERRRRRRRRRRROR');
// 				console.log($('#wait').text());
// 			});
// 			// console.log('ERRRRRRRRRRROR');
// 			// $('#wait').html('ERRRRRRRRRRROR');
// 		}
// 	});
// }
// socket.on('player_left', function(data, callback){
// 	$('#status').html("Your opponent, " + data.player.name +", just left.");
// 	console.log(data);
// });
