 var express = require("express");
 var app = express();
 var mongoose = require('mongoose');

 var port = process.env.PORT || 5000;
 
 // configuration ============
 app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

 // define model ================================================================
var Todo = mongoose.model('Todo', {
	text : String,
	done : Boolean
});

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/', function(req, res){
		res.sendfile('client/public/index.html')
	});

	 var port = process.env.PORT || 5000;
	 app.listen(port, function() {
	   console.log("Listening on " + port);
	 });

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('client/public/index.html')
 });
 


  app.get("/signin", function(req, res) {
    res.sendfile('client/public/signin.html')
 });