var Player = function(player_id, username){
	this.id = player_id;
	this.name = username;
	this.cumulativeScore = 0;

	this.updateCumulativeScore = function(incrementScore) { this.cumulativeScore += incrementScore; }
}