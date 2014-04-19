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
			css: '/css/style.css'
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
});


gameApp.controller('LobbyController', function($scope, $state){
	$scope.changeState = function(stateName) {
		$state.transitionTo(stateName);
	}
});

gameApp.controller('RoundController', function($scope, $state){
	
	var rounds = 0;

	$scope.roundOver = function() {
		if (rounds == 5) {
			rounds = 0;
			$scope.gameOver();
		}
		else {
			// get new questions
			// change state to same state
			$state.transitionTo('play');
			rounds++;
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

function changeState(currId, stateName) {
	var scope = getScope(currId);
	scope.$apply(function() {
		scope.changeState(stateName);
	});
}

function roundOver() {
	var scope = getScope('main_game');
	scope.$apply(function() {
		scope.roundOver();
	})
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