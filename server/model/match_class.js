module.exports = {
	Match: function(playerA, playerB, questions, deleteCallback) {
		this.pA = playerA; 
		this.pB = playerB;
		this.qs = questions; // 5 question elements
		this.playerAScore = 0;
		this.playerBScore = 0;

		this.start = function(){}; // call progress - create 5 rounds using the questions
		this.progress = function(){}; // call the five questions
		this.end =  function(){deleteCallback()}; // update leaderboard - declareWinner - (rematch/find another buttons)
	}

}