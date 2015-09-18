var express 	= require('express');
var app			= express();
var http 		= require('http').Server(app);
var htmlparser	= require('htmlparser');
var util		= require('util'); 				// Node util lib
var request		= require('request');
var cheerio		= require('cheerio');
var fs 			= require('fs');

var port		= 8000;

var tda497Url = 'http://ixdcth.se/courses/2015/tda497/schedule';
var fileName = './temp/tda497.html';

// Scrape urls and save to file system
app.get('/scrapensave', function(req, res) {
	var url = tda497Url;
	
	request(url, function(err, result, html) {
		if (err) {
			console.log('Error while scraping: ', err);
			res.status(500).send(err);
		}
		console.log(html);

		fs.writeFile(fileName, html, function(err) {
			if (err) {
				console.log('Error when writing file: ', err);
				res.status(500).send(err);
			}
			console.log('File written');
		});
	});
		res.send('Ok');	
});

app.get('/loadfromfile', function(req, res) {
	var html = loadHtmlFromFile(fileName);
	res.send(html);
});

function loadHtmlFromFile(fileName) {
	options = {encoding: 'utf8'}
	return fs.readFileSync(fileName, options);
}

function getScheduleHtmlForTDA497(html) {
	var $ = cheerio.load(html);

	var result = null;
	return result;
}

// Load html from file system and traverse 
app.get('/', function(req, res) {
	var url = tda497Url;

	request(url, function(err, result, html) {
		if (err) {
			console.log('Error while scraping: ', err);
		}
		
		var $ = cheerio.load(html);
		
		var courseName, courseCode;
		var json = {};

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

	});
});


http.listen(port, function(req, res) {
	console.log('Magic happens on 8000');
});

