var gameApp = angular.module('gameApp', ['ngRoute']);

gameApp.config(function ($routeProvider) {
	$routeProvider
		.when('/play',
			{
				controller: 'GameController',
				templateUrl: 'game.html'
			})
		.otherwise({ redirectTo: '/' });
});

var controllers = {};
controllers.GameController = function ($scope){
    $scope.questions = [];
    $scope.checkAnswer = function () {
    	$scope.questions.
    }
}

gameApp.controller(controllers);