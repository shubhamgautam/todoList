var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var htmlfile = "index.html";
var open = require('open');
/*var path = require('path');

app.configure(function () {
  app.use('/js', express.static(path.join(__dirname, '/js')));
  app.use('/images', express.static(path.join(__dirname, '/images')));
  app.use('/css', express.static(path.join(__dirname, '/css')));
  app.use(express.bodyParser());
  app.use(express.logger("short"));
});*/

app.get('/', function (request, response) {
  var html = fs.readFileSync(htmlfile).toString();
  response.send(html);
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Listening on " + port);
  open("http://localhost:8080");
});
