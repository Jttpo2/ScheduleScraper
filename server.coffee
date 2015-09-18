express 	= require('express')
app			= express()
http 		= require('http').Server(app)
htmlparser	= require('htmlparser')
util		= require('util') 				# Node util lib
request		= require('request')
cheerio		= require('cheerio')
fs 			= require('fs')

port		= 8000

tda497Url 	= 'http://ixdcth.se/courses/2015/tda497/schedule'
fileName 	= './temp/tda497.html'

# Scrape urls and save to file system
app.get '/scrapensave', (req, res) ->
	url = tda497Url
	
	request url, (err, result, html) -> 
		if err
			console.log('Error while scraping: ', err)
			res.status(500).send(err)
		console.log(html)

		fs.writeFile fileName, html, (err) ->
			if err
				console.log 'Error when writing file: ', err
				res.status(500).send err
			console.log 'File written'
	
		res.send 'Ok'


app.get '/loadfromfile', (req, res) ->
	html = loadHtmlFromFile fileName
	res.send html

loadHtmlFromFile = (fileName) ->
	options = {encoding: 'utf8'}
	fs.readFileSync fileName, options

getScheduleHtmlForTDA497 = (html) ->
	$ = cheerio.load html

	result = null
	return result



# Load html from file system and traverse 
app.get '/', (req, res) ->
	url = tda497Url

	request url, (err, result, html) ->
		if err
			console.log 'Error while scraping: ', err
		
		$ = cheerio.load(html)
		
		courseName = null
		courseCode = null
		json = {}

		$('#block-block-1').filter () ->
			data = $(this)
			courseCode = data.children().last().children().last().children().last().children().first().children().first().children().first().text()#
			json.courseCode = courseCode
		
		
		###
		$('.field-item').filter(() {
			data = $(this)
			# result = util.inspect(data, false, 6)
			
			# result = util.inspect(data.children().last(), false, 2)
			console.log(result)
			courseName = data.children().first().text()

			json.courseName = courseName
		})
		###
		# res.json(result)
		res.json json



http.listen port, (req, res) ->
	console.log 'Magic happens on 8000'
