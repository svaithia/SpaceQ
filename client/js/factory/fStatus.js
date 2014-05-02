gameApp.factory('fStatus',  ["$q", "$window", "$rootScope",
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

    var selectedAnswer = null;

    var roundResultResponse = null;

	return {
		makeSubmitAnswerRequest: function(chosenAnswer, callback){
			var deferred = $q.defer();
			var params = {
				'chosen': chosenAnswer
			}
			socket.emit('check_answer', params, function(response){
				deferred.resolve(response);
				serverResponseObj = response;
				callback(response);
			});
		},
		getSubmitAnswerResponse : function(){
			return serverResponseObj;
		},

		getSelectedAnswer : function(){
			return selectedAnswer;
		},

		setSelectedAnswer : function(answer){
			selectedAnswer = answer;
		},

		makeRoundResultRequest : function(){
			roundResultResponse = "";
		},

		getRoundResultResponse : function(){
			return roundResultResponse;
		},



	};
}]);