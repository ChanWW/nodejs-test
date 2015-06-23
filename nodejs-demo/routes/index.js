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
    /*  session support
    if(req.session.isVisit){
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    }
    else{
        req.session.isVisit = 1;
        res.send("欢迎第一次来这里");
        console.log(req.session);
    }
    */
});
module.exports = router;
