/**
 * Created with IntelliJ IDEA.
 * User: cww
 * Date: 15-4-23
 * Time: 下午4:50
 * To change this template use File | Settings | File Templates.
 */

var express = require("express");
var router = express.Router();
var pachong = require('../service/pachong');
var superagent = require("superagent");
var cheerio = require("cheerio");
var url = require("url");
var eventproxy = require("eventproxy");
var ep = new eventproxy();
var async = require("async");

router.get("/",function(req,res,next){
    //       debugger;
    var items= pachong("http://cnodejs.org/",callback);    //不写callback强行同步，
    function callback(items){                                   //就异步先执行下面代码。items就是undefined
        var i = 0;
    console.log("11");
    res.send(items);
    //console.log(items);
    console.log("11111");
    ep.after('topic_html', items.length, function (topics) {
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
        console.log("1on");
        // 开始行动
        topics = topics.map(function (topicPair) {
            // 接下来都是 jquery 的用法了
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim()
            });
        });
        console.log('final');
        console.log(topics);
    });
        //console.log(items);
    /*items.forEach(function(ele){
        console.log('ready to'+ele.href+' SUCCESSFUL');
        setTimeout(function(){
            superagent.get(ele.href).timeout(100000).end(function(err,sres){
                console.log('fetch'+ele.href+' SUCCESSFUL');
                ep.emit('topic_html',[ele.href,sres.text]);
            });
        },i*1000);   //高并发连不上。设setTimeout,控制并发数最好，，此为下策。
           i++;
         });  */
        var count = 0;
        var totalcount = 0;
        async.mapLimit(
            items,
            5,
            function(item,callback){
                count++;
                console.log("fetching "+item.href);
                console.log("当前count = "+count);
                superagent.get(item.href).end(function(err,sres){
                count--;
                console.log('fetch '+item.href+' SUCCESSFUL');

                    totalcount++;
                console.log("total count = "+totalcount);
                    console.log("当前count = "+count);
                ep.emit('topic_html',[item.href,sres.text]);
                callback();
            });
            },
            function(err,result){
                if(err){
                    return console.error(err)
                };
                //console.log('final');
                //console.log(result);
            }
        );


    };

});

module.exports = router;
