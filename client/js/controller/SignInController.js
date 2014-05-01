gameApp.controller('SignInController', function($scope, $state){
	$scope.changeState = function(stateName) {
		console.log('going from ', 'MessageController', ' ', stateName);
		$state.transitionTo(stateName);
	}
	$scope.$watch('$viewContentLoaded', function() {
		loginbutton = document.getElementById('loginbutton');
		setTimeout("FB.XFBML.parse(loginbutton)", 1100);
	});
});