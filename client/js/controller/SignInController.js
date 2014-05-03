// Signin Screen

gameApp.controller('SignInController', ['$scope', '$state','$location', 'fFacebook', 'fPlayers', 
    function($scope, $state, $location, fFacebook, fPlayers){
    
    $scope.login_fb = function(){
    	var me = {id: 'ID'+Math.random(), username: "U"+Math.random(), name: "FN"+Math.random()}

		fPlayers.setMe(me);
		userloggedin(me.id, me.username, me.name);

     //   fFacebook.login().then(function(response){
     //       // this is where we'll contact backend. for now just log response 
     //       FB.api('/me', function(userResponse) {
     //        		console.log(userResponse);
     //        		console.log(JSON.stringify(userResponse));
					// userloggedin(response.id, response.username, response.first_name);
     //   		});

     //   });
    }

    var userloggedin = function userloggedin(id, username, name){
		var params = {id: id, username: username, name: name};
		socket.emit('new_player', params, function(response){
			if(response.success){
				var status = response.data.status;
				if(status == 'wait'){
					console.log('GO TO LOBBY');
					$state.transitionTo('lobby');
				}
				else if(status == 'play'){
					console.log('GO TO PLAY');
					fPlayers.setOpponent(response.player);
					$state.transitionTo('load');
				}
			} else {
				// changeState('signin', 'lobby', function(){
				// 	console.log($('#wait').text());
				// });
			}
		});
	}


}]);


	// $scope.changeState = function(stateName) {
	// 	console.log('going from ', 'MessageController', ' ', stateName);
	// 	$state.transitionTo(stateName);
	// }

	// $scope.$watch('$viewContentLoaded', function() {
	// 	loginbutton = document.getElementById('loginbutton');
	// 	setTimeout("FB.XFBML.parse(loginbutton)", 1100);
	// });


