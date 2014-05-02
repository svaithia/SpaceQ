gameApp.factory('fQuestion',  ["$q", "$window", "$rootScope",
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

    var serverResponseObj = {};
	return {
		makeGetQuestionRequest: function(callback){
			var deferred = $q.defer();
			var params = {};
			socket.emit('get_question', params, function(response){
				console.log(response);
				deferred.resolve(response);
				serverResponseObj = response;
				callback(response);
			});
		},
		getQuestionResponse : function(){
			return serverResponseObj;
		}
	};
}]);