gameApp.controller('MessageController', function($scope, $state){
	$scope.changeState = function(stateName) {
		console.log('going from ', 'MessageController', ' ', stateName);
		$state.transitionTo(stateName);
	}
	$scope.changeMessage = function(msgTitle, mainMessage){
		$scope.mainMsg = msgTitle;
		$scope.mainCauseMsg = mainMessage;
	}
});