gameApp.factory('fPlayers',  ["$q", "$window", "$rootScope",
    function($q, $window, $rootScope) {
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

	 var me = {};
	 var opponent = {};

	return {
		setMe : function(playerObj){
			me = playerObj;
		},
		getMe : function(){
			return me;
		},
		setOpponent : function(playerObj){
			opponent = playerObj;
		},
		getOpponent : function(){
			return opponent;
		}
	};
}]);