var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonPath = __dirname + '/data/posts.json';
var parsedFile;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-post', function(req, res) {
	fs.readFile(jsonPath, function (error, file) {
		parsedFile = JSON.parse(file);
		parsedFile[Date.now()] = req.body.blogpost;
		writeFile();
	});
	res.redirect('/');
});	

app.get('/get-posts', function(req, res) {
	res.sendFile(jsonPath, parsedFile, function(error){});
	console.log(parsedFile);
});

app.get('/posts/:postId', function (req, res) {
	fs.readFile(jsonPath, function (error, file) {
		var parsedFile = JSON.parse(file);

		for (var key in parsedFile) {
			if (key === req.params.postId) {
				res.send('post id: ', parsedFile[key]);
			}
		}
	});
});

function writeFile() {
	fs.writeFile(jsonPath, JSON.stringify(parsedFile),function(error){});
}

app.listen(3000, function() {
	console.log('server running');
});



