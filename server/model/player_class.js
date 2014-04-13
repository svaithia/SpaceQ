module.exports = {
  Player:  function(player_id, username, name){
		this.id = player_id;
		this.username = username
		this.name = name;
		this.cumulativeScore = 0;
		console.log('new player', player_id, username);

		this.updateCumulativeScore = function(incrementScore) { this.cumulativeScore += incrementScore; }

		this.createUserIfNoneExists = function(){
			var db = require('../database').get;
			console.log(db);
			console.log("createUserIfNoneExistsSTART");
			// db.players.findAndModify({
			// query: { id: player_id },
			// update: {
			// 	$setOnInsert: { id: this.id, name: this.name, cumulativeScore: this.cumulativeScore }
			// },
			// new: true,
			// upsert: true
			// });
			console.log("new user added to database");
		};
	}
};