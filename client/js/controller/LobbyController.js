gameApp.controller('LobbyController', function($scope, $state){
	$scope.changeState = function(stateName) {
		console.log('going from ', 'MessageController', ' ', stateName);
		$state.transitionTo(stateName);
	}
});