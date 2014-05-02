gameApp.controller('LoadRoundResultController', function($scope, $state, fStatus) {
	(function(){
		console.log('LoadRoundResultController');
		var status = "";
		var userSelectedAnswer = fStatus.getSelectedAnswer(); 
		if(userSelectedAnswer){
			status = 'You have selected ' + userSelectedAnswer + '.';
		} else {
			status = 'You did not select an answer!';
		}
		status += "Waiting for your oponent's response!";

		$scope.status = status;

		socket.on('ROUND_COMPLETED', function(req, callback){
			fStatus.setSelectedAnswer(null);
			fStatus.makeRoundResultRequest(function(){
					$state.transitionTo('round_result');
			});
		});

	})();
});