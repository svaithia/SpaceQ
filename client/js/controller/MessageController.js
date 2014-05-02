gameApp.controller('MessageController', function($scope, $state, fStatus){
	(function(){



	})();

	$scope.changeMessage = function(msgTitle, mainMessage){
		$scope.mainMsg = msgTitle;
		$scope.mainCauseMsg = mainMessage;
	}
});