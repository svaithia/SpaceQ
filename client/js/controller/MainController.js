gameApp.controller('MainController', function($scope) {
	$scope.css="/css/style.css";

	$scope.$on('$stateChangeSuccess', function(event, toState) {
		$scope.css = toState.css;
	});
});