function database(){
	var dbConnection = null;
	var databaseURL = 'mongodb://admin:admin@dbh75.mongolab.com:27757/';
	var databaseName = 'nasahackathon';
	var questionsCollection = 'questions';
	var playersCollection = 'players';

	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var object = {
		getDbConnection : function(callback)	{
			if(dbConnection == null){
				dbConnection = 0;
				console.log('NEW DB CONNECTION');
				var MongoClient = require('mongodb').MongoClient
				MongoClient.connect(databaseURL + databaseName, function(err, db){
					if (err) throw err;
					dbConnection = db;
					callback(db);
				});	
			}else{
				console.log('OLD DB CONNECTION');
				callback(dbConnection);
			}
		},//end of connect

		getQuestions : function(callback){
				this.getDbConnection(function(db){
					var min = 1;
					var max = 714; //number of entries in the database
					var randomIntArray = new Array();
					for(var i = 0; i < 20; i++){
						randomIntArray.push(getRandomInt(min, max));
					}	
					results = new Array();
			    var collection = db.collection(questionsCollection);

					randomIntArray.forEach(function(entry, index) {
						collection.find({id: entry}).toArray(function(err, items){
							  if (err) throw err;
						    console.log(items[0]);
						    results.push(items[0]);
						    if(index == 19){
									var rightAnswers = results.splice(0, 5);
									var wrongAnswers = results.splice(5, 20);
									callback(rightAnswers, wrongAnswers);
						    }
						});
					});	
				});//end of getDbConnection callback
		},//end of getQuestions

		updatePlayerInfo : function(player){
			this.getDbConnection(function(db){
				var collection = db.collection(playersCollection);	
				collection.update({id:player.id}, {id: player.id, name: player.name, cumulativeScore: player.cumulativeScore}, {upsert:true, w: 1}, function(){
					console.log('player info updated');
				});
			});
		}//end of updatePlayerInfo
	};//end of object definition

	return object;
}//end of function database()

module.exports = database();
