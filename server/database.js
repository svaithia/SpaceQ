exports.connect = function(callback){
	var MongoClient = require('mongodb').MongoClient
	MongoClient.connect(databaseURL + databaseName, function(err, db){
		if (err) throw err;
		callback(db);
	});
}

exports.getQuestions = function(callback){ //pass in a callback with two parameters, one will have 5 questions and one will have 15 questions
	var MongoClient = require('mongodb').MongoClient

	var min = 1;
	var max = 714; //number of entries in the database
	var randomIntArray = new Array();
	for(var i = 0; i < 20; i++){
		randomIntArray.push(getRandomInt(min, max));
	}

	var results = new Array();
	MongoClient.connect(databaseURL + databaseName, function(err, db){
	    if (err) throw err;

	    var collection = db.collection(questionsCollection);

			randomIntArray.forEach(function(entry, index) {
				collection.find({id: entry}).toArray(function(err, items){
				    console.log(items[0]);
				    results.push(items[0]);
				    if(index == 19){

							var rightAnswers = results.splice(0, 5);
							var wrongAnswers = results.splice(5, 20);
							callback(rightAnswers, wrongAnswers);
				    }
				});
			});
	});
}	//end of getTwentyRandomQuestions()


exports.PlayerDb = function(){
	this.createUserIfNoneExists = function(){
		console.log('create user');
	}//end of createUserIfNoneExists
}//end of Player object

var databaseURL = 'mongodb://admin:admin@dbh75.mongolab.com:27757/';
var databaseName = 'nasahackathon';
var questionsCollection = 'questions';
var playersCollection = 'players';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
