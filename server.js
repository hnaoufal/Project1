var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
	return stylus(str).set('filename',path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(stylus.middleware(
	{
	src: __dirname + '/public',
	compile: compile
}
));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/mean');

var db = mongoose.connection;
db.on('error', console.error.bind (console, 'connection error....'));
db.once('open', function callback(){

	console.log('mean database opened');
});

app.get('/partials/:partialPath', function(req,res){

	res.render('partials/'+req.params.partialPath);
});

app.get('*', function(req,res){
	res.render('index');
});

var port = 38000;
app.listen(port);

console.log('Listening on port ' + port + '...');

