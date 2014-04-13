var gameApp = angular.module('gameApp', ['ui.router']);

gameApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('signin', {
			url: '/',
			templateUrl: 'views/partials/signin.html'
		})

		// route for playing the game
		.state('play', {
			url: '/play',
			controller: 'GameController',
			templateUrl: 'views/partials/game.html'
		})

		// route for after game finish
		.state('results', {
			url: '/results',
			controller: 'ScoreController',
			templateUrl: 'views/partials/results.html'
		})
		
		.state("otherwise", {
			url: '/'
		});

		// use the HTML5 History API
//		$locationProvider.html5Mode(true);
}]);

gameApp.factory('gameFactory', function($http) {
	var db = require('path/to/database.js');


	var question = [];

	var factory = {};
	factory.getQuestion = function() {
		return question;
	};

	factory.postQuestion = function(question) {

	};
});

var controllers = {};
controllers.GameController = function ($scope, gameFactory){
    $scope.question = [];

    init();

    function init() {
    	$scope.question = gameFactory.getQuestion();
    }

/*    $scope.checkAnswer = function () {
    	$scope.questions.
    }*/
}

controllers.ScoreController = function ($scope) {
	$scope.playerAScore = 0;
	$scope.playerBScore = 0;
}

gameApp.controller(controllers);