gameApp.controller('LoadController', function($scope, $state, fQuestion) {
	(function(){
		$scope.loadQuestion = 'Matched! Loading questions from the server ... ';
		fQuestion.makeGetQuestionRequest(function(response){
			// Delay a couple of seconds
			var params = {};
			socket.emit('start_round', params, function(callback){
				if(callback.success){
					$state.transitionTo('round');
				}
			});
		});
	})();
});

