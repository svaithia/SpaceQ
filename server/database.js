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
					var max = 713; //number of entries in the database
					qs = new Array();
			   		var collection = db.collection(questionsCollection);
					var questionsCounter = 0;
					for(var i = 0; i < 20; i++){
						var randomId = getRandomInt(min, max);
						collection.find({id: randomId}).toArray(function(err, items){
							  if (err) throw err;
						    qs.push(items[0]);
						    questionsCounter = questionsCounter + 1;
						    if(questionsCounter == 20){
						    	var option_0 = [ qs[0].answer, qs[5].answer, qs[6].answer, qs[7].answer ];
						    	var option_1 = [ qs[1].answer, qs[8].answer, qs[9].answer, qs[10].answer ];
						    	var option_2 = [ qs[2].answer, qs[11].answer, qs[12].answer, qs[13].answer ];
						    	var option_3 = [ qs[3].answer, qs[14].answer, qs[15].answer, qs[16].answer ];
						    	var option_4 = [ qs[4].answer, qs[17].answer, qs[18].answer, qs[19].answer ];

								var answers = [qs[0].answer, qs[1].answer, qs[2].answer, qs[3].answer, qs[4].answer];

								var questions = [
									{id: qs[0].id, img: qs[0].img, options:shuffle(option_0)},
									{id: qs[1].id, img: qs[1].img, options:shuffle(option_1)},
									{id: qs[2].id, img: qs[2].img, options:shuffle(option_2)},
									{id: qs[3].id, img: qs[3].img, options:shuffle(option_3)},
									{id: qs[4].id, img: qs[4].img, options:shuffle(option_4)}
								];

								callback(questions, answers);
						    }
						});//end of collection.find
					}//end of for loop
				});//end of getDbConnection callback
		},//end of getQuestions

		checkAnswer : function(id, answer, callback){
			var collection = db.collection(questionsCollection);
			collection.find({id: id}).toArray(function(err, items){
				if (err) throw err;
				if(items[0].answer == answer){
					callback(true);
				}else{
					callback(false);
				}
			});//end of collection.find
		},//end of checkAnswer

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

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

module.exports = database();
