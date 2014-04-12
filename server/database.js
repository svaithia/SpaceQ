module.exports = {
	get: function(){
		var mongoose = require('mongoose');
		var db = mongoose.connect('mongodb://admin:admin@dbh75.mongolab.com:27757/nasahackathon');

		mongoose.connection.once('connected', function() {
			console.log("Connected to database")
		});

		return db;
	}
}