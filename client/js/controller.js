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
		.state('round', {
			url: "",
			controller: 'RoundController',
			templateUrl: 'views/partials/round.html',
			css: '/css/style.css'
		})
		// ROUND RESULT
		.state('round_result', {
			url: "",
			controller: 'RoundResultController',
			templateUrl: 'views/partials/round_result.html',
			css: '/css/style.css'
		})
		.state('load_round_result', {
			url: "",
			controller: 'LoadRoundResultController',
			templateUrl: 'views/partials/load_round_result.html',
			css: '/css/style.css'
		})
		// FINAL GAME RESULT
		.state('game_results', {
			url: "",
			controller: 'GameResultsController',
			templateUrl: 'views/partials/results.html',
			css: '/css/results.css'
		})
		// ERROR / MESSAGE
		.state('message', {
			url: "",
			controller: 'MessageController',
			templateUrl: 'views/partials/message.html',
			css: '/css/style.css'
		})
});