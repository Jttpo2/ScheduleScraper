var express 	= require('express');
var app			= express();
var http 		= require('http').Server(app);

var port		= 8000;

app.get('/', function() {
	res.send('Gotcha');
});






http.listen(port, function(req, res) {
	console.log('Magic happens on 8000');
});