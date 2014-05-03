gameApp.controller('RoundResultController', function($scope, $state, fStatus, fPlayers){
	(function(){
		var roundResultObject = fStatus.getRoundResultResponse();
		console.log(roundResultObject);
		var me = fPlayers.getMe();
		var opponent = fPlayers.getOpponent();
		console.log('me', me);
		console.log('opp', opponent);
		console.log('roundres', roundResultObject);

		$scope.me = me;
		$scope.me.score = '+ ' + roundResultObject.gameInfo.scoreA;

		$scope.opponent = opponent; 
		$scope.opponent.score = '+ ' + roundResultObject.gameInfo.scoreB;

		$scope.$apply();

		setTimeout(function(){
			$state.transitionTo('load');
		}, 2000)
	})();

});