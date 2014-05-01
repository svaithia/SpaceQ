gameApp.controller('LoadController', function($scope, $state, qFactory, sharedProperties) {
	var questions = [];
	init();
	function init() {
		alert('ready to play'); // COMMENTING THIS WILL MAKE ONLY ONE PLAYER START THE GAME
		qFactory.getQuestions();
	}

	socket.on('get_questions_result', function(data, callback) {
		$scope.setQuestions(data.questions, function(stateName) {
			$scope.changeState(stateName);
		});
	});
	
	$scope.changeState = function(stateName) {
		console.log('going from ', 'MessageController', ' ', stateName);
		$state.transitionTo(stateName);
	}
	$scope.setQuestions = function(qs, callback) {
		questions = qs;
		sharedProperties.setQuestions(questions);
		if (callback) {
			callback('play');
		}
	}
});