var gameApp = angular.module('gameApp', ['ui.router']);

gameApp.config(function($stateProvider) {

	$stateProvider

		// state for the home page
		.state('home', {
			url: "",
			controller: 'SignInController',
			templateUrl: 'views/partials/signin.html'
		})

		// state for the game lobby
		.state('lobby', {
			controller: 'LobbyController',
			templateUrl: 'views/partials/lobby.html'
		})

		// state for playing the game
		.state('play', {
//			controller: 'GameController',
			templateUrl: 'views/partials/game.html'
		})

		// state for after game finish
		.state('results', {
//			controller: 'ScoreController',
			templateUrl: 'views/partials/results.html'
		})
});

gameApp.factory('gameFactory', function($http) {
	var db = require('../server/database.js');


	var question = [];

	var factory = {};
	factory.getQuestion = function() {
		return question;
	};

	factory.postQuestion = function(question) {

	};
});

gameApp.controller('SignInController', function($scope, $state){
	$scope.changeState = function(stateName) {
		$state.transitionTo(stateName);
	}
});


gameApp.controller('LobbyController', function($scope, $state){
	$scope.changeState = function(stateName) {
		$state.transitionTo(stateName);
	}
});

gameApp.controller('RoundController', function($scope, $state){
	$scope.roundOver = function() {
		// get new questions
		// change state to same state
		$state.transitionTo(stateName);
	}
});

function checkScope(currId) {
	return angular.element(document.getElementById(currId)).scope();
}

function changeState(currId, stateName) {
	var scope = angular.element(document.getElementById(currId)).scope();
	scope.$apply(function() {
		scope.changeState(stateName);
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