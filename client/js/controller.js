var gameApp = angular.module('gameApp', ['ngRoute', 'angular.css.injector']);

gameApp.config(function($routeProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			controller: 'SignInController',
			templateUrl: 'views/partials/signin.html'
		})

		.when('/lobby', {
			templateUrl: 'views/partials/lobby.html'
		})

		// route for playing the game
		.when('/play', {
			controller: 'GameController',
			templateUrl: 'views/partials/game.html'
		})

		// route for after game finish
		.when('/results', {
			controller: 'ScoreController',
			templateUrl: 'views/partials/results.html'
		})
		
		.otherwise({
			redirectTo: '/'
		});

		// use the HTML5 History API
//		$locationProvider.html5Mode(true);
});

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
    	console.log("hi");
    }

/*    $scope.checkAnswer = function () {
    	$scope.questions.
    }*/
}

controllers.ScoreController = function ($scope) {
	$scope.playerAScore = 0;
	$scope.playerBScore = 0;
}

/*controllers.SignInController = function ($scope, cssInjector) {
	console.log("SignInController");

	$scope.MyCtrl = function()
    {
     	console.log("SignInController");
        cssInjector.add("css/style.css");
    }

}*/

gameApp.controller('SignInController', function ($scope, cssInjector) {
	console.log("SignInController");

	$scope.MyCtrl = function()
    {
     	console.log("SignInController");
        cssInjector.add("css/style.css");
    }

});

//gameApp.controller(controllers);