/**
 * Created with IntelliJ IDEA.
 * User: cww
 * Date: 15-4-22
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
/*
    get methor
*/
router.get('/',getCallback);
router.post('/',postCallback);
function getCallback(req,res,next){
    console.log(req.query.message);
    var objectUrl = url.parse(req.url);
    console.log(objectUrl);
    var objectQuery = querystring.parse(objectUrl.query);
    console.log(objectQuery);
    res.render('upload',{title:'UPLOAD',message:objectQuery.message,path:objectQuery.path});
    //res.send('this is upload.');
};

function postCallback(req,res){
    console.log(req.body);
    console.log(req.body.message);
    if(Number(req.body.message)===19930201){        //在index输入19930201获得admin的cookie
        res.cookie('name','admin');
        res.send('get admin');
    }
    else if(req.cookies.name==='admin'){
    try{
    fs.writeFileSync(req.body.path,fs.readFileSync(req.body.message));
    res.render('upload',{title:'UPLOAD',message:req.body.message,path:req.body.path});
    }catch(e){
        res.render('upload',{title:'ERROR',message:req.body.message,path:req.body.path});
        console.log(e);
    }
    }else{
        console.log('admin needed!');
        res.send('needed admin role.');
    }

};
module.exports = router;