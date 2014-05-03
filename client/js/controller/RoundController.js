gameApp.controller('RoundController', function($scope, $state, fQuestion, fStatus){

	(function(){
		console.log('RoundController');
		var questionObj = fQuestion.getQuestionResponse();
		var question = questionObj.question;
		console.log(questionObj);
		var gameInfo = {
			round : questionObj.gameInfo.round + 1,
			timeLeft : 10,
			timeLeftPercent : 100,
			scoreA : questionObj.gameInfo.scoreA,
			scoreB : questionObj.gameInfo.scoreB
		};

		$scope.question = question;
		$scope.gameInfo = gameInfo;
		countdown(function(){
			// go to end of round
			if(!answerSubmited){
				$scope.submitAnswer("");
			}
			answerSubmited = false;
		});

	})();

	var answerSubmited = false;
	
	$scope.submitAnswer=function(chosenAnswer){
		fStatus.makeSubmitAnswerRequest(chosenAnswer, function(response){
			answerSubmited = true;
			console.log(response);
			// decide which screen to go to result question OR wait for other player's response
			fStatus.setSelectedAnswer(chosenAnswer);
			if(response.status == 'ROUND_COMPLETED'){
				fStatus.makeRoundResultRequest(function(){
					$state.transitionTo('round_result');
				});
			} else if(response.status == 'SCORE_WAITING'){
				$state.transitionTo('load_round_result');
			}
		});
	};

	function countdown(callback) {
		var bar = document.getElementById('progress'),
			time = 0, 
			max = 10;
		
		int = setInterval(function() {
			$scope.gameInfo.timeLeftPercent = Math.floor(100 - (time++) * max);
			$scope.gameInfo.timeLeft = max + 1 - time;
			// $('.progress-bar').progressbar();
			$scope.$apply();
			if (time - 1 == max) {
				clearInterval(int);
				// 600ms - width animation time
				callback && setTimeout(callback, 600);
			}
		}, 1000);
	}
});