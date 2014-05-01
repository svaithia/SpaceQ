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
		.state('message', {
			url: "",
			controller: 'MessageController',
			templateUrl: 'views/partials/message.html',
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