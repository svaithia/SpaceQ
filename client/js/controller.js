var socket = io.connect();

function userloggedin(id, username, name){
	var params = {id: id, username: username, name: name};
	socket.emit('new_player', params, function(response){
		console.log(response);
		if(response.success){
			if(response.status == 'wait'){
				$('#status').html('WAITING FOR ANOTHER PLAYER. CURRENTLY YOUR POSITION IS: ' + response.data.position + '.');
				changeState('signin', 'lobby');
			} else if(response.status == 'play'){
				$('#status').html('TIME TO PLAY. WE FOUND SOMEONE WAITING FOR YOU!');
				changeState('signin', 'play');
			}
		} else {
			changeState('signin', 'lobby', function(){
				// $('#wait').html('ERRRRRRRRRRROR');
				console.log($('#wait').text());
			});
			// console.log('ERRRRRRRRRRROR');
			// $('#wait').html('ERRRRRRRRRRROR');
		}
	});
}

socket.on('new_player_result', function(data, callback){
	console.log(data);
	$('#status').html("You just got matched! Let's play, your match is: " + data.challenger);
	// user logs in, another player is waiting in lobby, user skips lobby
	if (typeof getScope('wait') === 'undefined') {
		changeState('signin', 'play');
		countdown(function() {});
	}
	// otherwise, the user is waiting in the lobby, switch from lobby to game
	else {
		changeState('wait', 'play');
		countdown(function() {});
	}
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

function getQuestionFromServer(){
	var params = {};
	socket.emit('get_questions', params, function(response){
		console.log(response);
	});
}

gameApp.factory('gameFactory', function($http) {
	socket.emit('get_questions', params, function(response){
		if(response.success == true){
			var question = response.qustions;
			var factory = {};

			factory.getQuestion = function() {
				return question;
			};

			factory.postQuestion = function(question) {

			};
		}
	});


});

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

gameApp.controller('RoundController', function($scope, $state){
	
	var rounds = 1;

	$scope.roundOver = function() {
		if (rounds == 1) {
			this.rounds = 0;
			$scope.gameOver();
		}
		else {
			// get new questions
			// change state to same state
			this.rounds++;
			countdown(function() {});
		}
	}

	$scope.gameOver = function() {
		$state.transitionTo('results');
	}
});

gameApp.directive('backImg', function() {
	return function(scope, element, attrs) {
		attrs.$observe('backImg', function(value) {
			element.css({
				'background-image': 'url(' + value + ')'
			});
		});
	};
});

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

function roundOver() {
	var scope = getScope('game');
	scope.$apply(function() {
		scope.roundOver();
	});
}

/*var controllers = {};
controllers.GameController = function ($scope, gameFactory){
    $scope.question = [];

    init();

    function init() {
    	$scope.question = gameFactory.getQuestion();
    	console.log("hi");
    }

/*    $scope.checkAnswer = function () {
    	$scope.questions.
    }
}

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

});

//gameApp.controller(controllers);*/


