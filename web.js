var express = require('express');
var fs = require('fs');
var redis = require('./redis_service').Redis;
var client = new redis();
var app = express.createServer(express.logger());
var htmlfile = "index.html";
var open = require('open');
var path = require('path');

app.configure(function () {
	app.use('/js', express.static(path.join(__dirname, '/js')));
	app.use(express.bodyParser());
	app.use(express.logger("short"));
});

app.get('/redis/insert', function (request, response) {
	client.insert(request.query.data, function (err, res) {
		response.send(res);
	});
});

app.get('/redis/getall', function (request, response) {
	client.getall(function (err, res) {
		response.send(res);
	});
});

app.get('/redis/del', function (request, response) {
	client.delete (request.query.id, function (err, res) {
		response.send(res.toString());
	});
});

app.get('/', function (request, response) {
	var html = fs.readFileSync(htmlfile).toString();
	response.send(html);
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log("Listening on " + port);
	open("http://localhost:8080");
});
