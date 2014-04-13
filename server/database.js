function database(){
	var events = require('events');
	var eventEmitter = new events.EventEmitter();

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
					eventEmitter.emit('dbConnectionEstablished');
					callback(db);
				});	
			}else{
				console.log('OLD DB CONNECTION');
				if(dbConnection == 0){
					eventEmitter.on('dbConnectionEstablished', function(){
						callback(dbConnection);
					});
				}else{
					callback(dbConnection);
				}
			}
		},//end of connect

		getQuestions : function(callback){
				this.getDbConnection(function(db){
					var min = 1;
					var max = 714; //number of entries in the database
					qs = new Array();
			    var collection = db.collection(questionsCollection);
					// var randomIntArray = new Array();
					var questionsCounter = 0;
					for(var i = 0; i < 20; i++){
						// randomIntArray.push(getRandomInt(min, max));
						var randomId = getRandomInt(min, max);
						collection.find({id: randomId}).toArray(function(err, items){
							  if (err) throw err;
						    qs.push(items[0]);
						    questionsCounter = questionsCounter + 1;
						    if(questionsCounter == 20){
									var questions = [
										{id: qs[0].id, img: qs[0].img, options:[ qs[0].answer, qs[5].answer, qs[6].answer, qs[7].answer ]},
										{id: qs[1].id, img: qs[1].img, options:[ qs[1].answer, qs[8].answer, qs[9].answer, qs[10].answer ]},
										{id: qs[2].id, img: qs[2].img, options:[ qs[2].answer, qs[11].answer, qs[12].answer, qs[13].answer ]},
										{id: qs[3].id, img: qs[3].img, options:[ qs[3].answer, qs[14].answer, qs[15].answer, qs[16].answer ]},
										{id: qs[4].id, img: qs[4].img, options:[ qs[4].answer, qs[17].answer, qs[18].answer, qs[19].answer ]}
										];
									console.log('calling callback');
									callback(questions);
						    }
						});
					}//end of for loop
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
