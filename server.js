var express 	= require('express');
var app			= express();
var http 		= require('http').Server(app);
var htmlparser	= require('htmlparser');
var util		= require('util'); 				// Node util lib
var request		= require('request');
var cheerio		= require('cheerio');


var port		= 8000;

var tda497Url = 'http://ixdcth.se/courses/2015/tda497/schedule'

app.get('/', function(req, res) {
	var url = tda497Url;

	request(url, function(err, result, html) {
		if (err) {
			console.log('Error while scraping: ', err);
		}
		
		var $ = cheerio.load(html);
		
		var courseName, courseCode;
		var json = {};

		/* parseHtml(html, function(parsedHtml) {
			var schedule = findSchedule(parsedHtml);
			res.json(parsedHtml);
		});
		*/

		$('#block-block-1').filter(function() {
			var data = $(this);
			courseCode = data.children().last().children().last().children().last().children().first().children().first().children().first().text();//;
			json.courseCode = courseCode;
		});
		/*
		$('.field-item').filter(function() {
			var data = $(this);
			// result = util.inspect(data, false, 6);
			
			// result = util.inspect(data.children().last(), false, 2);
			console.log(result);
			courseName = data.children().first().text();

			json.courseName = courseName;
		});
		*/

		// res.json(result);
		res.json(json);

	})
});




//var rawHtml = '<p>Blasdflasf</p>';
/*
// Init html parser
var handler = new htmlparser.DefaultHandler(function(err, dom) {
	if (err) {
		console.log('Error: ', err);
	} else {
		console.log('Parsing done');
	}
});
var parser = new htmlparser.Parser(handler);


function parseHtml(rawHtml, cb) {
	parser.parseComplete(rawHtml);
	// Print parsed html
	var parsedHtml = util.inspect(handler.dom, false, null);
	console.log(parsedHtml);
	cb(parsedHtml);
}

function findSchedule(html) {
	return html
}
*/

http.listen(port, function(req, res) {
	console.log('Magic happens on 8000');
});