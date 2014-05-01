// Signin Screen

gameApp.controller('SignInController', ['$scope', '$state','$location', 'Facebook',
    function($scope, $state, $location, Facebook /*we will write this factory next*/){
    
    $scope.login_fb = function(){
    	userloggedin('ID'+Math.random(), "U"+Math.random(), "FN"+Math.random());
    //    Facebook.login().then(function(response){
    //        // this is where we'll contact backend. for now just log response 
    //        FB.api('/me', function(userResponse) {
    //         		console.log(userResponse);
	//				userloggedin(response.id, response.username, response.first_name);
    //    		});

    //    });
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


gameApp.factory('Facebook', 
    ["$q", "$window", "$rootScope",
    function($q, $window, $rootScope) {
			 
		// since we are resolving a thirdparty response, 
	    // we need to do so in $apply   
		var resolve = function(errval, retval, deferred) {
		    $rootScope.$apply(function() {
		        if (errval) {
			    	deferred.reject(errval);
		        } else {
			   		retval.connected = true;
		            deferred.resolve(retval);
		        }
		    });
	    };

		var _login = function(){
		    var deferred = $q.defer();
	            //first check if we already have logged in
		    FB.getLoginStatus(function(response) {
		        if (response.status === 'connected') {
		            // the user is logged in and has authenticated your app
				    console.log("fb user already logged in", response);
				    deferred.resolve(response);
				} else {
				    // the user is logged in to Facebook, 
				    // but has not authenticated your app
				    FB.login(function(response){
				        if(response.authResponse){
					    	console.log("fb user logged in");
					   		resolve(null, response, deferred);
						}else{
						    console.log("fb user could not log in");
						    resolve(response.error, null, deferred);
						}
				    });
				 }
		     });
				
		     return deferred.promise;
		}

	return{
		login: _login,
	};
}]);