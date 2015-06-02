var express = require('express');
var url = require('url');
var querystring = require('querystring');
var fibonacci = require('../service/fibonacci')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    try{
//        var objectUrl = url.parse(req.url);
//        var objectQuery = querystring.parse(objectUrl.query);
//        var fib = fibanacci(objectQuery.n);
//        res.send('fibanacci '+objectQuery.n+'='+fib+'.');
        var n = Number(req.query.n);
        res.send('fibonacci '+n+'='+fibonacci(n)+'.');
    }catch(e)
    {
        res.status(500).send(e.message);
    }
});

module.exports = router;
