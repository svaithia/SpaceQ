// function getScope(currId) {
// 	console.log('scope', currId);
// 	return angular.element(document.getElementById(currId)).scope();
// 	// return $('.ng-scope').scope();
// }

// function changeState(currId, stateName, fn_callback) {
// 	var scope = getScope(currId);
// 	scope.$apply(function() {
// 		scope.changeState(stateName);

// 		if (fn_callback) {
// 			console.log(fn_callback);
// 			fn_callback();
// 		}
// 	});
// }

// function startRound() {
// 	var scope = getScope('game');
// 	scope.$apply(function() {
// 		scope.startRound();
// 	});
// }