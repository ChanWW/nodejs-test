var superagent = require("superagent");
var cheerio = require("cheerio");
var url = require("url");

var pachong = function(addr,callback){
    var items = [];
    console.log(addr);
    superagent.get(addr).end(function(err,sres){

        if(err){
            return console.log(err);
        }
        var $ = cheerio.load(sres.text);
        //console.log(sres.text);
        $('#topic_list .topic_title').each(function(idx,element){
            var $element = $(element);
            //console.log("3333"+$element.attr('title')+"+++"+url.resolve(addr,$element.attr('href')));
            items.push({

                title: $element.attr('title'),
                href: url.resolve(addr,$element.attr('href'))
            });
        });
        //console.log(items+"55");
       //console.log(items);
        callback(items);
    });

}
if(require.main === module){
    var addr = String(process.argv[2]);
    console.log(addr);
    pachong(addr,function(items){
        console.log(items);
    });

}

module.exports = pachong;

