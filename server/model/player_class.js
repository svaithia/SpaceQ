module.exports = {
  Player:  function(player_id, username){
		this.id = player_id;
		this.name = username;
		this.cumulativeScore = 0;

		this.updateCumulativeScore = function(incrementScore) { this.cumulativeScore += incrementScore; }

		this.createUserIfNoneExists = function(){
			var db = require('database').db;
			db.players.findAndModify({
			query: { id: player_id },
			update: {
				$setOnInsert: { id: player_id, name: username, cumulativeScore: 0 }
			},
			new: true,
			upsert: true
			})
			console.log("new user added to database");
		};
	}
};