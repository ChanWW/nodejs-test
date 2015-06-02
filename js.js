/*
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(8080);

console.log('Server running on port 8080.');
*/

var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/web'));

app.get('/', function (req, res) {
    res.redirect('/Home.html')
})

app.listen(8080, function () {
    console.log("app is listening at port 8080.");
});