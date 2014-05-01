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
			url: "",
			controller: 'LobbyController',
			templateUrl: 'views/partials/lobby.html',
			css: '/css/lobby.css'
		})
		.state('load', {
			url: "",
			controller: 'LoadController',
			templateUrl: 'views/partials/load.html',
			css: '/css/style.css'
		})		
		// state for playing the game
		.state('play', {
			url: "",
			controller: 'RoundController',
			templateUrl: 'views/partials/game.html',
			css: '/css/style.css'
		})
		// state for after game finish
		.state('results', {
			url: "",
			controller: 'ScoreController',
			templateUrl: 'views/partials/results.html',
			css: '/css/results.css'
		})
});