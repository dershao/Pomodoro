var express = require('express');

//express app
var app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

//listen to port number
app.listen(3000);
console.log("Listening to port 3000...");

//listening for requests using HTTP methods

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/assets/style.css', function(req, res) {
	res.sendFile(__dirname + '/assets/style.css');
});