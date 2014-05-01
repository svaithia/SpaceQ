
gameApp.controller('RoundController', function($scope, $state, sharedProperties){
	
	var rounds = 0;
	var questions = [];

	$scope.question = [];

	init();

	function init() {
		questions = sharedProperties.getQuestions();
		console.log(questions);
//		setTimeout(function(){console.log($scope.questions);},6000);
//		setTimeout(function(){console.log($scope.questions[0]);},6000);
	}

	$scope.getQuestion = function(round) {
		$scope.question = questions[round];
		console.log($scope.question);
	}

	$scope.startRound = function() {
		if (rounds == 5) {
			rounds = 0;
			$scope.gameOver();
		}
		else {
			// get new questions
			// change state to same state
			$scope.getQuestion(rounds);
			rounds++;
			countdown(function() {});
		}
	}

	$scope.gameOver = function() {
		$state.transitionTo('results');
	}

    $scope.submitAnswer=function(chosenAnswer){
    	var params = {
			'round': rounds-1,
			'chosen': chosenAnswer
		}

		socket.emit('check_answer', params, function(response){
			console.log(response);
		});
	}

	$scope.$watch('$viewContentLoaded', $scope.startRound());

});