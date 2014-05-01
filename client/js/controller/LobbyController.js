gameApp.controller('LobbyController', function($scope, $state){
	init();
	function init(){
		console.log('lobby');

		socket.on('new_player_matched', function(data, callback){
			// var current_state = getScope('wait') ? 'wait' : 'signin';
			// console.log('BOTH PLAYERS ARE HERE');
			$state.transitionTo('load');
			// changeState(current_state, 'load');
			// changeMessage('adsa','adsadsad');
		});

	}


});