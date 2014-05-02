gameApp.controller('LoadRoundResultController', function($scope, $state, fStatus) {
	(function(){
		var status = "";
		if(fStatus.getSelectedAnswer){
			status = 'You have selected ' + fStatus.getSelectedAnswer;
		} else {
			status = 'You did not select an answer!';
		}
		status += "Waiting for your oponent's response!";

		$scope.status = status;

		socket.on('ROUND_COMPLETED', function(req, callback){
			fStatus.setSelectedAnswer(null);
			$state.transitionTo('round_result');
		});

	})();
});