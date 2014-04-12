module.db {
	connect: function(){
		var mongoose = require('mongoose');
		var db = mongoose.connect('mongodb://admin:admin@dbh75.mongolab.com:27757/nasahackathon');
		return db;
	}
}