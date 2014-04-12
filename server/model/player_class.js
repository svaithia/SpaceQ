module.exports = {
  Player:  function(player_id, username){
		this.id = player_id;
		this.name = username;
		this.cumulativeScore = 0;
		console.log('new player', player_id, username);

		this.updateCumulativeScore = function(incrementScore) { this.cumulativeScore += incrementScore; }

		this.createUserIfNoneExists = function(){
			var db = require('../database').get;
			db.players.findAndModify({
			query: { id: player_id },
			update: {
				$setOnInsert: { id: this.id, name: this.name, cumulativeScore: this.cumulativeScore }
			},
			new: true,
			upsert: true
			})
			console.log("new user added to database");
		};
	}
};