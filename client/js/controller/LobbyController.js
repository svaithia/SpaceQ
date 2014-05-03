gameApp.controller('LobbyController', function($scope, $state, fPlayers){
	init();
	function init(){
		console.log('lobby');

		socket.on('new_player_matched', function(data){
			// var current_state = getScope('wait') ? 'wait' : 'signin';
			// console.log('BOTH PLAYERS ARE HERE');
			$state.transitionTo('load');
			fPlayers.setOpponent(data.player);
			// changeState(current_state, 'load');
			// changeMessage('adsa','adsadsad');
		});

	}


});