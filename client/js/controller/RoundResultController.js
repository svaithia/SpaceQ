gameApp.controller('RoundResultController', function($scope, $state, fStatus){
	(function(){
		var roundResultObject = fStatus.getRoundResultResponse();

		console.log(roundResultObject);

	})();
});