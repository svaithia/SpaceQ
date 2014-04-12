module.exports = {
	Round: function (playerA, playerB, qn){
		this.q = qn;
		this.timer = 10;
		this.playerAScore = 0;
		this.playerBScore = 0;
	
		this.start = function(){}; // call progress
		this.progress = function(){}; // logic
		this.end = function(){}; // end round (increment round1+
	}
}