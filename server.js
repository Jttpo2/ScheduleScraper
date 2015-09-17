var http 		= require('http');
var express 	= require('express');
var app			= express();

app.get('/', function() {
	res.send 'Gotcha'
});

http.createServer(function(req, res) {

	res.writeHead(200, {'Content-Type': 'Text/plain'});
	res.end('Tja!\n');
}).listen(8000);
console.log('Magic happens on 8000');