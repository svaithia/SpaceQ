module.exports = {
  Player:  function(player_id, uname, player_name){
		var id = player_id;
		var username = uname;
		var name = player_name;
		var status = "WAIT";
		this.cumulativeScore = 0;
		var match = -1;

		this.updateCumulativeScore = function(incrementScore) { this.cumulativeScore += incrementScore; }

		this.createUserIfNoneExists = function(){
			// var db = require('../database').get;
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

		this.getId = function(){
			return id;
		}

		this.getUsername = function(){
			return username;
		}

		this.getName = function(){
			return name;
		}

		this.setStatus = function(s){
			status = s;
		}

		this.getStatus = function(){
			return status;
		}

		this.setMatchId = function(s){
			match = s;
		}

		this.getMatchId = function(){
			return match;
		}
	}
};