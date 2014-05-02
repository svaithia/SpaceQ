gameApp.controller('LoadController', function($scope, $state, fQuestion) {
	// (function init() {
	// 	// alert('ready to play'); // COMMENTING THIS WILL MAKE ONLY ONE PLAYER START THE GAME
	// 	socket.emit('get_questions', "", function(response){
	// 		console.log(response);
	// 		$scope.loadQuestion = "A";

	// 	});
	// })();

	(function(){
		$scope.loadQuestion = 'Matched! Loading questions from the server ... ';
		fQuestion.getQuestionFromServer(function(response){
			// Delay a couple of seconds
			
/* TODO*/
			// socket.emit('start_round', function(data, callback){
				// if(callback.success){
					$state.transitionTo('play');
				// }
			// });

		});

	})();
});

	// socket.on('get_questions_result', function(data, callback) {
	// 	$scope.setQuestions(data.questions, function(stateName) {
	// 		$scope.changeState(stateName);
	// 	});
	// });
	
	// $scope.changeState = function(stateName) {
	// 	console.log('going from ', 'MessageController', ' ', stateName);
	// 	$state.transitionTo(stateName);
	// }

	// $scope.setQuestions = function(qs, callback) {
	// 	questions = qs;
	// 	sharedProperties.setQuestions(questions);
	// 	if (callback) {
	// 		callback('play');
	// 	}
	// }

gameApp.factory('fQuestion',  ["$q", "$window", "$rootScope",
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
		getQuestionFromServer: function(callback){
			var deferred = $q.defer();
			var params = {};
			socket.emit('get_question', params, function(response){
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

// gameApp.factory('fQuestion', function($http) {
// 	var factory = {};
// 	var params = {};

// 	factory.getQuestions = function () {
// 		socket.emit('get_questions', params, function(response){
// 		});
// 	};

// 	return{
// 		login: _login,
// 	};

// });

// gameApp.service('sharedProperties', function () {
// 	var questions = [];

// 	return {
// 		getQuestions: function () {
// 			return questions;
// 		},
// 		setQuestions: function(qs) {
// 			questions = qs;
// 		}
// 	};
// })