gameApp.controller('RoundController', function($scope, $state, fQuestion, fStatus){
	(function(){
		var questionObj = fQuestion.getServerResponse();
		var question = questionObj.question;
		console.log(questionObj);
		var gameInfo = {
			round : questionObj.gameInfo.round + 1,
			timeLeft : "--",
			timeLeftPercent : "100",
			scoreA : questionObj.gameInfo.scoreA,
			scoreB : questionObj.gameInfo.scoreB
		};

			$scope.question = question;
			$scope.gameInfo = gameInfo;
			countdown(function(){
				// go to end of round

			});
	})();

	$scope.submitAnswer=function(chosenAnswer){
		fStatus.submitAnswer(chosenAnswer, function(response){
			console.log(response);
		});
	};

	function countdown(callback) {
		var bar = document.getElementById('progress'),
		time = 0, max = 10;
		int = setInterval(function() {
			$scope.gameInfo.timeLeftPercent = Math.floor(100 - time++ * max);
			$scope.gameInfo.timeLeft = max + 1 - time;
			$('.progress-bar').progressbar();
			$scope.$apply();
			if (time - 1 == max) {
				clearInterval(int);
				// 600ms - width animation time
				callback && setTimeout(callback, 600);
			}
		}, 1000);
	}
});

gameApp.factory('fStatus',  ["$q", "$window", "$rootScope",
    function($q, $window, $rootScope) {
    	var resolve = function(errval, retval, deferred) {
		    $rootScope.$apply(function() {
		        if (errval) {
			    	deferred.reject(errval);
		        } else {
			   		retval.connected = true;
		            deferred.resolve(retval);
		        }
		    });
	    };

    var serverResponseObj = {};
	return {
		submitAnswer: function(chosenAnswer, callback){
			var deferred = $q.defer();
			var params = {
				'chosen': chosenAnswer
			}
			socket.emit('check_answer', params, function(response){
				console.log(response);
				deferred.resolve(response);
				serverResponseObj = response;
				callback(response);
			});
		},
		getServerResponse : function(){
			return serverResponseObj;
		}
	};
}]);




// 	var rounds = 0;
// 	var questions = [];

// 	$scope.question = [];

// 	init();

// 	function init() {
// 		questions = sharedProperties.getQuestions();
// 		console.log(questions);
// //		setTimeout(function(){console.log($scope.questions);},6000);
// //		setTimeout(function(){console.log($scope.questions[0]);},6000);
// 	}

// 	$scope.getQuestion = function(round) {
// 		$scope.question = questions[round];
// 		console.log($scope.question);
// 	}

// 	$scope.startRound = function() {
// 		if (rounds == 5) {
// 			rounds = 0;
// 			$scope.gameOver();
// 		}
// 		else {
// 			// get new questions
// 			// change state to same state
// 			$scope.getQuestion(rounds);
// 			rounds++;
// 			countdown(function() {});
// 		}
// 	}

// 	$scope.gameOver = function() {
// 		$state.transitionTo('results');
// 	}

//     $scope.submitAnswer=function(chosenAnswer){
//     	var params = {
// 			'round': rounds-1,
// 			'chosen': chosenAnswer
// 		}

// 		socket.emit('check_answer', params, function(response){
// 			console.log(response);
// 		});
// 	}

// 	$scope.$watch('$viewContentLoaded', $scope.startRound());
