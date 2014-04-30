var socket = io.connect();

function userloggedin(id, username, name){
	var params = {id: id, username: username, name: name};
	socket.emit('new_player', params, function(response){
		if(response.success){
			var status = response.data.status;
			if(status == 'wait'){
				console.log('GO TO LOBBY');
				changeState('signin', 'lobby');
			}
			else if(status == 'play'){
				console.log('GO TO PLAY');
			}
		} else {
			changeState('signin', 'lobby', function(){
				console.log($('#wait').text());
			});
		}
	});
}

socket.on('new_player_result', function(data, callback){
	var current_state = typeof getScope('wait') === 'undefined' ? 'signin' : 'wait';
	changeState(current_state, 'load');
});

socket.on('SERVER', function(data, callback){
	console.log('aa');
});

socket.on('player_left', function(data, callback){
	$('#status').html("Your opponent, " + data.player.name +", just left.");
	console.log(data);
});

var gameApp = angular.module('gameApp', ['ui.router']);

gameApp.config(function($stateProvider) {

	$stateProvider

		// state for the home page
		.state('home', {
			url: "",
			controller: 'SignInController',
			templateUrl: 'views/partials/signin.html',
			css: '/css/style.css'
		})

		// state for the game lobby
		.state('lobby', {
			controller: 'LobbyController',
			templateUrl: 'views/partials/lobby.html',
			css: '/css/lobby.css'
		})

		.state('load', {
			controller: 'LoadController',
			templateUrl: 'views/partials/load.html',
			css: '/css/style.css'
		})		

		// state for playing the game
		.state('play', {
			controller: 'RoundController',
			templateUrl: 'views/partials/game.html',
			css: '/css/style.css'
		})

		// state for after game finish
		.state('results', {
//			controller: 'ScoreController',
			templateUrl: 'views/partials/results.html',
			css: '/css/results.css'
		})
});

gameApp.factory('qFactory', function($http) {
	var factory = {};
	var params = {};

	factory.getQuestions = function () {
		socket.emit('get_questions', params, function(response){
		});
	};

	return factory;
});

gameApp.service('sharedProperties', function () {
	var questions = [];

	return {
		getQuestions: function () {
			return questions;
		},
		setQuestions: function(qs) {
			questions = qs;
		}
	};
})

gameApp.controller('MainController', function($scope) {
	$scope.css="/css/style.css";

	$scope.$on('$stateChangeSuccess', function(event, toState) {
		$scope.css = toState.css;
	});
});

gameApp.controller('SignInController', function($scope, $state){
	$scope.changeState = function(stateName) {
		$state.transitionTo(stateName);
	}
	$scope.$watch('$viewContentLoaded', function() {
		loginbutton = document.getElementById('loginbutton');
		setTimeout("FB.XFBML.parse(loginbutton)", 1100);
	});
});


gameApp.controller('LobbyController', function($scope, $state){
	$scope.changeState = function(stateName) {
		$state.transitionTo(stateName);
	}
});

gameApp.controller('LoadController', function($scope, $state, qFactory, sharedProperties) {
	var questions = [];

	init();

	function init() {
		qFactory.getQuestions();
	}

	socket.on('get_questions_result', function(data, callback) {
		$scope.setQuestions(data.questions, function(stateName) {
			$scope.changeState(stateName);
		});
	});

	$scope.changeState = function(stateName) {
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

/*
gameApp.directive('backImg', function() {
	return function(scope, element, attrs) {
		attrs.$observe('backImg', function(value) {
			element.css({
				'background-image': 'url(' + value + ')'
			});
		});
	};
});
*/
function getScope(currId) {
	return angular.element(document.getElementById(currId)).scope();
}

function changeState(currId, stateName, fn_callback) {
	var scope = getScope(currId);
	scope.$apply(function() {
		scope.changeState(stateName);
	});
	
	if (fn_callback) {
		fn_callback();
	}
}

function startRound() {
	var scope = getScope('game');
	scope.$apply(function() {
		scope.startRound();
	});
}

// var controllers = {};
// controllers.GameController = function ($scope, gameFactory){
//     $scope.question = [];

//     init();

//     function init() {
//     	$scope.question = gameFactory.getQuestion();
//     	console.log("hi");
//     	alert('sd')
//     }

// }
/*
controllers.ScoreController = function ($scope) {
	$scope.playerAScore = 0;
	$scope.playerBScore = 0;
}

controllers.SignInController = function ($scope, cssInjector) {
	console.log("SignInController");

	$scope.MyCtrl = function()
    {
     	console.log("SignInController");
        cssInjector.add("css/style.css");
    }

}

gameApp.controller('SignInController', function ($scope, cssInjector) {
	console.log("SignInController");

	$scope.MyCtrl = function()
    {;
     	console.log("SignInController");
        cssInjector.add("css/style.css");
    }

});/**/
