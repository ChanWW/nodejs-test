var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.name){
    res.render('index', { title: 'ChanWW nodejs webapp','name':req.cookies.name });
    }
    else{
        res.cookie('name','visitor');
        res.send("welcome! first visited.")
    }
});

module.exports = router;
