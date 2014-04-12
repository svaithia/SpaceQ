exports.connect = function(callbackWithConnection){
	console.log('connect to database');
	// var mongoose = require('mongoose');
	// var db = mongoose.connect('mongodb://admin:admin@dbh75.mongolab.com:27757/nasahackathon');
	// return db;

	/*var MongoClient = require('mongodb').MongoClient
	MongoClient.connect(databaseURL + databaseName, function(err, db){

	});*/
}

exports.getTwentyRandomQuestions = function(callbackWithJson){
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

	    var collection = db.collection(collectionName);

			randomIntArray.forEach(function(entry, index) {
				collection.find({id: entry}).toArray(function(err, items){
				    console.log(items[0]);
				    results.push(items[0]);
				    if(index == 19){
							callbackWithJson(results);
				    }
				});
			});
	});
}	//end of getTwentyRandomQuestions()



var databaseURL = 'mongodb://admin:admin@dbh75.mongolab.com:27757/';
var databaseName = 'nasahackathon';
var collectionName = 'questions';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

