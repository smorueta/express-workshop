var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonPath = __dirname + '/express-workshop/data/posts.json';
var parsedFile;

app.use(express.static("express-workshop/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-post', function(req, res) {
	readFile(req);
	res.redirect('/');
});	

app.get('/get-posts', function(req, res) {
	res.sendFile(jsonPath, parsedFile, function(error){});
	console.log(parsedFile);
});

function readFile(req) {
	fs.readFile(jsonPath, function (error, file) {
		parsedFile = JSON.parse(file);
		parsedFile[Date.now()] = req.body.blogpost;
		writeFile();
	});
}

function writeFile() {
	fs.writeFile(jsonPath, JSON.stringify(parsedFile),function(error){});
}

app.listen(3000, function() {
	console.log('server running');
});



