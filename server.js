var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {

	console.log('Request was made: ' + req.url);
   
   if(req.url === '/') { 

      fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    }

    if(req.url.indexOf('.js') != -1) { 

      fs.readFile(__dirname + '/script.js', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });

    }

    if(req.url.indexOf('.css') != -1) { 

	  fs.readFile(__dirname + '/assets/style.css', function (err, data) {
	    if (err) console.log(err);
	    res.writeHead(200, {'Content-Type': 'text/css'});
	    res.write(data);
	    res.end();
	  });

    }
});

server.listen(3000);
console.log("Currently listening to port 3000");